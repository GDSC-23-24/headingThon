package com.yaedora.Location;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class LocationController {

    @Autowired
    LocationRepository rep;
    @GetMapping("/location/town")
    public ResponseEntity<?> getTowns( ){
        List<String> towns = rep.findTowns();
        log.info("타운");
        return ResponseEntity.ok(towns);
    }

    @GetMapping("/location/village")    // url 예시) ~~~:25565/location/village?town=사하구
    public ResponseEntity<?> getVillages(String town){
        List<String> villages = rep.findVillageByTown(town);
        log.info("빌리지");
        return ResponseEntity.ok(villages);
    }

}
