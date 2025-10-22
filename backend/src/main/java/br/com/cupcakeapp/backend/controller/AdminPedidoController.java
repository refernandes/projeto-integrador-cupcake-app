// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/AdminPedidoController.java
package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.PedidoResponseDTO; // Crie ou ajuste este import
import br.com.cupcakeapp.backend.model.Pedido;
import br.com.cupcakeapp.backend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/pedidos")
@CrossOrigin(origins = "*")
public class AdminPedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<PedidoResponseDTO>> listarTodosOsPedidos() {
        return ResponseEntity.ok(pedidoService.listarTodosAdmin());
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<PedidoResponseDTO> alterarStatusDoPedido(
            @PathVariable Integer id,
            @RequestParam String novoStatus) { // USA @RequestParam, NÃO @RequestBody
        
        // A lógica do serviço permanece a mesma
        Pedido pedidoAtualizado = pedidoService.alterarStatus(id, novoStatus);
        return ResponseEntity.ok(new PedidoResponseDTO(pedidoAtualizado));
    }
}