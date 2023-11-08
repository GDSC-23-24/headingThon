package com.yaedora.Store.repository;


import com.yaedora.Store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store,Long> {

    @Query("select s from Store s where s.id = :id")
    List<Store> findStoresById(@Param("id") Long id);


    @Query("select s from Store s where s.storename like %?1%")
    List<Store> findStoreByName(String value);

    @Query("select s from Store s where s.category=?1")
    List<Store> findStoreByCategory(String category);
}
