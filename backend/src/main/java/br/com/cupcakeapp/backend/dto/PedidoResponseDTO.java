// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/PedidoResponseDTO.java
package br.com.cupcakeapp.backend.dto;

import br.com.cupcakeapp.backend.model.Pedido;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class PedidoResponseDTO {

    private Integer id;
    private LocalDateTime dataPedido;
    private BigDecimal valorTotal;
    private String statusPedido;
    private String nomeCliente;
    private String enderecoCompleto;
    private List<ItemPedidoResponseDTO> itens;

    public PedidoResponseDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.dataPedido = pedido.getDataPedido();
        this.valorTotal = pedido.getValorTotal();
        this.statusPedido = pedido.getStatusPedido();
        this.nomeCliente = pedido.getCliente().getNome();
        this.enderecoCompleto = String.format("%s, %s - %s, %s",
                pedido.getEndereco().getRua(),
                pedido.getEndereco().getNumero(),
                pedido.getEndereco().getBairro(),
                pedido.getEndereco().getCidade());
        this.itens = pedido.getItens().stream()
                .map(ItemPedidoResponseDTO::new)
                .collect(Collectors.toList());
    }
}