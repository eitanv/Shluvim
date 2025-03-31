package org.shluvim.hours.controller.rest;

import org.shluvim.hours.model.Instructor;
import org.shluvim.hours.model.Rate;
import org.shluvim.hours.model.services.RateServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rates")
public class RateController {

    @Autowired
    RateServices rateServices;

    @GetMapping("/")
    ResponseEntity<List<Rate>> getAllRates() {
        List<Rate> all = rateServices.getAllRates();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

}
