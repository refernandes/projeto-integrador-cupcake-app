// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/AuthController.java
package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.ClienteCadastroDTO;
import br.com.cupcakeapp.backend.dto.ClienteResponseDTO;
import br.com.cupcakeapp.backend.dto.LoginRequestDTO;
import br.com.cupcakeapp.backend.model.Cliente;
import br.com.cupcakeapp.backend.service.ClienteService;
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

    // Injeção de dependência via construtor (melhor prática)
    @Autowired
    public AuthController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping("/register")
    public ResponseEntity<ClienteResponseDTO> registerUser(@RequestBody ClienteCadastroDTO clienteDTO) {
        // 1. Chama o service para executar a lógica de negócio
        Cliente novoCliente = clienteService.cadastrar(clienteDTO);

        // 2. Constrói a URI do novo recurso criado (boa prática REST)
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(novoCliente.getId())
                .toUri();

        // 3. Converte a entidade para um DTO de resposta (sem a senha)
        ClienteResponseDTO responseDTO = new ClienteResponseDTO(novoCliente);

        // 4. Retorna o status 201 Created com a localização e o corpo da resposta
        return ResponseEntity.created(location).body(responseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequestDTO loginDTO) {
        // A lógica de login real com JWT será implementada na fase de segurança.
        // Por enquanto, podemos simular a chamada a um futuro service de login.
        // String token = authService.login(loginDTO);
        // return ResponseEntity.ok(token);
        
        // Retorno temporário para validar o endpoint
        return ResponseEntity.ok("Endpoint de login funcional. A implementação do JWT é o próximo passo.");
    }
}