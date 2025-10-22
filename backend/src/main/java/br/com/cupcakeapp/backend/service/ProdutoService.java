// Local: /backend/src/main/java/br/com/cupcakeapp/backend/service/ProdutoService.java
package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.ProdutoRequestDTO;
import br.com.cupcakeapp.backend.model.Produto;
import br.com.cupcakeapp.backend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.cupcakeapp.backend.dto.ProdutoResponseDTO; // Adicione este import
import java.util.stream.Collectors; // Adicione este import

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    

    /**
     * Lista todos os produtos ativos. Se um termo de busca for fornecido,
     * filtra pelo nome do produto.
     */
    public List<Produto> listarProdutosAtivos(String nome) {
        if (nome != null && !nome.isEmpty()) {
            return produtoRepository.findByNomeContainingIgnoreCaseAndAtivoTrue(nome);
        }
        return produtoRepository.findByAtivoTrue();
    }

    /**
     * Busca um único produto pelo seu ID. Lança uma exceção se não for encontrado.
     */
    public Produto buscarPorId(Integer id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com o ID: " + id));
    }
    
    // --- MÉTODOS DE ADMINISTRAÇÃO ---

    public Produto criar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto atualizar(Integer id, Produto produtoAtualizado) {
        Produto produtoExistente = buscarPorId(id); // Reusa o método de busca
        
        // Atualiza os campos
        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setDescricao(produtoAtualizado.getDescricao());
        produtoExistente.setPreco(produtoAtualizado.getPreco());
        produtoExistente.setEstoque(produtoAtualizado.getEstoque());
        // ... outros campos ...
        
        return produtoRepository.save(produtoExistente);
    }
    public List<ProdutoResponseDTO> listarTodosAdmin() {
        return produtoRepository.findAll() // 1. Busca todos os produtos do banco
                .stream()                  // 2. Cria um fluxo para processamento
                .map(ProdutoResponseDTO::new) // 3. Para cada produto, cria um DTO
                .collect(Collectors.toList()); // 4. Coleta os resultados em uma lista
    }
    

    /**
 * Cria um novo produto a partir de um DTO.
 */
public Produto criar(ProdutoRequestDTO produtoDTO) {
    Produto novoProduto = new Produto();
    novoProduto.setNome(produtoDTO.getNome());
    novoProduto.setDescricao(produtoDTO.getDescricao());
    novoProduto.setPreco(produtoDTO.getPreco());
    novoProduto.setSabor(produtoDTO.getSabor());
    novoProduto.setImagemUrl(produtoDTO.getImagemUrl());
    novoProduto.setEstoque(produtoDTO.getEstoque());
    novoProduto.setAtivo(true); // Novos produtos são ativos por padrão

    return produtoRepository.save(novoProduto);
}

/**
 * Atualiza um produto existente a partir de um DTO.
 */
public Produto atualizar(Integer id, ProdutoRequestDTO produtoDTO) {
    Produto produtoExistente = buscarPorId(id); // Reusa o método que já valida se o produto existe

    // Atualiza os campos do produto existente com os dados do DTO
    produtoExistente.setNome(produtoDTO.getNome());
    produtoExistente.setDescricao(produtoDTO.getDescricao());
    produtoExistente.setPreco(produtoDTO.getPreco());
    produtoExistente.setSabor(produtoDTO.getSabor());
    produtoExistente.setImagemUrl(produtoDTO.getImagemUrl());
    produtoExistente.setEstoque(produtoDTO.getEstoque());

    return produtoRepository.save(produtoExistente);
}


/**
 * Deleta um produto do banco de dados.
 */
public void deletar(Integer id) {
    // Verifica se o produto existe antes de tentar deletar
    if (!produtoRepository.existsById(id)) {
        throw new RuntimeException("Produto não encontrado com o ID: " + id);
    }
    produtoRepository.deleteById(id);
}

    
}