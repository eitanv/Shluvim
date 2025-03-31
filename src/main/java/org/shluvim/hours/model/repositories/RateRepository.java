package org.shluvim.hours.model.repositories;

import org.shluvim.hours.model.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RateRepository extends JpaRepository<Rate, Long> {

    @Query("SELECT r.rate FROM Rate r WHERE r.rateCode = :rateCode")
    Double findRateByRateCode(String rateCode);
}
