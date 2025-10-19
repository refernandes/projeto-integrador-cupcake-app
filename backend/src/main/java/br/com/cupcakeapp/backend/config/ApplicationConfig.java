// Local: /backend/src/main/java/br/com/cupcakeapp/backend/config/ApplicationConfig.java

package br.com.cupcakeapp.backend.config;

import br.com.cupcakeapp.backend.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final ClienteRepository clienteRepository;

    /**
     * Este Bean ensina o Spring Security a como buscar um usuário no banco de dados.
     * Quando o Spring precisa de um usuário, ele chama este método.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> clienteRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o e-mail: " + username));
    }

    /**
     * Este Bean é o "provedor de autenticação". Ele junta o UserDetailsService
     * (para buscar o usuário) com o PasswordEncoder (para comparar as senhas).
     */
    @Bean
    @SuppressWarnings("deprecation") // ADICIONE ESTA LINHA PARA IGNORAR O ALERTA
    public AuthenticationProvider authenticationProvider(PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    /**
     * Este Bean expõe o AuthenticationManager do Spring, que será usado no nosso
     * endpoint de login para processar a tentativa de autenticação.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}