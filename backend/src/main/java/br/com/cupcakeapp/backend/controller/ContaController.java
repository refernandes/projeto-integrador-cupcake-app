// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/ContaController.java
package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.model.Pedido; // Usaremos DTOs
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/conta") // Rotas protegidas, para o cliente logado
@CrossOrigin(origins = "*")
public class ContaController {

    // @Autowired
    // private PedidoService pedidoService;
    // @Autowired
    // private ClienteService clienteService;

    // --- Endpoints de Pedidos ---

    @PostMapping("/pedidos")
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedidoDTO) {
        // O DTO aqui será complexo, contendo os itens do pedido
        // TODO: Chamar pedidoService.criarPedido(pedidoDTO, idDoClienteLogado);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/pedidos")
    public ResponseEntity<List<Pedido>> historicoPedidos() {
        // HU #20: Histórico de Pedidos
        // TODO: Chamar pedidoService.buscarPorCliente(idDoClienteLogado);
        return ResponseEntity.ok(Collections.emptyList());
    }
    
    @GetMapping("/pedidos/{id}")
    public ResponseEntity<Pedido> acompanharPedido(@PathVariable Integer id) {
        // HU #10: Acompanhar Entrega
        // TODO: Chamar pedidoService.buscarPorIdECliente(id, idDoClienteLogado);
        return ResponseEntity.ok(null);
    }
    
    // --- Endpoints de Perfil ---
    
    @GetMapping("/perfil")
    public ResponseEntity<String> verPerfil() {
        // HU #18: Gerenciar Perfil
        // TODO: Chamar clienteService.buscarPerfil(idDoClienteLogado);
        return ResponseEntity.ok("Dados do perfil (a implementar)");
    }
    
    @PutMapping("/perfil")
    public ResponseEntity<String> atualizarPerfil(@RequestBody String perfilDTO) {
        // HU #18: Gerenciar Perfil
        // TODO: Chamar clienteService.atualizarPerfil(idDoClienteLogado, perfilDTO);
        return ResponseEntity.ok("Perfil atualizado (a implementar)");
    }
}