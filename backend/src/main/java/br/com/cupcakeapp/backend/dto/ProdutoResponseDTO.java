// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/ProdutoResponseDTO.java

package br.com.cupcakeapp.backend.dto;

import br.com.cupcakeapp.backend.model.Produto;
import lombok.Getter;

import java.math.BigDecimal;

@Getter // Lombok gera os métodos get para todos os campos
public class ProdutoResponseDTO {

    private Integer id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private String sabor;
    private String imagemUrl;
    private Integer estoque;

    // Este construtor é a "fábrica" que transforma um objeto do banco (Produto)
    // em um objeto seguro para a API (ProdutoResponseDTO).
    public ProdutoResponseDTO(Produto produto) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.descricao = produto.getDescricao();
        this.preco = produto.getPreco();
        this.sabor = produto.getSabor();
        this.imagemUrl = produto.getImagemUrl();
        this.estoque = produto.getEstoque();
    }
}