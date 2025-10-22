// Local: /backend/src/main/java/br/com/cupcakeapp/backend/service/PedidoService.java
package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.ItemPedidoDTO;
import br.com.cupcakeapp.backend.dto.PedidoRequestDTO;
import br.com.cupcakeapp.backend.model.*;
import br.com.cupcakeapp.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.com.cupcakeapp.backend.dto.PedidoResponseDTO;
import java.util.stream.Collectors;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;
    private final ProdutoRepository produtoRepository;

    @Autowired
    public PedidoService(PedidoRepository pedidoRepository, ClienteRepository clienteRepository, EnderecoRepository enderecoRepository, ProdutoRepository produtoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.enderecoRepository = enderecoRepository;
        this.produtoRepository = produtoRepository;
    }

    /**
     * Cria um novo pedido. Esta operação é transacional: ou tudo funciona, ou nada é salvo.
     */
    @Transactional // Garante a atomicidade da operação
    public Pedido criarPedido(PedidoRequestDTO pedidoDTO, Integer clienteId) {
        // 1. Busca as entidades principais
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado."));
        Endereco endereco = enderecoRepository.findById(pedidoDTO.getEnderecoId())
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado."));
        
        // Regra de negócio: validar se o endereço pertence ao cliente
        if (!endereco.getCliente().getId().equals(clienteId)) {
            throw new RuntimeException("Endereço inválido para este cliente.");
        }

        // 2. Cria a entidade Pedido
        Pedido novoPedido = new Pedido();
        novoPedido.setCliente(cliente);
        novoPedido.setEndereco(endereco);
        novoPedido.setStatusPedido("Pedido Confirmado");
        novoPedido.setItens(new ArrayList<>());
        
        BigDecimal valorTotal = BigDecimal.ZERO;

        // 3. Processa cada item do pedido
        for (ItemPedidoDTO itemDTO : pedidoDTO.getItens()) {
            Produto produto = produtoRepository.findById(itemDTO.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado: ID " + itemDTO.getProdutoId()));

            // Regra de negócio: validar estoque
            if (produto.getEstoque() < itemDTO.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
            }

            // 4. Cria o ItemPedido
            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(itemDTO.getQuantidade());
            itemPedido.setPrecoUnitario(produto.getPreco());
            itemPedido.setSubtotal(produto.getPreco().multiply(new BigDecimal(itemDTO.getQuantidade())));
            itemPedido.setPedido(novoPedido); // Associa o item ao pedido principal

            novoPedido.getItens().add(itemPedido);
            valorTotal = valorTotal.add(itemPedido.getSubtotal());
            
            // 5. Atualiza o estoque do produto
            produto.setEstoque(produto.getEstoque() - itemDTO.getQuantidade());
            produtoRepository.save(produto);
        }

        novoPedido.setValorTotal(valorTotal);

        // 6. Salva o pedido (graças ao Cascade, os itens são salvos juntos)
        return pedidoRepository.save(novoPedido);
    }

    /**
     * Retorna TODOS os pedidos para o painel de administração.
     */
    public List<PedidoResponseDTO> listarTodosAdmin() {
        return pedidoRepository.findAll()
                .stream()
                .map(PedidoResponseDTO::new) // Converte cada Pedido para um DTO
                .collect(Collectors.toList());
    }

    /**
     * Busca o histórico de pedidos de um cliente.
     */
    public List<Pedido> buscarPorCliente(Integer clienteId) {
        return pedidoRepository.findByClienteIdOrderByDataPedidoDesc(clienteId);
    }
    /**
 * Busca um pedido específico pelo seu ID, garantindo que ele pertença ao cliente informado.
 */
public Pedido buscarPorIdECliente(Integer pedidoId, Integer clienteId) {
    Pedido pedido = pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado com o ID: " + pedidoId));

    // Regra de negócio: um cliente só pode ver seus próprios pedidos.
    if (!pedido.getCliente().getId().equals(clienteId)) {
        throw new RuntimeException("Acesso negado. Este pedido não pertence ao cliente informado.");
    }

    

    return pedido;

    
}

public List<PedidoResponseDTO> buscarPorClienteDTO(Integer clienteId) {
        // 1. Reusa seu método existente que busca a entidade
        List<Pedido> pedidos = buscarPorCliente(clienteId); //

        // 2. Converte a lista de Entidades para uma lista de DTOs
        return pedidos.stream()
                .map(PedidoResponseDTO::new) // Usa o mesmo construtor do 'listarTodosAdmin'
                .collect(Collectors.toList());
    }

@Transactional // Garante que a operação seja atômica
public Pedido alterarStatus(Integer id, String novoStatus) {
    Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado com o ID: " + id));
    pedido.setStatusPedido(novoStatus);
    return pedidoRepository.save(pedido);
}
}
