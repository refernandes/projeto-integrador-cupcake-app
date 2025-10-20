// Local: /backend/src/main/java/br/com/cupcakeapp/backend/service/AuthService.java

package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.LoginRequestDTO;
import br.com.cupcakeapp.backend.repository.AdministradorRepository; // Importe o repositório do admin
import br.com.cupcakeapp.backend.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService; // Importe o UserDetailsService
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    // NÃO PRECISAMOS MAIS DOS REPOSITÓRIOS DIRETAMENTE AQUI
    // private final ClienteRepository clienteRepository;
    // private final AdministradorRepository administradorRepository;
    
    // PRECISAMOS DO UserDetailsService, que já sabe como encontrar qualquer tipo de usuário
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String login(LoginRequestDTO loginDTO) {
        // 1. O AuthenticationManager valida as credenciais. Se estiverem erradas, lança uma exceção.
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(),
                loginDTO.getSenha()
            )
        );

        // 2. A SOLUÇÃO: Em vez de procurar em um repositório específico,
        // nós usamos o UserDetailsService, que já tem a lógica "bilingual" para
        // encontrar o usuário, seja ele Cliente ou Administrador.
        UserDetails user = userDetailsService.loadUserByUsername(loginDTO.getEmail());

        // 3. Geramos e retornamos o token JWT para o usuário encontrado.
        return jwtService.generateToken(user);
    }
}