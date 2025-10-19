// Local: /backend/src/main/java/br/com/cupcakeapp/backend/dto/ItemPedidoDTO.java
package br.com.cupcakeapp.backend.dto;

import lombok.Data;

@Data
public class ItemPedidoDTO {
    private Integer produtoId;
    private Integer quantidade;
}