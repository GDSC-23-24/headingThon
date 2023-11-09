package com.yaedora.Recommend.Controller;


import com.yaedora.Recommend.Service.PythonExecutorService;
import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RecommendController {

    @Autowired
    private PythonExecutorService service;

    @Autowired
    private StoreService storeService;

    @GetMapping("/recommend")
    public ResponseEntity<?> getRecommendStore(){
        long beforeTime = System.currentTimeMillis();

        List<Long> storeIds = service.executePythonScript();

        List<StoreDto> storeDtos = storeService.getStoreById(storeIds);
        Map<String,List<StoreDto>> response = new HashMap<>();
        response.put("storeDtos",storeDtos);

        long afterTime = System.currentTimeMillis();
        long secDiffTime = (afterTime - beforeTime);
        System.out.println("시간차이(m) : "+secDiffTime);

        return ResponseEntity.ok(response);
    }

}
