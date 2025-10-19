// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/ProdutoController.java

package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.ProdutoResponseDTO;
import br.com.cupcakeapp.backend.model.Produto;
import br.com.cupcakeapp.backend.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*") // Permite que o seu front-end React acesse esta API
public class ProdutoController {

    private final ProdutoService produtoService;

    // Injetamos o Service no Controller. O Spring cuida de criar a instância para nós.
    @Autowired
    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    /**
     * Endpoint para listar todos os produtos ativos ou buscar por nome.
     * Exemplo de URL: GET /api/produtos
     * Exemplo de URL com busca: GET /api/produtos?nome=Chocolate
     */
    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listarProdutosAtivos(
            @RequestParam(required = false) String nome) {
        
        // 1. Chama o service para buscar os produtos do banco de dados.
        List<Produto> produtos = produtoService.listarProdutosAtivos(nome);

        // 2. Converte a lista de entidades (Produto) para uma lista de DTOs (ProdutoResponseDTO).
        List<ProdutoResponseDTO> responseDTOs = produtos.stream()
                .map(ProdutoResponseDTO::new) // Para cada produto na lista, cria um novo DTO
                .collect(Collectors.toList());

        // 3. Retorna a lista de DTOs com o status HTTP 200 OK.
        return ResponseEntity.ok(responseDTOs);
    }

    /**
     * Endpoint para buscar um único produto pelo seu ID.
     * Exemplo de URL: GET /api/produtos/1
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarProdutoPorId(@PathVariable Integer id) {
        // 1. Chama o service para buscar o produto. O service já trata o erro se não encontrar.
        Produto produto = produtoService.buscarPorId(id);

        // 2. Converte a entidade encontrada para um DTO de resposta.
        ProdutoResponseDTO responseDTO = new ProdutoResponseDTO(produto);

        // 3. Retorna o DTO com o status HTTP 200 OK.
        return ResponseEntity.ok(responseDTO);
    }
}