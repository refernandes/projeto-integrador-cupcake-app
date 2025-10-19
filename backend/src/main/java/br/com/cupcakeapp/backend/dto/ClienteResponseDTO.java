// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/ClienteResponseDTO.java
package br.com.cupcakeapp.backend.dto;

import br.com.cupcakeapp.backend.model.Cliente;
import lombok.Getter;

@Getter
public class ClienteResponseDTO {

    private Integer id;
    private String nome;
    private String email;
    private String telefone;

    // Construtor que converte uma Entidade Cliente para um DTO de resposta
    public ClienteResponseDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.email = cliente.getEmail();
        this.telefone = cliente.getTelefone();
    }
}