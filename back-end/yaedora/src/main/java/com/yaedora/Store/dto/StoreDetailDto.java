package com.yaedora.Store.dto;


import com.yaedora.Member.dto.ReviewDto;
import com.yaedora.Store.entity.Menu;
import com.yaedora.Store.entity.Store;
import com.yaedora.Store.repository.MenuRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StoreDetailDto {

    private StoreDto store;
    private List<MenuDto> menus;
    private Long likesCount;
    private double grade_avg;

    private List<ReviewDto> reviewDtos;

    public StoreDetailDto(StoreDto store,List<MenuDto> menus, Long likesCount, double grade_avg, List<ReviewDto> reviewDtos){
        this.store = store;
        this.menus = menus;
        this.likesCount = likesCount;
        this.grade_avg = grade_avg;
        this.reviewDtos = reviewDtos;
    }


}
