package org.shluvim.hours.controller.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
public class InstructorRequestDTO {
    String instructorName;
    String rateCode;
    String identityNumber;
}
