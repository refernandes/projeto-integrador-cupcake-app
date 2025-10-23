package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.ItemPedidoDTO;
import br.com.cupcakeapp.backend.dto.PedidoRequestDTO;
import br.com.cupcakeapp.backend.model.*;
import br.com.cupcakeapp.backend.repository.ClienteRepository;
import br.com.cupcakeapp.backend.repository.EnderecoRepository;
import br.com.cupcakeapp.backend.repository.PedidoRepository;
import br.com.cupcakeapp.backend.repository.ProdutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    // --- Mocks (Todas as dependências do PedidoService) ---
    @Mock
    private PedidoRepository pedidoRepository;
    @Mock
    private ClienteRepository clienteRepository;
    @Mock
    private EnderecoRepository enderecoRepository;
    @Mock
    private ProdutoRepository produtoRepository;

    // --- Alvo (Classe Real) ---
    @InjectMocks
    private PedidoService pedidoService;

    // --- Dados de Teste ---
    private Cliente cliente;
    private Endereco endereco;
    private Produto produto1;
    private PedidoRequestDTO pedidoRequestDTO;

    @BeforeEach
    void setUp() {
        // 1. Cliente que está fazendo o pedido
        cliente = new Cliente();
        cliente.setId(1);
        cliente.setNome("Cliente Teste");

        // 2. Endereço do cliente
        endereco = new Endereco();
        endereco.setId(10);
        endereco.setRua("Rua Teste");
        endereco.setNumero("123");
        endereco.setBairro("Bairro Teste");
        endereco.setCidade("Cidade Teste");
        endereco.setCliente(cliente); // IMPORTANTE: Endereço pertence ao cliente

        // 3. Produto que será comprado
        produto1 = new Produto();
        produto1.setId(100);
        produto1.setNome("Cupcake de Chocolate");
        produto1.setPreco(new BigDecimal("10.00"));
        produto1.setEstoque(50); // Tem estoque
        produto1.setAtivo(true);

        // 4. DTO da requisição (O que o frontend envia)
        ItemPedidoDTO itemDTO = new ItemPedidoDTO();
        itemDTO.setProdutoId(100);
        itemDTO.setQuantidade(2); // Cliente quer comprar 2

        pedidoRequestDTO = new PedidoRequestDTO();
        pedidoRequestDTO.setEnderecoId(10);
        pedidoRequestDTO.setItens(List.of(itemDTO));
    }

    /**
     * Teste do método: criarPedido(dto, clienteId)
     * Caminho feliz: estoque OK, endereço OK.
     * Verifica se o estoque é abatido e se o valor total é calculado.
     */
    @Test
    void deveCriarPedidoComSucesso() {
        // 1. Arrange
        // Simula a busca do cliente
        when(clienteRepository.findById(1)).thenReturn(Optional.of(cliente));
        // Simula a busca do endereço
        when(enderecoRepository.findById(10)).thenReturn(Optional.of(endereco));
        // Simula a busca do produto
        when(produtoRepository.findById(100)).thenReturn(Optional.of(produto1));
        // Simula o 'save' do pedido
        when(pedidoRepository.save(any(Pedido.class))).thenAnswer(invocation -> invocation.getArgument(0));
        // Simula o 'save' do produto (para abatimento de estoque)
        when(produtoRepository.save(any(Produto.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // 2. Act
        Pedido pedidoSalvo = pedidoService.criarPedido(pedidoRequestDTO, 1);

        // 3. Assert
        assertNotNull(pedidoSalvo);
        // Verifica o cálculo do valor total (2 * R$ 10,00)
        assertEquals(new BigDecimal("20.00"), pedidoSalvo.getValorTotal());
        assertEquals("Pedido Confirmado", pedidoSalvo.getStatusPedido());
        assertEquals(1, pedidoSalvo.getItens().size());

        // Verifica se o estoque foi abatido
        assertEquals(48, produto1.getEstoque()); // 50 - 2 = 48

        // Verifica se os repositórios foram chamados
        verify(clienteRepository, times(1)).findById(1);
        verify(enderecoRepository, times(1)).findById(10);
        verify(produtoRepository, times(1)).findById(100);
        verify(produtoRepository, times(1)).save(produto1); // Verifica se o produto (com estoque abatido) foi salvo
        verify(pedidoRepository, times(1)).save(any(Pedido.class)); // Verifica se o pedido foi salvo
    }

    /**
     * Teste do método: criarPedido(dto, clienteId)
     * Falha: Estoque insuficiente.
     */
    @Test
    void deveLancarExcecaoPorEstoqueInsuficiente() {
        // 1. Arrange
        produto1.setEstoque(1); // Só tem 1 no estoque
        // O DTO pede 2
        
        when(clienteRepository.findById(1)).thenReturn(Optional.of(cliente));
        when(enderecoRepository.findById(10)).thenReturn(Optional.of(endereco));
        when(produtoRepository.findById(100)).thenReturn(Optional.of(produto1));
        
        // 2. Act & 3. Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            pedidoService.criarPedido(pedidoRequestDTO, 1);
        });

        assertEquals("Estoque insuficiente para o produto: " + produto1.getNome(), exception.getMessage());

        // Garante que NENHUM pedido ou produto foi salvo
        verify(pedidoRepository, never()).save(any(Pedido.class));
        verify(produtoRepository, never()).save(any(Produto.class));
    }

    /**
     * Teste do método: criarPedido(dto, clienteId)
     * Falha: Endereço não pertence ao cliente.
     */
    @Test
    void deveLancarExcecaoPorEnderecoInvalido() {
        // 1. Arrange
        Cliente outroCliente = new Cliente();
        outroCliente.setId(2);
        endereco.setCliente(outroCliente); // Endereço pertence ao cliente 2

        when(clienteRepository.findById(1)).thenReturn(Optional.of(cliente));
        when(enderecoRepository.findById(10)).thenReturn(Optional.of(endereco));
        // O produto nem chega a ser buscado

        // 2. Act & 3. Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            pedidoService.criarPedido(pedidoRequestDTO, 1); // Cliente 1 tentando usar endereço do cliente 2
        });

        assertEquals("Endereço inválido para este cliente.", exception.getMessage());

        verify(pedidoRepository, never()).save(any(Pedido.class));
    }

    /**
     * Teste do método: alterarStatus(id, novoStatus)
     * Verifica se o status é capturado e salvo corretamente.
     */
    @Test
    void deveAlterarStatusDoPedido() {
        // 1. Arrange
        Pedido pedidoExistente = new Pedido();
        pedidoExistente.setId(5);
        pedidoExistente.setStatusPedido("Pedido Confirmado");

        // ArgumentCaptor nos permite "capturar" o objeto que é passado para o 'save'
        ArgumentCaptor<Pedido> pedidoCaptor = ArgumentCaptor.forClass(Pedido.class);

        when(pedidoRepository.findById(5)).thenReturn(Optional.of(pedidoExistente));
        when(pedidoRepository.save(pedidoCaptor.capture())).thenReturn(pedidoExistente);

        // 2. Act
        pedidoService.alterarStatus(5, "Em Preparo");

        // 3. Assert
        // Pega o objeto que foi passado para o método 'save'
        Pedido pedidoSalvo = pedidoCaptor.getValue();

        assertEquals("Em Preparo", pedidoSalvo.getStatusPedido());
        verify(pedidoRepository, times(1)).save(any(Pedido.class));
    }
}