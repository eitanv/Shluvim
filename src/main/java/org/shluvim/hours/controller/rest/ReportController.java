package org.shluvim.hours.controller.rest;

import org.shluvim.hours.controller.dto.MonthlyReportDTO;
import org.shluvim.hours.model.MonthlyInstituteReport;
import org.shluvim.hours.model.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    ReportService reportService;

    @GetMapping("/{instituteId}/{month}")
    ResponseEntity<List<MonthlyInstituteReport>> getMonthlyInstituteReport(@PathVariable Long instituteId, @PathVariable String month) {
        List<MonthlyInstituteReport> report = reportService.getMonthlyInstituteReport(instituteId, month);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @PostMapping("/{instituteId}/{month}")
    ResponseEntity<MonthlyReportDTO> generateMonthlyInstituteReport(@PathVariable Long instituteId, @PathVariable String month) {
        MonthlyReportDTO report = reportService.generateMonthlyInstituteReport(instituteId, month);

        return new ResponseEntity<>(report, HttpStatus.OK);
    }
}
