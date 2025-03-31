package org.shluvim.hours.model.services.implamantations;

import org.shluvim.hours.model.Institute;
import org.shluvim.hours.model.repositories.InstituteRepository;
import org.shluvim.hours.model.services.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstituteServiceImpl implements InstituteService {

    @Autowired
    InstituteRepository repository;

    @Override
    public double getInstituteRate(Long instituteId) {
        return repository.getReferenceById(instituteId).getRate();
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
    public void saveInstitute(Institute institute) {
        repository.save(institute);
    }

    @Override
    public List<Institute> getAllInstitutes() {
        return repository.findAll();
    }
}
