package org.shluvim.hours.model.services;

import org.shluvim.hours.model.InstructorReport;

import java.util.List;

public interface ChargesService {
    double getChargePerHour (Long instructorId, Long instituteId);

    double calculateChargePerMonth (Long instructorId, Long instituteId, String month);

    double getTotalHoursPerMonth(List<InstructorReport> monthly);
}
