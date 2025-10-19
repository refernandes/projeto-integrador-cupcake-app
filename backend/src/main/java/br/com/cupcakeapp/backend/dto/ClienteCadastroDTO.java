// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/ClienteCadastroDTO.java
package br.com.cupcakeapp.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteCadastroDTO {
    private String nome;
    private String email;
    private String senha;
    private String telefone;
}