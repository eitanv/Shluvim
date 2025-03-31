package org.shluvim.hours.model.services;

import org.shluvim.hours.model.Rate;

import java.util.List;

public interface RateServices {

    List<Rate> getAllRates();
    Rate getRateById(Long id);
    Double getRateByCode(String rateCode);
}
