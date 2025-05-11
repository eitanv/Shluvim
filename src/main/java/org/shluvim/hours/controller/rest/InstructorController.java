package org.shluvim.hours.controller.rest;

import org.shluvim.hours.controller.dto.InstructorHoursDTO;
import org.shluvim.hours.controller.dto.InstructorRequestDTO;
import org.shluvim.hours.model.Instructor;
import org.shluvim.hours.model.services.InstructorService;
import org.shluvim.hours.model.services.implamantations.InstructorServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructors")
public class InstructorController {

    private static final Logger logger = LoggerFactory.getLogger(InstructorController.class);

    @Autowired
    InstructorService instructorService;

    @PostMapping("/report")
    ResponseEntity<Long> logHours(@RequestBody InstructorHoursDTO instructorHoursDTO) {

        logger.debug("report= {}", instructorHoursDTO.toString());

        Long id = instructorService.logHours(instructorHoursDTO);

        if (id == 0L) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        logger.debug("Successfully created the report: {}", id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/")
    ResponseEntity<List<Instructor>> getAllInstructors() {
        List<Instructor> all = instructorService.getAllInstructors();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @PostMapping("/addInstructor")
    ResponseEntity<Void> addInstructor(@RequestBody InstructorRequestDTO instructor) {
        instructorService.addInstructor(instructor);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> updateInstructor(@PathVariable Long id, @RequestBody InstructorRequestDTO instructor) {
        boolean updated = instructorService.updateInstructor(id, instructor);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        boolean deleted = instructorService.deleteInstructor(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
