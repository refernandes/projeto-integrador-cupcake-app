// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/AdminProdutoController.java

package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.dto.ProdutoRequestDTO;
import br.com.cupcakeapp.backend.dto.ProdutoResponseDTO;
import br.com.cupcakeapp.backend.model.Produto;
import br.com.cupcakeapp.backend.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/admin/produtos")
@CrossOrigin(origins = "*")
public class AdminProdutoController {

    private final ProdutoService produtoService;

    @Autowired
    public AdminProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    /**
     * Endpoint para listar TODOS os produtos (ativos e inativos) para o admin.
     */
    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listarTodosOsProdutos() {
        // Agora chamamos o método correto que retorna a lista completa para o admin
        List<ProdutoResponseDTO> todosOsProdutos = produtoService.listarTodosAdmin();
        return ResponseEntity.ok(todosOsProdutos); // <-- CORREÇÃO APLICADA
    }


    /**
     * Endpoint para criar um novo produto.
     * URL: POST /api/admin/produtos
     */
    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> criarProduto(@Valid @RequestBody ProdutoRequestDTO produtoDTO) {
        Produto novoProduto = produtoService.criar(produtoDTO);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(novoProduto.getId()).toUri();
        return ResponseEntity.created(location).body(new ProdutoResponseDTO(novoProduto));
    }

    /**
     * Endpoint para atualizar um produto existente.
     * URL: PUT /api/admin/produtos/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizarProduto(@PathVariable Integer id, @Valid @RequestBody ProdutoRequestDTO produtoDTO) {
        Produto produtoAtualizado = produtoService.atualizar(id, produtoDTO);
        return ResponseEntity.ok(new ProdutoResponseDTO(produtoAtualizado));
    }
    
    /**
     * Endpoint para ativar ou desativar um produto (HU #17).
     * URL: PATCH /api/admin/produtos/{id}/status?ativo=false
     */
    
    /**
     * Endpoint para deletar um produto.
     * URL: DELETE /api/admin/produtos/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Integer id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}