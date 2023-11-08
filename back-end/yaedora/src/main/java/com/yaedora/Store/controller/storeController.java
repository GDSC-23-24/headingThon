package com.yaedora.Store.controller;

import com.yaedora.Store.RequestDto.LikeRequest;
import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.dto.StoreLikeDto;
import com.yaedora.Store.entity.RecommendStore;
import com.yaedora.Store.service.StoreService;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class storeController {

    @Autowired
    private StoreService storeService;
    @GetMapping("/store")
    public ResponseEntity<?> getStores(){
        List<StoreDto> stores = storeService.getStoresList();
        log.info("가게명 전체");
        return ResponseEntity.ok(stores);

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

    @GetMapping("/store/recommend")
    public ResponseEntity<?> getRecommendStores(Long member_id){
        List<RecommendStore> recommendStores = storeService.getRecommendStores(member_id);
        log.info("추천 가게");
        return ResponseEntity.ok(recommendStores);
    }

}
