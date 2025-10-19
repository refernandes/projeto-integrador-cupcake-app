// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/AdminProdutoController.java
package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.model.Produto; // Usaremos um DTO para criação/edição
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/admin/produtos") // Rotas de admin, que serão protegidas
@CrossOrigin(origins = "*")
public class AdminProdutoController {

    // @Autowired
    // private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
        // TODO: Usar um ProdutoRequestDTO e chamar produtoService.criar(produtoDTO);
        // O ideal é retornar o status 201 Created com a URL do novo recurso.
        return ResponseEntity.created(URI.create("")).body(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Integer id, @RequestBody Produto produto) {
        // TODO: Usar um ProdutoRequestDTO e chamar produtoService.atualizar(id, produtoDTO);
        return ResponseEntity.ok(null);
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> alterarStatusProduto(@PathVariable Integer id, @RequestParam boolean ativo) {
        // Rota para ativar/desativar o produto (HU #17)
        // Ex: PATCH /api/admin/produtos/1/status?ativo=false
        // TODO: chamar produtoService.alterarStatus(id, ativo);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Integer id) {
        // TODO: Chamar produtoService.deletar(id);
        return ResponseEntity.noContent().build(); // Retorna status 204 No Content
    }
}