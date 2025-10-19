// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/ProdutoRequestDTO.java

package br.com.cupcakeapp.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;

@Data // Gera Getters, Setters, etc.
public class ProdutoRequestDTO {

    @NotBlank(message = "O nome do produto não pode ser vazio.")
    @Size(max = 100, message = "O nome do produto deve ter no máximo 100 caracteres.")
    private String nome;

    @NotBlank(message = "A descrição do produto não pode ser vazia.")
    private String descricao;

    @NotNull(message = "O preço não pode ser nulo.")
    @PositiveOrZero(message = "O preço deve ser um valor positivo ou zero.")
    private BigDecimal preco;

    private String sabor;
    private String imagemUrl;

    @NotNull(message = "O estoque não pode ser nulo.")
    @PositiveOrZero(message = "O estoque deve ser um valor positivo ou zero.")
    private Integer estoque;
}