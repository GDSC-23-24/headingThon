package com.yaedora.Store.service;

import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.dto.StoreLikeDto;
import com.yaedora.Store.entity.Store;
import com.yaedora.Store.entity.StoreLikes;
import com.yaedora.Store.repository.StoreLikeRepository;
import com.yaedora.Store.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private StoreLikeRepository storeLikeRepository;



    public List<StoreDto> getStoresList(){
        List<StoreDto> stores = storeRepository.findAll().stream().map(StoreDto::from).toList();

        return stores;

    }

    public List<StoreLikeDto> getStoreLikeList(Long member_id){
        List<StoreLikeDto> memberLikesStores = storeLikeRepository.findAllByMember(member_id).stream().map(StoreLikeDto::from).toList();

        return memberLikesStores;



    }

}
