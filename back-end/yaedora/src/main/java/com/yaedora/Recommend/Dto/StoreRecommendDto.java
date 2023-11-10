package com.yaedora.Recommend.Dto;

import com.yaedora.Store.dto.StoreDto;
import com.yaedora.Store.entity.Store;
import com.yaedora.Store.entity.StoreLikes;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class StoreRecommendDto {

    private Store store;

    private String color;

    public static StoreRecommendDto from(Store e){
        return new StoreRecommendDto(
                e,
                "skyblue"
        );
    }

}
