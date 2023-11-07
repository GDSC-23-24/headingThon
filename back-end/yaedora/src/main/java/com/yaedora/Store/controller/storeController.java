package com.yaedora.Store.controller;

import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.dto.StoreLikeDto;
import com.yaedora.Store.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class storeController {

    @Autowired
    private StoreService storeService;
    @GetMapping("/store")
    public ResponseEntity<?> getStores(){
        List<StoreDto> stores = storeService.getStoresList();

        return ResponseEntity.ok(stores);

    }

    @GetMapping("/store/like")
    public ResponseEntity<?> getLikesStores(Long member_id){
        List<StoreLikeDto> storeLikeDtos = storeService.getStoreLikeList(member_id);

        return ResponseEntity.ok(storeLikeDtos);
    }

}
