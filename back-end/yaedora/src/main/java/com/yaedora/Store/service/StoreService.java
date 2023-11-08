package com.yaedora.Store.service;

import com.yaedora.Member.Entity.Member;
import com.yaedora.Member.Repository.MemberRepository;
import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.dto.StoreLikeDto;
import com.yaedora.Store.entity.RatingStore;
import com.yaedora.Store.entity.Store;
import com.yaedora.Store.entity.StoreLikes;
import com.yaedora.Store.repository.RecommendStoreRepository;
import com.yaedora.Store.repository.StoreLikeRepository;
import com.yaedora.Store.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private RecommendStoreRepository recommendStoreRepository;


    /**
     * 가맹점 전체 반환
     */
    public List<StoreDto> getStoresList(){
        List<StoreDto> stores = storeRepository.findAll().stream().map(StoreDto::from).toList();

        return stores;

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
    public List<RatingStore> getRecommendStores(Long memberId){
        Optional<Member> member = memberRepository.findById(memberId);

        List<RatingStore> ratingStores = recommendStoreRepository.findAllByMember(member.get());

        return ratingStores;
    }

    /**
     * 가게 검색
     */
    public List<StoreDto> searchStores(String value){
        List<StoreDto> storeDtos = storeRepository.findStoreByName(value).stream().map(StoreDto::from).toList();

        return storeDtos;
    }

}
