// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/ContaController.java

package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.*;
import br.com.cupcakeapp.backend.model.Cliente;
import br.com.cupcakeapp.backend.model.Pedido;
import br.com.cupcakeapp.backend.service.ClienteService;
import br.com.cupcakeapp.backend.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/conta")
@CrossOrigin(origins = "*")
public class ContaController {

    private final PedidoService pedidoService;
    private final ClienteService clienteService;

    // Injeção de ambas as dependências via construtor
    @Autowired
    public ContaController(PedidoService pedidoService, ClienteService clienteService) {
        this.pedidoService = pedidoService;
        this.clienteService = clienteService;
    }

    // --- Endpoints de Pedidos ---

    @PostMapping("/pedidos")
    public ResponseEntity<PedidoResponseDTO> criarPedido(@Valid @RequestBody PedidoRequestDTO pedidoDTO) {
        // Placeholder do ID do cliente logado. Será substituído pela autenticação JWT.
        Integer clienteId = 1; 
        Pedido novoPedido = pedidoService.criarPedido(pedidoDTO, clienteId);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(novoPedido.getId()).toUri();
        return ResponseEntity.created(location).body(new PedidoResponseDTO(novoPedido));
    }

    /**
     * Endpoint para buscar o histórico de pedidos do cliente (HU #20).
     * URL: GET /api/conta/pedidos
     */
    @GetMapping("/pedidos")
    public ResponseEntity<List<PedidoResponseDTO>> historicoPedidos() {
        // Placeholder do ID do cliente logado.
        Integer clienteId = 1; 
        List<Pedido> pedidos = pedidoService.buscarPorCliente(clienteId);
        List<PedidoResponseDTO> responseDTOs = pedidos.stream()
                .map(PedidoResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }
    
    /**
     * Endpoint para acompanhar um pedido específico (HU #10).
     * URL: GET /api/conta/pedidos/{id}
     */
    @GetMapping("/pedidos/{id}")
    public ResponseEntity<PedidoResponseDTO> acompanharPedido(@PathVariable Integer id) {
        // Placeholder do ID do cliente logado.
        Integer clienteId = 1; 
        Pedido pedido = pedidoService.buscarPorIdECliente(id, clienteId);
        return ResponseEntity.ok(new PedidoResponseDTO(pedido));
    }
    
    // --- Endpoints de Perfil (HU #18) ---
    
    /**
     * Endpoint para buscar os dados do perfil do cliente.
     * URL: GET /api/conta/perfil
     */
    @GetMapping("/perfil")
    public ResponseEntity<ClienteResponseDTO> verPerfil() {
        // Placeholder do ID do cliente logado.
        Integer clienteId = 1; 
        Cliente cliente = clienteService.buscarPerfil(clienteId);
        return ResponseEntity.ok(new ClienteResponseDTO(cliente));
    }
    
    /**
     * Endpoint para atualizar os dados do perfil do cliente.
     * URL: PUT /api/conta/perfil
     */
    @PutMapping("/perfil")
    public ResponseEntity<ClienteResponseDTO> atualizarPerfil(@Valid @RequestBody PerfilUpdateRequestDTO perfilDTO) {
        // Placeholder do ID do cliente logado.
        Integer clienteId = 1;
        Cliente clienteAtualizado = clienteService.atualizarPerfil(clienteId, perfilDTO);
        return ResponseEntity.ok(new ClienteResponseDTO(clienteAtualizado));
    }
}