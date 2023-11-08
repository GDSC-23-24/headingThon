package com.yaedora.Store.controller;

import com.yaedora.Store.RequestDto.LikeRequest;
import com.yaedora.Store.dto.RatingStoreDto;
import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.dto.StoreLikeDto;
import com.yaedora.Store.entity.RatingStore;
import com.yaedora.Store.service.StoreService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class storeController {

    @Autowired
    private StoreService storeService;

    @GetMapping("/store")
    public ResponseEntity<?> getStores(){
        List<StoreDto> stores = storeService.getStoresList();
        log.info("가게명 전체");
        Map<String, List<StoreDto>> response = new HashMap<>();
        response.put("stores", stores);
        return ResponseEntity.ok(response);

    }

    @GetMapping("/store/{value}")
    public ResponseEntity<?> getStores(@PathVariable String value){
        List<StoreDto> storeDtos = storeService.searchStores(value);
        Map<String, List<StoreDto>> response = new HashMap<>();
        response.put("stores", storeDtos);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/store/like")
    public ResponseEntity<?> getLikesStores(Long member_id){
        List<StoreLikeDto> storeLikeDtos = storeService.getStoreLikeList(member_id);
        log.info("멤버 좋아요 조회");
        return ResponseEntity.ok(storeLikeDtos);
    }

    @PostMapping("/store/increase/like")
    public ResponseEntity<?> checkLike(@RequestBody LikeRequest likeRequest){
        // true이면 좋아요 추가.
        boolean like = storeService.CheckStoreLike(likeRequest.getMemberId(), likeRequest.getMemberId());
        log.info("좋아요 추가 및 삭제");
        return ResponseEntity.ok(like);
    }

    @GetMapping("/store/rating")
    public ResponseEntity<?> getRecommendStores(){
        List<RatingStoreDto> ratingStores = storeService.getRatedStores();

        Map<String,List<RatingStoreDto>> response = new HashMap<>();
        response.put("ratingStores", ratingStores);
        log.info("추천 가게");
        return ResponseEntity.ok(response);
    }
}
