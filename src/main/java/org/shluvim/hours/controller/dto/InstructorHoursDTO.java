package org.shluvim.hours.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InstructorHoursDTO {

    Long instructorId;
    String date;
    String startTime;
    String endTime;
    Long instituteId;

}
