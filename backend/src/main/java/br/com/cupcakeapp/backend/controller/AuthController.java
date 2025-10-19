// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/AuthController.java
package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.ClienteCadastroDTO;
import br.com.cupcakeapp.backend.dto.LoginRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Marca a classe como um controller de API REST
@RequestMapping("/auth") // Todas as rotas neste controller começarão com /auth
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem (essencial para o React)
public class AuthController {

    // A lógica de negócio será injetada aqui através de um Service (próximo passo)
    // @Autowired
    // private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody ClienteCadastroDTO clienteDTO) {
        // TODO: Chamar o authService.cadastrar(clienteDTO);
        // Por enquanto, retornamos uma resposta simples.
        return ResponseEntity.ok("Usuário cadastrado com sucesso! (Lógica a ser implementada)");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequestDTO loginDTO) {
        // TODO: Chamar o authService.login(loginDTO) que retornará um token JWT.
        // Por enquanto, retornamos uma resposta simples.
        return ResponseEntity.ok("Login bem-sucedido! (Lógica a ser implementada)");
    }
}