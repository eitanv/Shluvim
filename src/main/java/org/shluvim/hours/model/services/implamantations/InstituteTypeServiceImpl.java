package org.shluvim.hours.model.services.implamantations;

import org.shluvim.hours.model.InstituteType;
import org.shluvim.hours.model.repositories.InstituteTypeRepository;
import org.shluvim.hours.model.services.InstituteTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstituteTypeServiceImpl implements InstituteTypeService {

    @Autowired
    InstituteTypeRepository instituteTypeRepository;

    public List<InstituteType> getAllInstituteTypes() {
        return instituteTypeRepository.findAll();
    }
}
