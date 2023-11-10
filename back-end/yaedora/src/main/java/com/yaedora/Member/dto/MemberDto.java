package com.yaedora.Member.dto;


import com.yaedora.Member.Entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String name;

    public static MemberDto from(Member m){
        return new MemberDto(
                m.getId(),
                m.getName()
        );
    }
}
