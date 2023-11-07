package com.yaedora.Store.repository;

import com.yaedora.Member.Entity.Member;
import com.yaedora.Store.entity.RecommendStore;
import com.yaedora.Store.entity.StoreLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecommendStoreRepository extends JpaRepository<RecommendStore,Long> {

    @Query("SELECT rs FROM RecommendStore rs WHERE rs.member = :member")
    List<StoreLikes> findAllByMember(@Param("member") Member member);
}
