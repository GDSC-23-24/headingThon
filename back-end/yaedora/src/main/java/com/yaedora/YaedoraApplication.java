package com.yaedora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class YaedoraApplication {

	public static void main(String[] args) {
		SpringApplication.run(YaedoraApplication.class, args);
	}

}
