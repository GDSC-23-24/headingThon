package com.yaedora.Member.dto;


import com.yaedora.Member.Entity.Member;
import com.yaedora.Member.Entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long id;
    private String content;
    private MemberDto member;

    public static ReviewDto from(Review r){
        return new ReviewDto(
                r.getId(),
                r.getText(),
                MemberDto.from(r.getMember())
        );
    }
}
