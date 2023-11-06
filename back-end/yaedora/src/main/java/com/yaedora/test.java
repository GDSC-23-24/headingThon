package com.yaedora;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class test {
    @Id
    public int id;

    public String test;
}
