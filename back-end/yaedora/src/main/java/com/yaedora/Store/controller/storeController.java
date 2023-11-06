package com.yaedora.Store.controller;

import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.service.storeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class storeController {

    @Autowired
    private storeService storeService;
    @GetMapping("/store")
    public ResponseEntity<?> getStores(){
        List<StoreDto> stores = storeService.getStoresList();

        return ResponseEntity.ok(stores);

    }

}
