package org.shluvim.hours.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "INSTITUTE_TYPES")
public class InstituteType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private double rateFactor;

}