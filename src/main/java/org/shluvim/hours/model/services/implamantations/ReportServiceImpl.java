package org.shluvim.hours.model.services.implamantations;

import org.shluvim.hours.controller.dto.MonthlyInstituteReportDTO;
import org.shluvim.hours.controller.dto.MonthlyReportDTO;
import org.shluvim.hours.model.InstructorReport;
import org.shluvim.hours.model.MonthlyInstituteReport;
import org.shluvim.hours.model.repositories.ReportRepository;
import org.shluvim.hours.model.services.ChargesService;
import org.shluvim.hours.model.services.InstituteService;
import org.shluvim.hours.model.services.InstructorService;
import org.shluvim.hours.model.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;

@Service
public class ReportServiceImpl implements ReportService {

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
    public MonthlyReportDTO generateMonthlyInstituteReport(Long instituteId, String month) {

        MonthlyReportDTO result = new MonthlyReportDTO();
        double totalCharge = 0.0;
        double totalHours = 0.0;
        List<MonthlyInstituteReportDTO> details = new ArrayList<>();
        String instituteName;

        List<InstructorReport> monthly = instructorService.getMonthlyReport(month).stream().filter(report -> report.getInstituteId().equals(instituteId)).toList();

        if (monthly.isEmpty()) {
            instituteName = instituteService.getInstituteName(instituteId);
        } else {
            instituteName = monthly.get(0).getInstituteName();
            Map<Long, MonthlyInstituteReportDTO> sumPerInstructor = new HashMap<>();
            for (InstructorReport reportLine : monthly) {
                double hour = getHour(reportLine);
                totalHours += hour;
                double lineCharge = hour * chargesService.getChargePerHour(reportLine.getInstructorId(), instituteId);
                totalCharge += lineCharge;
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
            details=new ArrayList<MonthlyInstituteReportDTO>(sumPerInstructor.values());
        }
        result.setInstituteName(instituteName);
        result.setMonth(month);
        result.setDetails(details);
        result.setTotalHours(totalHours);
        result.setTotalCharge(totalCharge);

        try {
            MonthlyInstituteReport reportToSave = new MonthlyInstituteReport();
            reportToSave.setInstituteName(instituteName);
            reportToSave.setReportMonth(month);
            reportToSave.setTotalCharge(totalCharge);
            reportToSave.setTotalHours(totalHours);
            reportRepository.save(reportToSave);
        } catch (Exception e) {
            System.out.println("Failed to save new report to DB");
        }
        System.out.println("Successfully save new report to DB");
        return result;
    }

    double getHour(InstructorReport reportLine) {
        LocalTime from = reportLine.getStartTime().toLocalTime();
        LocalTime to = reportLine.getEndTime().toLocalTime();
        return (double) Duration.between(from, to).toMinutes() / 60;
    }
}
