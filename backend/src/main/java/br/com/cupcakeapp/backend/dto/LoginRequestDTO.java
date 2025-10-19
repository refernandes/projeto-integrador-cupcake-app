// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/LoginRequestDTO.java
package br.com.cupcakeapp.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {
    private String email;
    private String senha;
}