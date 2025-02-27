package com.chilllover.chillnet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ChillnetApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChillnetApplication.class, args);
	}

}
