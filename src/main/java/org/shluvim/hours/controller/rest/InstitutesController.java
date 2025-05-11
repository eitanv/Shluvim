package org.shluvim.hours.controller.rest;

import org.shluvim.hours.controller.dto.InstituteRequestDTO;
import org.shluvim.hours.model.Institute;
import org.shluvim.hours.model.services.InstituteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/addInstitute")
    ResponseEntity<Void> addInstitute(@RequestBody InstituteRequestDTO newInstitute) {
        if (newInstitute.getRateCode() == null || newInstitute.getInstituteName() == null
                || newInstitute.getInstituteType() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        instituteService.saveInstitute(newInstitute);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> updateInstitute(@PathVariable Long id, @RequestBody InstituteRequestDTO institute) {
        boolean updated = instituteService.updateInstitute(id, institute);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        boolean deleted = instituteService.deleteInstitute(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}