// Local: /backend/src/main/java/br/com/cupcakeapp/backend/service/AuthService.java

package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.LoginRequestDTO;
import br.com.cupcakeapp.backend.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ClienteRepository clienteRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String login(LoginRequestDTO loginDTO) {
        // 1. O AuthenticationManager usa o nosso AuthenticationProvider para validar o usuário e a senha.
        // Se as credenciais estiverem erradas, ele lançará uma exceção (BadCredentialsException).
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(),
                loginDTO.getSenha()
            )
        );

        // 2. Se a autenticação for bem-sucedida, buscamos os detalhes do usuário.
        UserDetails user = clienteRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado após autenticação bem-sucedida."));

        // 3. Geramos e retornamos o token JWT para este usuário.
        return jwtService.generateToken(user);
    }
}