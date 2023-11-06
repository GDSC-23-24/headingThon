package com.yaedora.Location;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LocationDto {
    private Long id;
    private String city;

    private String town;

    private String village;

}
