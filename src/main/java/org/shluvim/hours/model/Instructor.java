package org.shluvim.hours.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "instructors")
@Data
@NoArgsConstructor
public class Instructor {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "instructor_seq")
    @SequenceGenerator(name = "instructor_seq", sequenceName = "instructor_sequence", allocationSize = 1)
    Long instructorId;

    String instructorName;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    User user;

    String rateCode;
}