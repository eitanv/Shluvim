package org.shluvim.hours.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "monthly_reports")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class MonthlyInstituteReport {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "monthly_reports_seq")
    @SequenceGenerator(name = "monthly_reports_seq", sequenceName = "monthly_reports_sequence", allocationSize = 1)
    Long reportId;

    @NonNull
    String reportMonth;
    @NonNull
    String instituteName;
    @NonNull
    Long instituteId;
    @NonNull
    Double totalHours;
    @NonNull
    Double totalCharge;
}

