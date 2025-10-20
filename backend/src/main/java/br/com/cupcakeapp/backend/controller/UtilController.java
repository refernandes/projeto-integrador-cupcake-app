// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/UtilController.java

package br.com.cupcakeapp.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/util")
@RequiredArgsConstructor
public class UtilController {

    private final PasswordEncoder passwordEncoder;

    // Endpoint para gerar um hash BCrypt de uma senha
    @GetMapping("/hash-password")
    public ResponseEntity<String> getHashedPassword(@RequestParam String password) {
        return ResponseEntity.ok(passwordEncoder.encode(password));
    }
}