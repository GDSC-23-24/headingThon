package com.yaedora.Member.dto;


import com.yaedora.Member.Entity.Member;
import com.yaedora.Member.Entity.Review;
import com.yaedora.Store.dto.StoreDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class ReviewDto {
    private Long id;
    private String content;
    private MemberDto member;

    private StoreDto storeDto;

    public static ReviewDto from(Review r){
        log.info("리뷰디티오 안");
        return new ReviewDto(
                r.getId(),
                r.getText(),
                MemberDto.from(r.getMember()),
                StoreDto.from(r.getStore())
        );
    }
}
