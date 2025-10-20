// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/EnderecoDTO.java
package br.com.cupcakeapp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EnderecoDTO {

    @NotBlank
    private String rua;
    @NotBlank
    private String numero;
    private String complemento;
    @NotBlank
    private String bairro;
    @NotBlank
    private String cidade;
    @NotBlank
    private String cep;
}