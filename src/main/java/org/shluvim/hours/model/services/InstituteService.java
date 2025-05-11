package org.shluvim.hours.model.services;

import org.shluvim.hours.controller.dto.InstituteRequestDTO;
import org.shluvim.hours.model.Institute;

import java.util.List;

public interface InstituteService {

    double getInstituteRate(Long instituteId);

    String getInstituteName(Long instituteId);

    Institute getInstitute(Long instituteId);

    void saveInstitute(InstituteRequestDTO institute);

    List<Institute> getAllInstitutes();

    boolean updateInstitute(Long id, InstituteRequestDTO institute);

    boolean deleteInstitute(Long id);
}
