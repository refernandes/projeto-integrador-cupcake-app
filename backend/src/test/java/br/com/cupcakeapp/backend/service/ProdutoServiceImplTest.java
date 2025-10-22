package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.ProdutoRequestDTO;
import br.com.cupcakeapp.backend.model.Produto;
import br.com.cupcakeapp.backend.repository.ProdutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Testes unitários para a classe ProdutoService.
 * Usamos @ExtendWith(MockitoExtension.class) para inicializar o Mockito.
 */
@ExtendWith(MockitoExtension.class)
class ProdutoServiceTest {

    // 1. O Mock: Criamos uma implementação "falsa" do repositório.
    @Mock
    private ProdutoRepository produtoRepository;

    // 2. O Alvo: Criamos uma instância real do ProdutoService
    // e o Mockito injetará o 'produtoRepository' falso nele.
    @InjectMocks
    private ProdutoService produtoService; // Classe real que estamos testando

    // --- Variáveis de setup ---
    private ProdutoRequestDTO requestDTO;
    private Produto produtoSalvo;

    /**
     * O método @BeforeEach é executado antes de CADA teste.
     * Usamos para criar objetos que serão reutilizados em vários testes.
     */
    @BeforeEach
    void setUp() {
        // Objeto de entrada (DTO) para os testes de 'criar' e 'atualizar'
        requestDTO = new ProdutoRequestDTO();
        requestDTO.setNome("Cupcake de Teste");
        requestDTO.setDescricao("Descrição de teste");
        requestDTO.setPreco(new BigDecimal("10.00"));
        requestDTO.setSabor("Teste");
        requestDTO.setImagemUrl("http://teste.com/img.png");
        requestDTO.setEstoque(20);

        // Objeto de saída (Entidade) que o repositório "falso" retornará
        produtoSalvo = new Produto();
        produtoSalvo.setId(1); // O banco de dados real geraria isso
        produtoSalvo.setNome("Cupcake de Teste");
        produtoSalvo.setDescricao("Descrição de teste");
        produtoSalvo.setPreco(new BigDecimal("10.00"));
        produtoSalvo.setSabor("Teste");
        produtoSalvo.setImagemUrl("http://teste.com/img.png");
        produtoSalvo.setEstoque(20);
        produtoSalvo.setAtivo(true); // O service define 'ativo' como true
    }

    // --- Testes ---

    /**
     * Teste do método: criar(ProdutoRequestDTO dto)
     * Verifica se o service mapeia corretamente o DTO para a Entidade,
     * define 'ativo' como true e chama o repositório.
     */
    @Test
    void deveCriarProdutoComSucesso() {
        // 1. Arrange (Organizar)
        // Quando o 'produtoRepository.save' for chamado com QUALQUER objeto Produto,
        // então retorne o nosso 'produtoSalvo' pré-fabricado.
        when(produtoRepository.save(any(Produto.class))).thenReturn(produtoSalvo);

        // 2. Act (Agir)
        // Executamos o método que queremos testar
        Produto resultado = produtoService.criar(requestDTO);

        // 3. Assert (Verificar)
        // Verificamos se o resultado não é nulo e se tem os dados esperados
        assertNotNull(resultado);
        assertEquals(1, resultado.getId()); // O ID deve ser o do 'produtoSalvo'
        assertEquals("Cupcake de Teste", resultado.getNome());
        assertTrue(resultado.getAtivo()); // Verificamos a lógica de negócio (novo produto é ativo)

        // Verificamos se o método 'save' do repositório foi chamado exatamente 1 vez
        verify(produtoRepository, times(1)).save(any(Produto.class));
    }

