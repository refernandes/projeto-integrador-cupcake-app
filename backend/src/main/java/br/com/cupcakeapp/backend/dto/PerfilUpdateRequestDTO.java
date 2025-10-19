// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/PerfilUpdateRequestDTO.java
package br.com.cupcakeapp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PerfilUpdateRequestDTO {

    @NotBlank(message = "O nome não pode ser vazio.")
    private String nome;

    private String telefone;
}