// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/AuthController.java

package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.ClienteCadastroDTO;
import br.com.cupcakeapp.backend.dto.ClienteResponseDTO;
import br.com.cupcakeapp.backend.dto.LoginRequestDTO;
import br.com.cupcakeapp.backend.dto.LoginResponseDTO; // Importe o DTO de resposta do login
import br.com.cupcakeapp.backend.model.Cliente;
import br.com.cupcakeapp.backend.service.AuthService; // Importe o novo AuthService
import br.com.cupcakeapp.backend.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final ClienteService clienteService;
    private final AuthService authService; // Injete o novo AuthService

    // O construtor agora recebe os dois services
    @Autowired
    public AuthController(ClienteService clienteService, AuthService authService) {
        this.clienteService = clienteService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ClienteResponseDTO> registerUser(@Valid @RequestBody ClienteCadastroDTO clienteDTO) {
        Cliente novoCliente = clienteService.cadastrar(clienteDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(novoCliente.getId()).toUri();
        ClienteResponseDTO responseDTO = new ClienteResponseDTO(novoCliente);
        return ResponseEntity.created(location).body(responseDTO);
    }

    /**
     * Endpoint de Login que agora gera e retorna um token JWT.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody LoginRequestDTO loginDTO) {
        // 1. Chama o AuthService para validar as credenciais e gerar o token.
        String token = authService.login(loginDTO);

        // 2. Cria o DTO de resposta e o retorna no corpo da resposta com status 200 OK.
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}