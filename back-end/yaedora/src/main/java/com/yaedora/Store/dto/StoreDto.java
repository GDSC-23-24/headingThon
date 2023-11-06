package com.yaedora.Store.dto;

import com.yaedora.Store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@AllArgsConstructor
public class StoreDto {

    private Long id;

    private String storeName;

    private String fullAddress;

    private String category;

    private float latitude;

    private float longitude;

    public static StoreDto from(Store store){
        return new StoreDto(store.getId(),
                store.getCategory(),
                store.getFulladdress(),
                store.getCategory(),
                store.getLatitude(),
                store.getLongitude()
                );
    }
}
