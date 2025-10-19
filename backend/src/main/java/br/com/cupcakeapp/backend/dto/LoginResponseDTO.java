// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/LoginResponseDTO.java

package br.com.cupcakeapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor // Anotação do Lombok que cria um construtor com todos os campos
public class LoginResponseDTO {

    private String token;
}