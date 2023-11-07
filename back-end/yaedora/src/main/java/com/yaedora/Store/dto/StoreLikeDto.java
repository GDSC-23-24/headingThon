package com.yaedora.Store.dto;

import com.yaedora.Store.entity.Store;
import com.yaedora.Store.entity.StoreLikes;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class StoreLikeDto {
    private Long id;

    private Store store;

    private String color;

    public static StoreLikeDto from(StoreLikes e){
        return new StoreLikeDto(
                e.getId(),
                e.getStore(),
                "red"
        );
    }

}
