// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/ContaController.java

package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.*;
import br.com.cupcakeapp.backend.model.Cliente;
import br.com.cupcakeapp.backend.model.Endereco;
import br.com.cupcakeapp.backend.model.Pedido;
import br.com.cupcakeapp.backend.service.ClienteService;
import br.com.cupcakeapp.backend.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal; // Importe a anotação
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

    @Autowired
    public ContaController(PedidoService pedidoService, ClienteService clienteService) {
        this.pedidoService = pedidoService;
        this.clienteService = clienteService;
    }

    // --- Endpoints de Pedidos ---

    @PostMapping("/pedidos")
    public ResponseEntity<PedidoResponseDTO> criarPedido(
            @Valid @RequestBody PedidoRequestDTO pedidoDTO,
            @AuthenticationPrincipal Cliente clienteLogado) { // O Spring injeta o cliente logado aqui!
        
        Pedido novoPedido = pedidoService.criarPedido(pedidoDTO, clienteLogado.getId()); // Usamos o ID do cliente real
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(novoPedido.getId()).toUri();
        return ResponseEntity.created(location).body(new PedidoResponseDTO(novoPedido));
    }

    @GetMapping("/pedidos")
    public ResponseEntity<List<PedidoResponseDTO>> historicoPedidos(@AuthenticationPrincipal Cliente clienteLogado) {
        List<Pedido> pedidos = pedidoService.buscarPorCliente(clienteLogado.getId());
        List<PedidoResponseDTO> responseDTOs = pedidos.stream()
                .map(PedidoResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }
    
    @GetMapping("/pedidos/{id}")
    public ResponseEntity<PedidoResponseDTO> acompanharPedido(
            @PathVariable Integer id,
            @AuthenticationPrincipal Cliente clienteLogado) {
        Pedido pedido = pedidoService.buscarPorIdECliente(id, clienteLogado.getId());
        return ResponseEntity.ok(new PedidoResponseDTO(pedido));
    }
    
    // --- Endpoints de Perfil (HU #18) ---
    
    @GetMapping("/perfil")
    public ResponseEntity<ClienteResponseDTO> verPerfil(@AuthenticationPrincipal Cliente clienteLogado) {
        // Não precisamos mais chamar o service para buscar o cliente, o Spring já nos deu ele!
        return ResponseEntity.ok(new ClienteResponseDTO(clienteLogado));
    }
    
    @PutMapping("/perfil")
    public ResponseEntity<ClienteResponseDTO> atualizarPerfil(
            @Valid @RequestBody PerfilUpdateRequestDTO perfilDTO,
            @AuthenticationPrincipal Cliente clienteLogado) {
        Cliente clienteAtualizado = clienteService.atualizarPerfil(clienteLogado.getId(), perfilDTO);
        return ResponseEntity.ok(new ClienteResponseDTO(clienteAtualizado));
    }
    // ADICIONE ESTES MÉTODOS DENTRO DA CLASSE ContaController

    // --- Endpoints de Endereços ---

    /**
     * Endpoint para buscar todos os endereços do cliente logado.
     * URL: GET /api/conta/enderecos
     */
    @GetMapping("/enderecos")
    public ResponseEntity<List<Endereco>> listarEnderecos(@AuthenticationPrincipal Cliente clienteLogado) {
        List<Endereco> enderecos = clienteService.buscarEnderecosPorCliente(clienteLogado.getId());
        return ResponseEntity.ok(enderecos);
    }

    /**
     * Endpoint para adicionar um novo endereço para o cliente logado.
     * URL: POST /api/conta/enderecos
     */
    @PostMapping("/enderecos")
    public ResponseEntity<Endereco> adicionarEndereco(
            @AuthenticationPrincipal Cliente clienteLogado,
            @Valid @RequestBody EnderecoDTO enderecoDTO) {
        Endereco novoEndereco = clienteService.adicionarEndereco(clienteLogado.getId(), enderecoDTO);
        return ResponseEntity.status(201).body(novoEndereco);
    }
}