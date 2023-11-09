package com.yaedora.Store.repository;

import com.yaedora.Store.dto.MenuDto;
import com.yaedora.Store.entity.Menu;
import org.hibernate.usertype.UserTypeLegacyBridge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu,Long> {

    @Query("select new com.yaedora.Store.dto.MenuDto(m.id, m.menuName, m.store.id)  from Menu m  where m.store.id = :storeId")
    List<MenuDto> findAllByStoreId(@Param("storeId") Long StoreId);
}
