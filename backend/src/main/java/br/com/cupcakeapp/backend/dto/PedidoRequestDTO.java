// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/PedidoRequestDTO.java
package br.com.cupcakeapp.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class PedidoRequestDTO {
    private Integer enderecoId;
    private List<ItemPedidoDTO> itens;
}