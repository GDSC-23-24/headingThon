package com.yaedora.Store.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MenuDto {
    private Long id;
    private String menuName;
    private Long storeId;

    public MenuDto(Long id, String menuName,Long storeId){
        this.id =id;
        this.menuName = menuName;
        this.storeId = storeId;
    }
}
