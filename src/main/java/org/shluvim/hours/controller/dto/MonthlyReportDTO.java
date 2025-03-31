package org.shluvim.hours.controller.dto;

import lombok.Data;

import java.util.List;

@Data
public class MonthlyReportDTO {

    String instituteName;
    Double totalHours;
    Double totalCharge;
    List<MonthlyInstituteReportDTO> details;
}
