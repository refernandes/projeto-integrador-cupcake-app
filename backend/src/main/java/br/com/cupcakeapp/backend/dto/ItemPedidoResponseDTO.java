// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/ItemPedidoResponseDTO.java
package br.com.cupcakeapp.backend.dto;

import br.com.cupcakeapp.backend.model.ItemPedido;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class ItemPedidoResponseDTO {

    private String nomeProduto;
    private Integer quantidade;
    private BigDecimal precoUnitario;
    private BigDecimal subtotal;

    public ItemPedidoResponseDTO(ItemPedido itemPedido) {
        this.nomeProduto = itemPedido.getProduto().getNome();
        this.quantidade = itemPedido.getQuantidade();
        this.precoUnitario = itemPedido.getPrecoUnitario();
        this.subtotal = itemPedido.getSubtotal();
    }
}