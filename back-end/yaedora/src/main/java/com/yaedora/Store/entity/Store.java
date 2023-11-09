package com.yaedora.Store.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Store {
    @Id
    private Long id;

    @Column(name = "storename")
    private String storename;

    private String fulladdress;

    @Column(name = "category")
    private String category;

    private float latitude;
    private float longitude;

    public Store(Long id, String storename, String fulladdress, String category, float latitude, float longitude){
        this.id = id;
        this.storename = storename;
        this.fulladdress = fulladdress;
        this.category = category;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
