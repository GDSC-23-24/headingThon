package com.yaedora.Store.repository;

import com.yaedora.Member.Entity.Member;
import com.yaedora.Store.dto.StoreLikesCountDto;
import com.yaedora.Store.entity.StoreLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoreLikeRepository extends JpaRepository<StoreLikes,Long> {

    @Query("SELECT sl FROM StoreLikes sl JOIN fetch  sl.store WHERE sl.member.id = :member")
    List<StoreLikes> findAllByMember(@Param("member") Long member);


    @Query("select sl from StoreLikes  sl where sl.member.id=:memberId and sl.store.id = :storeId")
    Optional<StoreLikes> findStoreByMemberAndStore(@Param("memberId") Long memberId,@Param("storeId") Long storeId);


        @Query("SELECT new com.yaedora.Store.dto.StoreLikesCountDto(sl.store.id, COUNT(sl)) " +
                "FROM StoreLikes sl " +
                "GROUP BY sl.store.id")
        List<StoreLikesCountDto> countStoreLikes();


}
