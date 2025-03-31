package org.shluvim.hours.controller.rest;

import org.shluvim.hours.model.Institute;
import org.shluvim.hours.model.services.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/institutes")
public class InstitutesController {

    @Autowired
    InstituteService instituteService;

    @GetMapping("/")
    public ResponseEntity<List<Institute>> getAllInstitutes() {
        List<Institute> allInstitutes = instituteService.getAllInstitutes();
        return new ResponseEntity<>(allInstitutes, HttpStatus.OK);
    }
}