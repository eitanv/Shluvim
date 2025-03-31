package org.shluvim.hours.model.mappers;

import org.shluvim.hours.controller.dto.InstructorHoursDTO;
import org.shluvim.hours.model.InstructorReport;
import org.shluvim.hours.model.repositories.InstituteRepository;
import org.shluvim.hours.model.repositories.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;

@Service
public class InstructorReportMapper {

    @Autowired
    InstituteRepository instituteRepository;

    @Autowired
    InstructorRepository instructorRepository;

    public InstructorReport mapFromDto(InstructorHoursDTO hoursDTO) {

        Date date = Date.valueOf(hoursDTO.getDate());
        String month = date.toLocalDate().toString().substring(0, 7);
        Time startTime = Time.valueOf(hoursDTO.getStartTime());
        Time endTime = Time.valueOf(hoursDTO.getEndTime());
        String instituteName = instituteRepository.getReferenceById(hoursDTO.getInstituteId()).getInstituteName();
        String instructorName = instructorRepository.getReferenceById(hoursDTO.getInstructorId()).getInstructorName();

        return new InstructorReport(month, hoursDTO.getInstructorId(), instructorName, date, startTime, endTime, hoursDTO.getInstituteId(), instituteName);

    }

    public InstructorHoursDTO mapToDto(InstructorReport report) {
        return new InstructorHoursDTO(report.getInstructorId(), report.getReportDate().toString(), report.getStartTime().toString(), report.getEndTime().toString(), report.getInstituteId());
    }
}
