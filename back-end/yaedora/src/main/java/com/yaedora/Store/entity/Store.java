package com.yaedora.Store.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
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
}
