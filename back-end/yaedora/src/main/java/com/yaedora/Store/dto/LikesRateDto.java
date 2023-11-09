package com.yaedora.Store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LikesRateDto {
    private Long likes;
    private double rate_avg;

    public LikesRateDto(Long likes, double rate_avg){
        this.likes = likes;
        this.rate_avg = rate_avg;
    }
}
