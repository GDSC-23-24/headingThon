package com.yaedora.Store.service;

import com.yaedora.Member.Entity.Member;
import com.yaedora.Member.Repository.MemberRepository;
import com.yaedora.Recommend.Dto.StoreRecommendDto;
import com.yaedora.Store.dto.*;
import com.yaedora.Store.entity.Menu;
import com.yaedora.Store.entity.RatingStore;
import com.yaedora.Store.entity.Store;
import com.yaedora.Store.entity.StoreLikes;
import com.yaedora.Store.repository.MenuRepository;
import com.yaedora.Store.repository.RatingRepository;
import com.yaedora.Store.repository.StoreLikeRepository;
import com.yaedora.Store.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private StoreLikeRepository storeLikeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private MenuRepository menuRepository;


    /**
     * 가맹점 전체 반환
     */
    public List<StoreDto> getStoresList(){
        List<StoreDto> stores = storeRepository.findAll().stream().map(StoreDto::from).toList();

        return stores;

    }

    /**
     * id로 스토어 검색
     */

    public List<StoreRecommendDto> getStoreById(List<Long> ids){

        List<StoreRecommendDto> storeDtos = new ArrayList<>();

        for( Long i : ids){
            storeDtos.add(StoreRecommendDto.from(storeRepository.findStoreById(i)));
        }

        return storeDtos;
    }

    /**
     * 가까운 가게 10개
     */
    public List<StoreResponseDto> getNearTop10Store(float lat, float lng){
        List<StoreResponseDto> storeDtos = storeRepository.findNearStore(lat,lng).stream().map(StoreResponseDto::from).toList();

        return storeDtos;
    }


    /**
     * 해당 멤버의 좋아요 리스트 반환
     */

    public List<StoreLikeDto> getStoreLikeList(Long member_id){
        List<StoreLikeDto> memberLikesStores = storeLikeRepository.findAllByMember(member_id).stream().map(StoreLikeDto::from).toList();

        return memberLikesStores;
    }

    /**
     * 좋아요 추가하기
     */
    public boolean CheckStoreLike(Long member_id, Long store_id){

        Optional<StoreLikes> storeLikes = storeLikeRepository.findStoreByMemberAndStore(member_id, store_id);

        Store store = storeRepository.findById(store_id).orElseThrow(
                () -> new RuntimeException("가게가 없습니다.")
        );

        Member member = memberRepository.findById(member_id).orElseThrow(
                () -> new RuntimeException("사용자가 없습니다.")
        );

        if( !storeLikes.isPresent()){
            StoreLikes likes = StoreLikes.builder()
                    .member(member)
                    .store(store)
                    .build();
            storeLikeRepository.save(likes);
            return true;
        }

        else{
            storeLikeRepository.delete(storeLikes.get());
            return false;
        }
    }

    /**
     * 추천 가게 반환
     */
    public List<RatingStoreDto> getRatedStores(){

        List<RatingStoreDto> ratingStores = ratingRepository.findAllWithJoin().stream().map(RatingStoreDto::from).toList();

        return ratingStores;
    }

    /**
     * 가게 검색
     */
    public List<StoreDto> searchStores(String value){
        List<StoreDto> storeDtos = storeRepository.findStoreByName(value).stream().map(StoreDto::from).toList();

        return storeDtos;
    }

    /**
     * 가게 검색 category
     */
    public List<StoreDto> searchStoresByCategory(String value){
        List<StoreDto> storeDtos = storeRepository.findStoreByCategory(value).stream().map(StoreDto::from).toList();

        return storeDtos;
    }

    /**
     * 가게별 좋아요 개수 반환
     */

    public List<StoreLikesCountDto> getLikeCount(){
        List<StoreLikesCountDto> storeLikeDtos = storeLikeRepository.countStoreLikes();
        return storeLikeDtos;
    }

    /**
     * 가게 상세정보 조회
     */
    public StoreDetailDto getStoreDetail(Long storeId){
        Store store = storeRepository.findStoreById(storeId);
        List<MenuDto> menus = menuRepository.findAllByStoreId(storeId);
        LikesRateDto likesRateDto = storeRepository.findCountAndRate(storeId);

        StoreDetailDto storeDetailDto = new StoreDetailDto(StoreDto.from(store),menus,likesRateDto.getLikes(), likesRateDto.getRate_avg());

        return storeDetailDto;
    }
}
