package com.yaedora.Store.controller;

import com.yaedora.Store.RequestDto.LikeRequest;
import com.yaedora.Store.RequestDto.coordinate;
import com.yaedora.Store.dto.*;
import com.yaedora.Store.entity.RatingStore;
import com.yaedora.Store.service.StoreService;
import jakarta.servlet.http.HttpServletRequest;
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

    /**
     * 가게명 전체 조회
     */
    @GetMapping("/store")
    public ResponseEntity<?> getStores(){
        List<StoreResponseDto> stores = storeService.getStoresList();
        log.info("가게명 전체");
        Map<String, List<StoreResponseDto>> response = new HashMap<>();
        response.put("stores", stores);
        return ResponseEntity.ok(response);

    }

    /**
     *  가게 검색 조회
     *  url 형식 : ~~~:25565/store/김가네
     */
    @GetMapping("/store/{value}")
    public ResponseEntity<?> getStores(@PathVariable("value") String value){
        List<StoreDto> storeDtos;
        storeDtos = storeService.searchStores(value);

        Map<String, List<StoreDto>> response = new HashMap<>();
        response.put("stores", storeDtos);
        return ResponseEntity.ok(response);
    }


    /**
     *  카테고리별 가게 검색
     *  url 형식 : ~~~:25565/store/category/한식
     */
    @GetMapping("/store/category/{value}")
    public ResponseEntity<?> getStoreCategory(@PathVariable("value") String value){

        List<StoreDto> storeDtos = storeService.searchStoresByCategory(value);
        Map<String, List<StoreDto>> response = new HashMap<>();
        response.put("stores", storeDtos);
        return ResponseEntity.ok(response);

    }

    /**
     * 가까운 가게 검색
     */
//    @PostMapping("/store/near")
//    public ResponseEntity<?> getNearStore(@RequestBody coordinate coordinate){
//        List<StoreDto> storeDtos = storeService.getNearTop10Store(coordinate.getLatitude(),coordinate.getLongitude());
//        Map<String,List<StoreDto>> response = new HashMap<>();
//        response.put("stores", storeDtos);
//        log.info("근처가게 조회");
//        return ResponseEntity.ok(response);
//    }


    @GetMapping("/store/near")
    public ResponseEntity<?> getNearStore(){
        List<StoreResponseDto> storeDtos = storeService.getNearTop10Store((float)35.106,(float)128.966);
        Map<String,List<StoreResponseDto>> response = new HashMap<>();
        response.put("stores", storeDtos);
        log.info("근처가게 조회");
        return ResponseEntity.ok(response);
    }

    /**
     *  좋아요 가게 조회
     *  url 형식 : ~~~:25565/store/like?member_id=1
     */
    @GetMapping("/store/like")
    public ResponseEntity<?> getLikesStores(Long member_id){
        List<StoreLikeDto> storeLikeDtos = storeService.getStoreLikeList(member_id);

        Map<String,List<StoreLikeDto>> response = new HashMap<>();
        response.put("storeLikeDtos", storeLikeDtos);

        log.info("멤버 좋아요 조회");
        return ResponseEntity.ok(response);
    }

    /**
     *  좋아요 추가 및 삭제
     *  url 형식 : ~~~:25565/store/increase/like << Method = Post 주의
     */
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
        log.info("평점 가게");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/store/likes/count")
    public ResponseEntity<?> getLikesCount(){
        Map<String, List<StoreLikesCountDto>> response = new HashMap<>();
        response.put("likesCount",storeService.getLikeCount());
        return ResponseEntity.ok(response);
    }

    /**
     * 가게 상세정보 조회
     */
    @GetMapping("/store/detail/{storeId}")
    public ResponseEntity<?> getStoreDetail(@PathVariable("storeId") Long storeId){
        StoreDetailDto storeDetailDto = storeService.getStoreDetail(storeId);
        Map<String, StoreDetailDto> response = new HashMap<>();
        response.put("storeDetailDto",storeDetailDto);
        log.info("상세정보 조회");
        return ResponseEntity.ok(response);
    }


}
