package br.com.cupcakeapp.backend.dto;

import br.com.cupcakeapp.backend.model.ItemPedido;
import br.com.cupcakeapp.backend.model.Produto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class ItemPedidoResponseDTO {

    // Apenas os dados do ITEM DO PEDIDO
    private Integer quantidade;
    private BigDecimal precoUnitario;
    private BigDecimal subtotal;

    // Os dados do PRODUTO ficam dentro deste objeto seguro para quebrar o loop
    private ProdutoResumidoDTO produto;

    public ItemPedidoResponseDTO(ItemPedido itemPedido) {
        this.quantidade = itemPedido.getQuantidade();
        this.precoUnitario = itemPedido.getPrecoUnitario();
        this.subtotal = itemPedido.getSubtotal();
        this.produto = new ProdutoResumidoDTO(itemPedido.getProduto());
    }

    // Classe interna aninhada que quebra a referência circular
    @Getter
    @NoArgsConstructor
    private static class ProdutoResumidoDTO {
        private Integer id;
        private String nome;
        private String imagemUrl;

        public ProdutoResumidoDTO(Produto produto) {
            this.id = produto.getId();
            this.nome = produto.getNome();
            this.imagemUrl = produto.getImagemUrl();
        }
    }
}