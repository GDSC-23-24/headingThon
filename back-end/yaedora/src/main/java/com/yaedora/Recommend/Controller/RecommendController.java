package com.yaedora.Recommend.Controller;


import com.yaedora.Recommend.Dto.StoreRecommendDto;
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

        List<Long> storeIds = service.executePythonScript();

        List<StoreRecommendDto> storeDtos = storeService.getStoreById(storeIds);

        Map<String,List<StoreRecommendDto>> response = new HashMap<>();
        response.put("storeRecommend",storeDtos);


        return ResponseEntity.ok(response);
    }


}
