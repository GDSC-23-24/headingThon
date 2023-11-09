package com.yaedora.Store.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StoreLikesCountDto {
    private Long storeId;
    private Long likesCount;

    public StoreLikesCountDto(Long storeId, Long likesCount) {
        this.storeId = storeId;
        this.likesCount = likesCount;
    }

}
