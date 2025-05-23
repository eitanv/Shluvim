package org.shluvim.hours.model.services;

import org.shluvim.hours.controller.dto.MonthlyInstituteReportDTO;
import org.shluvim.hours.controller.dto.MonthlyReportDTO;
import org.shluvim.hours.model.MonthlyInstituteReport;

import java.util.List;

public interface ReportService {

    MonthlyReportDTO generateMonthlyInstituteReport(Long instituteId, String month);
    List<MonthlyInstituteReport> getMonthlyInstituteReport(Long instituteId, String month);
    List<MonthlyInstituteReport> getMonthlyAllInstitutesReport(String month);
    List<MonthlyInstituteReportDTO> getMonthlyReportDetails(Long instituteId, String month);
}
