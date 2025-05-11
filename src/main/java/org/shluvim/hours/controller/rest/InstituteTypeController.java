package org.shluvim.hours.controller.rest;

import org.shluvim.hours.model.InstituteType;
import org.shluvim.hours.model.services.InstituteTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/institute-types")
public class InstituteTypeController {

    @Autowired
    InstituteTypeService instituteTypeService;

    @GetMapping("/")
    public List<InstituteType> getAllInstituteTypes() {
        return instituteTypeService.getAllInstituteTypes();
    }
}