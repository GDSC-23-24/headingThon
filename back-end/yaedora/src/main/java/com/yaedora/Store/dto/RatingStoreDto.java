package com.yaedora.Store.dto;

import com.yaedora.Store.entity.RatingStore;
import com.yaedora.Store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class RatingStoreDto {

    private Long id;

    private double rating;

    private Long member_id;

    private Store store;

    public static RatingStoreDto from(RatingStore store){
        return new RatingStoreDto(store.getId(),
                store.getRating(),
                store.getMember().getId(),
                store.getStore()
                );
    }
}
