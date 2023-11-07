package com.yaedora.Store.repository;

import com.yaedora.Member.Entity.Member;
import com.yaedora.Store.entity.StoreLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreLikeRepository extends JpaRepository<StoreLikes,Long> {

    @Query(value = "SELECT sl FROM StoreLikes sl JOIN fetch  sl.store WHERE sl.member.id = :member")
    List<StoreLikes> findAllByMember(@Param("member") Long member);

}
