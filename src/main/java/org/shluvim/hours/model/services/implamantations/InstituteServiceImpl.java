package org.shluvim.hours.model.services.implamantations;

import org.shluvim.hours.controller.dto.InstituteRequestDTO;
import org.shluvim.hours.model.Institute;
import org.shluvim.hours.model.repositories.InstituteRepository;
import org.shluvim.hours.model.services.InstituteService;
import org.shluvim.hours.model.services.RateServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstituteServiceImpl implements InstituteService {

    @Autowired
    InstituteRepository repository;

    @Autowired
    RateServices rateServices;

    @Override
    public double getInstituteRate(Long instituteId) {
        if (!repository.existsById(instituteId)) {
            throw new IllegalArgumentException("Institute not found with id: " + instituteId);
        }
        String rateCode = repository.getReferenceById(instituteId).getRateCode();
        return rateServices.getRateByCode(rateCode);
    }

    @Override
    public String getInstituteName(Long instituteId) {
        return repository.getReferenceById(instituteId).getInstituteName();
    }

    @Override
    public Institute getInstitute(Long instituteId) {
        return repository.getReferenceById(instituteId);
    }

    @Override
    public void saveInstitute(InstituteRequestDTO institute) {
        Institute newInstitute = new Institute();
        newInstitute.setInstituteName(institute.getInstituteName());
        newInstitute.setRateCode(institute.getRateCode());
        newInstitute.setInstituteType(institute.getInstituteType());
        repository.save(newInstitute);
    }

    @Override
    public List<Institute> getAllInstitutes() {
        return repository.findAll();
    }

    @Override
    public boolean updateInstitute(Long id, InstituteRequestDTO institute) {
        Institute existingInstitute = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Institute not found with id: " + id));
        existingInstitute.setInstituteName(institute.getInstituteName());
        existingInstitute.setRateCode(institute.getRateCode());
        existingInstitute.setInstituteType(institute.getInstituteType());
        repository.save(existingInstitute);
        return true;
    }

    @Override
    public boolean deleteInstitute(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
