package com.adptapaw.backend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class DotEnvConfig {

    @PostConstruct
    public void loadEnv() {
        try {
            Dotenv dotenv = Dotenv.configure()
                    .directory("./")
                    .ignoreIfMissing()
                    .load();
            
            // Set system properties from .env file
            dotenv.entries().forEach(entry -> {
                String key = entry.getKey();
                String value = entry.getValue();
                if (System.getProperty(key) == null) {
                    System.setProperty(key, value);
                }
            });
            
            System.out.println("Environment variables loaded from .env file");
        } catch (Exception e) {
            System.out.println("Warning: Could not load .env file. Using system environment variables instead.");
        }
    }
}

