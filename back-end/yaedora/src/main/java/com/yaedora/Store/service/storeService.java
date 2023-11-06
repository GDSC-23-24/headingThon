package com.yaedora.Store.service;

import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class storeService {

    @Autowired
    private StoreRepository rep;

    public List<StoreDto> getStoresList(){
        List<StoreDto> stores = rep.findAll().stream().map(StoreDto::from).toList();

        return stores;

    }

}
