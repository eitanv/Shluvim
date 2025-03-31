package org.shluvim.hours.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "instructor_reports")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class InstructorReport {
    @Id
    @GeneratedValue
    Long reportId;

    @NonNull
    String reportMonth;
    @NonNull
    Long instructorId;
    @NonNull
    String instructorName;
    @NonNull
    Date reportDate;
    @NonNull
    Time startTime;
    @NonNull
    Time endTime;
    @NonNull
    Long instituteId;
    @NonNull
    String instituteName;

}
