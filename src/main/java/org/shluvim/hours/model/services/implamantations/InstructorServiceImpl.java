package org.shluvim.hours.model.services.implamantations;

import lombok.AllArgsConstructor;
import org.shluvim.hours.controller.dto.InstructorHoursDTO;
import org.shluvim.hours.controller.dto.InstructorRequestDTO;
import org.shluvim.hours.model.Instructor;
import org.shluvim.hours.model.InstructorReport;
import org.shluvim.hours.model.User;
import org.shluvim.hours.model.mappers.InstructorReportMapper;
import org.shluvim.hours.model.repositories.InstructorReportRepository;
import org.shluvim.hours.model.repositories.InstructorRepository;
import org.shluvim.hours.model.repositories.UserRepository;
import org.shluvim.hours.model.services.InstructorService;
import org.shluvim.hours.model.services.RateServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class InstructorServiceImpl implements InstructorService {

    @Autowired
    InstructorReportRepository instructorReportRepository;

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    InstructorReportMapper mapper;

    @Autowired
    RateServices rateServices;

    @Override
    public Long logHours(InstructorHoursDTO newReport) {

        InstructorReport report = mapper.mapFromDto(newReport);
        System.out.println("New report: " + report.toString());

        //Validate same params don't already exist
        List<InstructorReport> allReports = instructorReportRepository.findByReportMonth(newReport.getDate().split("-")[1]);
        for (InstructorReport existingReport : allReports) {
            if (isDuplicate(existingReport, report)) {
                System.out.println("Report already exists with ID: " + existingReport.getReportId());
                return 0L;
            }
        }

        LocalTime from = report.getStartTime().toLocalTime();
        LocalTime to = report.getEndTime().toLocalTime();
        if (from.isAfter(to)) {
            System.out.println("End Time cannot be before Start Time");
            return 0L;
        }

        return instructorReportRepository.save(report).getReportId();
    }

    @Override
    public boolean isDuplicate(InstructorReport existingReport, InstructorReport report) {
        System.out.println("Checking existing: " + report.toString());

        return existingReport.getInstructorId().equals(report.getInstructorId())
                && existingReport.getInstituteId().equals(report.getInstituteId())
                && existingReport.getReportDate().equals(report.getReportDate())
                && existingReport.getStartTime().equals(report.getStartTime())
                && existingReport.getEndTime().equals(report.getEndTime());
    }

    @Override
    public double getInstructorRate(Long instructorId) {

        Instructor instructor = instructorRepository.getReferenceById(instructorId);
        return rateServices.getRateByCode(instructor.getRateCode());
    }

    @Override
    public List<InstructorReport> getMonthlyReport(String month) {

        return instructorReportRepository.findByReportMonth(month);
    }

    @Override
    public Instructor getInstructor(Long instructorId) {
        return instructorRepository.getReferenceById(instructorId);
    }

    @Override
    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    @Override
    public void addInstructor(InstructorRequestDTO instructorRequest) {
        User user = new User();
        user.setUserName(instructorRequest.getInstructorName());
        user.setTitle("Instructor");
        user.setIdentityNumber(instructorRequest.getIdentityNumber());
        user = userRepository.save(user);
        Instructor instructor = new Instructor();
        instructor.setInstructorName(instructorRequest.getInstructorName());
        instructor.setRateCode(instructorRequest.getRateCode());
        instructor.setUser(user);
        instructorRepository.save(instructor);
    }

    public boolean updateInstructor(Long id, InstructorRequestDTO instructorDTO) {
        if (instructorRepository.existsById(id)) { //TODO fix condition
            Instructor instructor = instructorRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Instructor not found with id: " + id));
            instructor.setInstructorName(instructorDTO.getInstructorName());
            instructor.setRateCode(instructorDTO.getRateCode());
            // Update other fields as necessary
            instructorRepository.save(instructor);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteInstructor(Long id) {
        if (!instructorRepository.existsById(id)) {
            return false;
        }
        instructorRepository.deleteById(id);
        return true;
    }

}
