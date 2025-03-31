package org.shluvim.hours.model.repositories;

import org.shluvim.hours.model.InstructorReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstructorReportRepository extends JpaRepository<InstructorReport, Long> {

    List<InstructorReport> findByReportMonth(String reportMonth);
}
