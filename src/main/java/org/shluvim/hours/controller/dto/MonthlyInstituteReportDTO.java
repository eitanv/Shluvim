package org.shluvim.hours.controller.dto;

import lombok.Data;

@Data
public class MonthlyInstituteReportDTO {
    String instructorName;
    Double totalInstructorHours;
    Double totalInstructorCharge;
}
