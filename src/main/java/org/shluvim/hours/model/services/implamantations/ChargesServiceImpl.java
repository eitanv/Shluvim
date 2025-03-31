package org.shluvim.hours.model.services.implamantations;

import org.shluvim.hours.model.InstructorReport;
import org.shluvim.hours.model.services.ChargesService;
import org.shluvim.hours.model.services.InstituteService;
import org.shluvim.hours.model.services.InstructorService;
import org.shluvim.hours.model.services.RateServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChargesServiceImpl implements ChargesService {

    @Autowired
    InstituteService instituteService;

    @Autowired
    InstructorService instructorService;

    @Override
    public double getChargePerHour(Long instructorId, Long instituteId) {
        double instructorRate = instructorService.getInstructorRate(instructorId);
        double instituteRate = instituteService.getInstituteRate(instituteId);
        return instructorRate + instituteRate;
    }

    @Override
    public double calculateChargePerMonth(Long instructorId, Long instituteId, String month) {

        List<InstructorReport> monthly = instructorService.getMonthlyReport(month).stream().filter(report -> report.getInstructorId().equals(instructorId) && report.getInstituteId().equals(instituteId)).collect(Collectors.toList());

        double totalTimePerMonth = 0.0;
        for (InstructorReport report : monthly) {

            LocalTime from = report.getStartTime().toLocalTime();
            LocalTime to = report.getEndTime().toLocalTime();

            Duration d = Duration.between(from, to);
            double hour = d.toMinutes() / 60;
            totalTimePerMonth += hour;
        }

        return totalTimePerMonth * getChargePerHour(instructorId, instituteId);
    }

    @Override
    public double getTotalHoursPerMonth(List<InstructorReport> monthly) {
        double totalTimePerMonth = 0.0;
        for (InstructorReport report : monthly) {

            LocalTime from = report.getStartTime().toLocalTime();
            LocalTime to = report.getEndTime().toLocalTime();

            Duration d = Duration.between(from, to);
            double hour = d.toMinutes() / 60;
            totalTimePerMonth += hour;
        }
        return totalTimePerMonth;
    }
}
