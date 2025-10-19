// Local: /backend/src/main/java/br/com/cupcakeapp/backend/config/SecurityConfig.java
package br.com.cupcakeapp.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean // Este método cria um "bean" que o Spring pode injetar em outras classes
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}