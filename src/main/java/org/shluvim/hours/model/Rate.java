package org.shluvim.hours.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rates")
@Data
@NoArgsConstructor
public class Rate {
    @Id
    private Long rateId;
    @Column(unique=true)
    private String rateCode;
    private Double rate;
}
