package com.yaedora.Member.dto;


import com.yaedora.Member.Entity.Review;
import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {
    private ReviewDto reviewDto;
    private StoreDto storeDto;
}
