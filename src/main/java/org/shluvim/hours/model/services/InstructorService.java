package org.shluvim.hours.model.services;

import org.shluvim.hours.controller.dto.InstructorHoursDTO;
import org.shluvim.hours.controller.dto.InstructorRequestDTO;
import org.shluvim.hours.model.Instructor;
import org.shluvim.hours.model.InstructorReport;

import java.util.List;

public interface InstructorService {

    Long logHours(InstructorHoursDTO report);

    boolean isDuplicate(InstructorReport existingReport, InstructorReport report);

    double getInstructorRate(Long instructorId);

    List<InstructorReport> getMonthlyReport(String month);

    Instructor getInstructor(Long instructorId);

    List<Instructor> getAllInstructors();

    void addInstructor(InstructorRequestDTO instructorRequest);
}
