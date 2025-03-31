package org.shluvim.hours.model.repositories;

import org.shluvim.hours.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
