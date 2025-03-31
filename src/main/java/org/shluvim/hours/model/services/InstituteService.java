package org.shluvim.hours.model.services;

import org.shluvim.hours.model.Institute;

import java.util.List;

public interface InstituteService {

    double getInstituteRate(Long instituteId);

    String getInstituteName(Long instituteId);

    Institute getInstitute(Long instituteId);

    void saveInstitute(Institute institute);

    List<Institute> getAllInstitutes();


}
