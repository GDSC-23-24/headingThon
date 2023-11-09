package com.yaedora.Store.repository;


import com.yaedora.Store.dto.LikesRateDto;
import com.yaedora.Store.dto.StoreDetailDto;
import com.yaedora.Store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store,Long> {

    @Query("select new Store(s.id, s.storename, s.fulladdress,s.category, s.latitude, s.longitude) from Store s where s.id = :id")
    Store findStoreById(@Param("id") Long id);


    @Query(value = "SELECT top 10 id,storename,fulladdress,category,latitude,longitude, (6371 * acos(cos(radians(?1)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?2)) + sin(radians(?1)) * sin(radians(latitude)))) AS distance FROM store ORDER BY distance ", nativeQuery = true)
    List<Store> findNearStore(float lat,float lng);

    @Query("select s.id, s.storename, s.fulladdress,s.category, s.latitude, s.longitude from Store s where s.storename like %?1%")
    List<Store> findStoreByName(String value);

    @Query("select s.id, s.storename, s.fulladdress,s.category, s.latitude, s.longitude from Store s where s.category like %?1%")
    List<Store> findStoreByCategory(String value);

    @Query("SELECT new com.yaedora.Store.dto.LikesRateDto(COUNT(l), AVG(r.rating)) " +
            "FROM StoreLikes l " +
            "LEFT JOIN RatingStore r ON l.store.id = r.store.id " +
            "WHERE l.store.id = :storeId " +
            "GROUP BY l.store.id")
    LikesRateDto findCountAndRate(@Param("storeId") Long storeId);




}
