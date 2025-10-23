package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.ClienteCadastroDTO;
import br.com.cupcakeapp.backend.model.Cliente;
import br.com.cupcakeapp.backend.model.Endereco;
import br.com.cupcakeapp.backend.repository.ClienteRepository;
import br.com.cupcakeapp.backend.repository.EnderecoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClienteServiceTest {

    // --- Mocks (Dependências Falsas) ---

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private EnderecoRepository enderecoRepository;

    @Mock
    private PasswordEncoder passwordEncoder; // Precisamos mockar o criptografador

    // --- Alvo (Classe Real) ---

    @InjectMocks
    private ClienteService clienteService;

    // --- Dados de Teste ---
    private ClienteCadastroDTO cadastroDTO;
    private Cliente clienteSalvo;

    @BeforeEach
    void setUp() {
        // DTO de entrada para o cadastro
        cadastroDTO = new ClienteCadastroDTO();
        cadastroDTO.setNome("Usuario Teste");
        cadastroDTO.setEmail("teste@example.com");
        cadastroDTO.setSenha("senha123");
        cadastroDTO.setTelefone("999999999");

        // Entidade que o repositório "retornará"
        clienteSalvo = new Cliente();
        clienteSalvo.setId(1);
        clienteSalvo.setNome("Usuario Teste");
        clienteSalvo.setEmail("teste@example.com");
        clienteSalvo.setSenha("senhaCriptografadaABC"); // Senha já criptografada
        clienteSalvo.setTelefone("999999999");
    }

    /**
     * Teste do método: cadastrar(ClienteCadastroDTO dto)
     * Verifica a lógica de negócio:
     * 1. Verifica se o e-mail já existe.
     * 2. Verifica se a senha é criptografada.
     * 3. Verifica se o cliente é salvo.
     */
    @Test
    void deveCadastrarClienteComSucesso() {
        // 1. Arrange
        // Simula que o e-mail NÃO existe
        when(clienteRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        // Simula a ação de criptografar a senha
        when(passwordEncoder.encode("senha123")).thenReturn("senhaCriptografadaABC");
        // Simula a ação de salvar o cliente
        when(clienteRepository.save(any(Cliente.class))).thenReturn(clienteSalvo);

        // 2. Act
        Cliente resultado = clienteService.cadastrar(cadastroDTO);

        // 3. Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.getId());
        assertEquals("teste@example.com", resultado.getEmail());
        // Verifica se a senha salva é a que foi criptografada
        assertEquals("senhaCriptografadaABC", resultado.getSenha());

        // Verifica se os mocks foram chamados
        verify(clienteRepository, times(1)).findByEmail("teste@example.com");
        verify(passwordEncoder, times(1)).encode("senha123");
        verify(clienteRepository, times(1)).save(any(Cliente.class));
    }

    /**
     * Teste do método: cadastrar(ClienteCadastroDTO dto)
     * Verifica a validação de e-mail duplicado.
     */
    @Test
    void deveLancarExcecaoAoCadastrarEmailDuplicado() {
        // 1. Arrange
        // Simula que o e-mail JÁ EXISTE no banco
        when(clienteRepository.findByEmail("teste@example.com")).thenReturn(Optional.of(clienteSalvo));

        // 2. Act & 3. Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            clienteService.cadastrar(cadastroDTO);
        });

        assertEquals("Erro: O e-mail informado já está em uso.", exception.getMessage());

        // Garante que, se o e-mail existe, o 'save' NUNCA é chamado
        verify(clienteRepository, never()).save(any(Cliente.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    /**
     * Teste do método: deletarEndereco(Integer clienteId, Integer enderecoId)
     * Verifica a regra de segurança: um cliente NÃO PODE deletar o endereço de outro.
     */
    @Test
    void deveLancarExcecaoAoDeletarEnderecoDeOutroCliente() {
        // 1. Arrange
        Integer idClienteLogado = 1;
        Integer idEndereco = 10;
        Integer idClienteDonoDoEndereco = 2; // <-- ID Diferente

        // Cria o cliente "dono" do endereço
        Cliente clienteDono = new Cliente();
        clienteDono.setId(idClienteDonoDoEndereco);

        // Cria o endereço que será "encontrado"
        Endereco endereco = new Endereco();
        endereco.setId(idEndereco);
        endereco.setCliente(clienteDono); // Associa o endereço ao dono (ID 2)

        // Simula o findById do endereço
        when(enderecoRepository.findById(idEndereco)).thenReturn(Optional.of(endereco));

        // 2. Act & 3. Assert
        // Tentamos deletar como se fôssemos o cliente 1
        SecurityException exception = assertThrows(SecurityException.class, () -> {
            clienteService.deletarEndereco(idClienteLogado, idEndereco);
        });

        assertEquals("Acesso negado: Este endereço não pertence ao usuário.", exception.getMessage());

        // Garante que o 'delete' NUNCA foi chamado
        verify(enderecoRepository, never()).delete(any(Endereco.class));
    }

    /**
     * Teste do método: deletarEndereco(Integer clienteId, Integer enderecoId)
     * Verifica o caminho feliz: o cliente deleta o próprio endereço.
     */
    @Test
    void deveDeletarEnderecoComSucesso() {
        // 1. Arrange
        Integer idClienteLogado = 1;
        Integer idEndereco = 10;

        // Cliente logado é o dono do endereço
        clienteSalvo.setId(idClienteLogado); 
        
        Endereco endereco = new Endereco();
        endereco.setId(idEndereco);
        endereco.setCliente(clienteSalvo); // Endereço pertence ao cliente 1

        // Simula o findById
        when(enderecoRepository.findById(idEndereco)).thenReturn(Optional.of(endereco));
        
        // Configura o 'delete' para não fazer nada (void)
        doNothing().when(enderecoRepository).delete(any(Endereco.class));

        // 2. Act
        // Executamos o método, não esperamos exceção
        assertDoesNotThrow(() -> {
            clienteService.deletarEndereco(idClienteLogado, idEndereco);
        });

        // 3. Assert
        // Verifica se o 'delete' FOI chamado
        verify(enderecoRepository, times(1)).delete(endereco);
    }
}