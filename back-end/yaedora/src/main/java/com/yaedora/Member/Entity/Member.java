package com.yaedora.Member.Entity;

import com.yaedora.Store.entity.StoreLikes;
import com.yaedora.Store.entity.RecommendStore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<StoreLikes> storeLikes;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<RecommendStore> RecommendStores;
}
