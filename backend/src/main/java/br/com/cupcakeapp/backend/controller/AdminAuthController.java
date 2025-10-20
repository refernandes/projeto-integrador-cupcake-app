// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/AdminAuthController.java

package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.LoginRequestDTO;
import br.com.cupcakeapp.backend.dto.LoginResponseDTO;
import br.com.cupcakeapp.backend.service.AuthService; // Reutilizaremos o AuthService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/auth") // Um caminho distinto para o login do admin
@CrossOrigin(origins = "*")
public class AdminAuthController {

    // O AuthService já tem a lógica de autenticação que precisamos.
    // O Spring saberá qual tipo de usuário (Cliente ou Admin) buscar
    // graças à nossa próxima alteração no ApplicationConfig.
    private final AuthService authService;

    @Autowired
    public AdminAuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginAdmin(@RequestBody LoginRequestDTO loginDTO) {
        String token = authService.login(loginDTO);
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}