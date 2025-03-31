package org.shluvim.hours.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "institutes")
@Data
@NoArgsConstructor
public class Institute {

    @Id
    Long instituteId;
    String instituteName;
    String instituteType;
    Double rate;
    String rateCode;

}