    /**
     * Teste do método: buscarPorId(Integer id)
     * Verifica se o service lança a exceção correta quando um ID não existe.
     */
    @Test
    void deveLancarExcecaoAoBuscarProdutoInexistente() {
        // 1. Arrange
        Integer idInexistente = 99;
        // Quando 'findById(99)' for chamado, retorne um Optional vazio (nada encontrado).
        when(produtoRepository.findById(idInexistente)).thenReturn(Optional.empty());

        // 2. Act & 3. Assert
        // Verificamos se a execução do método lança a exceção 'RuntimeException'
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            produtoService.buscarPorId(idInexistente);
        });

        // Verificamos se a mensagem da exceção é a esperada
        assertEquals("Produto não encontrado com o ID: " + idInexistente, exception.getMessage());
        
        // Verificamos que o 'findById' foi chamado
        verify(produtoRepository, times(1)).findById(idInexistente);
    }

    /**
     * Teste do método: listarProdutosAtivos(String nome)
     * Verifica se o service chama o método correto do repositório quando o nome é NULO.
     */
    @Test
    void deveListarApenasAtivosQuandoNenhumNomeFornecido() {
        // 1. Arrange
        // Simula o retorno do repositório
        when(produtoRepository.findByAtivoTrue()).thenReturn(List.of(produtoSalvo, new Produto()));

        // 2. Act
        List<Produto> resultado = produtoService.listarProdutosAtivos(null); // Passamos null para 'nome'

        // 3. Assert
        assertEquals(2, resultado.size()); // Verifica se a lista retornada tem 2 itens

        // Verifica se o método 'findByAtivoTrue' foi chamado
        verify(produtoRepository, times(1)).findByAtivoTrue();
        // Verifica se o OUTRO método (busca por nome) NUNCA foi chamado
        verify(produtoRepository, never()).findByNomeContainingIgnoreCaseAndAtivoTrue(anyString());
    }

    /**
     * Teste do método: listarProdutosAtivos(String nome)
     * Verifica se o service chama o método correto do repositório quando um nome é FORNECIDO.
     */
    @Test
    void deveListarAtivosPorNomeQuandoNomeFornecido() {
        // 1. Arrange
        String termoBusca = "Teste";
        when(produtoRepository.findByNomeContainingIgnoreCaseAndAtivoTrue(termoBusca))
                .thenReturn(List.of(produtoSalvo));

        // 2. Act
        List<Produto> resultado = produtoService.listarProdutosAtivos(termoBusca);

        // 3. Assert
        assertEquals(1, resultado.size());
        assertEquals("Cupcake de Teste", resultado.get(0).getNome());

        // Verifica se o método de busca por nome foi chamado
        verify(produtoRepository, times(1)).findByNomeContainingIgnoreCaseAndAtivoTrue(termoBusca);
        // Verifica se o método sem nome NUNCA foi chamado
        verify(produtoRepository, never()).findByAtivoTrue();
    }

    /**
     * Teste do método: atualizar(Integer id, ProdutoRequestDTO dto)
     * Verifica se o service primeiro busca o produto, atualiza seus dados
     * e o salva novamente.
     */
    @Test
    void deveAtualizarProdutoComSucesso() {
        // 1. Arrange
        Integer idExistente = 1;

        // DTO com dados atualizados
        ProdutoRequestDTO dtoAtualizado = new ProdutoRequestDTO();
        dtoAtualizado.setNome("Nome Atualizado");
        dtoAtualizado.setPreco(new BigDecimal("12.00"));
        dtoAtualizado.setEstoque(5);
        dtoAtualizado.setDescricao("Desc Atualizada"); // Campos que o 'atualizar' usa
        dtoAtualizado.setSabor("Sabor Atualizado");
        dtoAtualizado.setImagemUrl("url_atualizada");


        // Criamos um produto "existente" que será retornado pelo findById
        Produto produtoExistente = new Produto();
        produtoExistente.setId(idExistente);
        produtoExistente.setNome("Nome Antigo");
        produtoExistente.setPreco(new BigDecimal("9.00"));
        produtoExistente.setEstoque(10);
        // ...
        
        // Simula o 1º passo (buscarPorId): encontrar o produto existente
        when(produtoRepository.findById(idExistente)).thenReturn(Optional.of(produtoExistente));

        // Simula o 2º passo (save): o repositório salvando o produto atualizado
        // Usamos 'any' pois o objeto é modificado internamente no service
        when(produtoRepository.save(any(Produto.class))).thenReturn(produtoExistente); 

        // 2. Act
        Produto resultado = produtoService.atualizar(idExistente, dtoAtualizado);

        // 3. Assert
        assertNotNull(resultado);
        // Verificamos se os dados do DTO foram mapeados para o objeto salvo
        assertEquals("Nome Atualizado", resultado.getNome());
        assertEquals(new BigDecimal("12.00"), resultado.getPreco());
        assertEquals(5, resultado.getEstoque());

        // Verificamos se os métodos do repositório foram chamados
        verify(produtoRepository, times(1)).findById(idExistente);
        verify(produtoRepository, times(1)).save(any(Produto.class));
    }

    /**
     * Teste do método: deletar(Integer id)
     * Verifica se a exceção é lançada quando 'existsById' retorna false.
     */
    @Test
    void deveLancarExcecaoAoDeletarProdutoInexistente() {
        // 1. Arrange
        Integer idInexistente = 99;
        // Simula a verificação de existência (primeiro passo do 'deletar')
        when(produtoRepository.existsById(idInexistente)).thenReturn(false);

        // 2. Act & 3. Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            produtoService.deletar(idInexistente);
        });

        assertEquals("Produto não encontrado com o ID: " + idInexistente, exception.getMessage());
        
        // Verifica que 'existsById' foi chamado
        verify(produtoRepository, times(1)).existsById(idInexistente);
        // Garante que 'deleteById' NUNCA foi chamado
        verify(produtoRepository, never()).deleteById(anyInt());
    }
}