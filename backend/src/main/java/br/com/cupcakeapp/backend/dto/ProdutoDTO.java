// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/ProdutoDTO.java
package br.com.cupcakeapp.backend.dto;

import lombok.Data; // @Data gera Getters, Setters, toString, etc.
import java.math.BigDecimal;

@Data
public class ProdutoDTO {
    private Integer id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String sabor;
    private String imagemUrl;
    private Integer estoque;
    private Boolean ativo;
}