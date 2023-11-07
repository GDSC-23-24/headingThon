package com.yaedora.Location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location,Long> {

    @Query("select l.village from Location l where l.town= :town")
    public List<String> findVillageByTown(@Param("town") String town);

    @Query("select DISTINCT l.town from Location l")
    public List<String> findTowns();

}
