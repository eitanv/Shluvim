package org.shluvim.hours.model.repositories;

import org.shluvim.hours.model.MonthlyInstituteReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<MonthlyInstituteReport, Long> {


    List<MonthlyInstituteReport> findByInstituteIdAndReportMonth(Long instituteId, String month);
    List<MonthlyInstituteReport> findByReportMonth(String month);
}
