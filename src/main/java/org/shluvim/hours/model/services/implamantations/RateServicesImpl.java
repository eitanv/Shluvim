package org.shluvim.hours.model.services.implamantations;

import org.shluvim.hours.model.Rate;
import org.shluvim.hours.model.repositories.RateRepository;
import org.shluvim.hours.model.services.RateServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RateServicesImpl implements RateServices {

    @Autowired
    RateRepository rateRepository;

    @Override
    public List<Rate> getAllRates() {
        return rateRepository.findAll();
    }

    @Override
    public Rate getRateById(Long id) {
        return rateRepository.findById(id).orElse(null);
    }

    @Override
    public Double getRateByCode(String rateCode) {
        return rateRepository.findRateByRateCode(rateCode);
    }
}
