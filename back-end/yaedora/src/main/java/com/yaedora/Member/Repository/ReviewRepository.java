package com.yaedora.Member.Repository;

import com.yaedora.Member.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {

    @Query("select r from Review r left join r.member where r.store.id = :storeId")
    List<Review> findBystoreId(@Param("storeId") Long storeId);
}
