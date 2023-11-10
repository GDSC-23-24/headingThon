package com.yaedora.Store.dto;

import com.yaedora.Store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StoreResponseDto {
    private StoreDto store;
    private String color;

    public static StoreResponseDto from(Store d){
        return new StoreResponseDto(
                StoreDto.from(d),
                "연두"
        );
    }
}
