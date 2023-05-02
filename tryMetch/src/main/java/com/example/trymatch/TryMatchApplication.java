package com.example.trymatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TryMatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(TryMatchApplication.class, args);
    }

}
