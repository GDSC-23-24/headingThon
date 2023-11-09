package com.yaedora.Store.repository;


import com.yaedora.Store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store,Long> {

    @Query("select s from Store s where s.id = :id")
    Store findStoreById(@Param("id") Long id);


    @Query(value = "SELECT top 10 id,storename,fulladdress,category,latitude,longitude, (6371 * acos(cos(radians(?1)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?2)) + sin(radians(?1)) * sin(radians(latitude)))) AS distance FROM store ORDER BY distance ", nativeQuery = true)
    List<Store> findNearStore(float lat,float lng);

    @Query("select s from Store s where s.storename like %?1%")
    List<Store> findStoreByName(String value);

    @Query("select s from Store s where s.category like %?1%")
    List<Store> findStoreByCategory(String value);


}
