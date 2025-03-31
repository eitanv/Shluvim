package org.shluvim.hours.model.repositories;

import org.shluvim.hours.model.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
}
