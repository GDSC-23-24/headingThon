package com.yaedora.Member.Entity;

import com.yaedora.Store.entity.StoreLikes;
import com.yaedora.Store.entity.RecommendStore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    private Long id;

    private String name;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<StoreLikes> storeLikes;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<RecommendStore> RecommendStores;
}
