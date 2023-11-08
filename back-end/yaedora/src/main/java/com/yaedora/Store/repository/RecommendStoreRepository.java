package com.yaedora.Store.repository;

import com.yaedora.Member.Entity.Member;
import com.yaedora.Store.entity.RatingStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecommendStoreRepository extends JpaRepository<RatingStore,Long> {

    @Query("SELECT rs FROM RatingStore rs join fetch rs.store WHERE rs.member = :member")
    List<RatingStore> findAllByMember(@Param("member") Member member);
}
