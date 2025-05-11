package org.shluvim.hours.model.services.implamantations;

import org.shluvim.hours.controller.dto.MonthlyInstituteReportDTO;
import org.shluvim.hours.controller.dto.MonthlyReportDTO;
import org.shluvim.hours.controller.rest.InstructorController;
import org.shluvim.hours.model.InstructorReport;
import org.shluvim.hours.model.MonthlyInstituteReport;
import org.shluvim.hours.model.repositories.ReportRepository;
import org.shluvim.hours.model.services.ChargesService;
import org.shluvim.hours.model.services.InstituteService;
import org.shluvim.hours.model.services.InstructorService;
import org.shluvim.hours.model.services.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportServiceImpl implements ReportService {
    private static final Logger logger = LoggerFactory.getLogger(ReportServiceImpl.class);

    @Autowired
    InstructorService instructorService;

    @Autowired
    InstituteService instituteService;

    @Autowired
    ChargesService chargesService;

    @Autowired
    ReportRepository reportRepository;


    @Override
    public List<MonthlyInstituteReport> getMonthlyInstituteReport(Long instituteId, String month) {
        return reportRepository.findByInstituteIdAndReportMonth(instituteId, month);
    }

    @Override
    public List<MonthlyInstituteReport> getMonthlyAllInstitutesReport(String month) {
        return reportRepository.findByReportMonth(month);
    }

    @Override
    public List<MonthlyInstituteReportDTO> getMonthlyReportDetails(Long instituteId, String month) {

        List<InstructorReport> monthly = instructorService.getMonthlyReport(month).stream().filter(report -> report.getInstituteId().equals(instituteId)).toList();
        if (monthly.isEmpty()) {
            return new ArrayList<>();
        } else {
            Map<Long, MonthlyInstituteReportDTO> sumPerInstructor = new HashMap<>();
            for (InstructorReport reportLine : monthly) {
                double hour = getHour(reportLine);
                double lineCharge = hour * chargesService.getChargePerHour(reportLine.getInstructorId(), instituteId);
                if (sumPerInstructor.containsKey(reportLine.getInstructorId())) {
                    MonthlyInstituteReportDTO perIns = sumPerInstructor.get(reportLine.getInstructorId());
                    perIns.setTotalInstructorHours(perIns.getTotalInstructorHours() + hour);
                    perIns.setTotalInstructorCharge(perIns.getTotalInstructorCharge() + lineCharge);
                } else {
                    MonthlyInstituteReportDTO perIns = new MonthlyInstituteReportDTO();
                    perIns.setInstructorName(reportLine.getInstructorName());
                    perIns.setTotalInstructorHours(hour);
                    perIns.setTotalInstructorCharge(lineCharge);
                    sumPerInstructor.put(reportLine.getInstructorId(), perIns);
                }
            }
            return new ArrayList<>(sumPerInstructor.values());
        }
    }

    @Override
    public MonthlyReportDTO generateMonthlyInstituteReport(Long instituteId, String month) {

        MonthlyReportDTO result = new MonthlyReportDTO();
        List<MonthlyInstituteReportDTO> details = getMonthlyReportDetails(instituteId, month);
        result.setDetails(details);
        result.setInstituteName(instituteService.getInstituteName(instituteId));

        if (details.isEmpty()) {
            result.setTotalHours(0.0);
            result.setTotalCharge(0.0);
        } else {
            double totalCharge = details.stream().mapToDouble(MonthlyInstituteReportDTO::getTotalInstructorCharge).sum();
            double totalHours = details.stream().mapToDouble(MonthlyInstituteReportDTO::getTotalInstructorHours).sum();
            result.setTotalHours(totalHours);
            result.setTotalCharge(totalCharge);
        }

        try {
            MonthlyInstituteReport reportToSave = reportRepository.findByInstituteIdAndReportMonth(instituteId, month)
                    .stream().findFirst().orElseGet(() -> new MonthlyInstituteReport());
            reportToSave.setInstituteName(result.getInstituteName());
            reportToSave.setInstituteId(instituteId);
            reportToSave.setReportMonth(month);
            reportToSave.setTotalCharge(result.getTotalCharge());
            reportToSave.setTotalHours(result.getTotalHours());
            reportRepository.save(reportToSave);
        } catch (Exception e) {
            logger.error("Failed to save new report to DB");
        }
        logger.debug("Successfully save new report to DB");
        return result;
    }

    double getHour(InstructorReport reportLine) {
        LocalTime from = reportLine.getStartTime().toLocalTime();
        LocalTime to = reportLine.getEndTime().toLocalTime();
        return (double) Duration.between(from, to).toMinutes() / 60;
    }
}
