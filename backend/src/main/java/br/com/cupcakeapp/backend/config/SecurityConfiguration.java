// Local: /backend/src/main/java/br/com/cupcakeapp/backend/config/SecurityConfiguration.java

package br.com.cupcakeapp.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desabilita o CSRF (Cross-Site Request Forgery), pois não usamos sessões.
            .csrf(AbstractHttpConfigurer::disable)

            // 2. Define as regras de autorização para cada endpoint.
            .authorizeHttpRequests(auth -> auth
                // Nossos endpoints públicos (não precisam de autenticação)
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/produtos/**").permitAll()

                // Todos os outros endpoints exigem autenticação
                .anyRequest().authenticated()
            )

            // 3. Define a política de gerenciamento de sessão como STATELESS (sem estado).
            // A cada requisição, a autenticação será reavaliada via token.
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 4. Define o nosso provedor de autenticação customizado.
            .authenticationProvider(authenticationProvider)

            // 5. Adiciona o nosso filtro de JWT para rodar ANTES do filtro padrão de autenticação.
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}