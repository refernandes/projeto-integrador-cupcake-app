// Local: /backend/src/main/java/br/com/cupcakeapp/backend/controller/ProdutoController.java
package br.com.cupcakeapp.backend.controller;

import br.com.cupcakeapp.backend.model.Produto; // Usaremos a entidade por enquanto, mas um DTO é ideal
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/produtos") // Rotas públicas para o catálogo
@CrossOrigin(origins = "*")
public class ProdutoController {

    // @Autowired
    // private ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutosAtivos(
            @RequestParam(required = false) String nome) {
        // @RequestParam permite a busca via URL: /api/produtos?nome=Chocolate
        // TODO: Chamar o produtoService.listarProdutosAtivos(nome);
        return ResponseEntity.ok(Collections.emptyList()); // Retorna lista vazia por enquanto
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProdutoPorId(@PathVariable Integer id) {
        // @PathVariable pega o {id} da URL: /api/produtos/1
        // TODO: Chamar o produtoService.buscarPorId(id);
        // Tratamento de erro para produto não encontrado será adicionado no service.
        return ResponseEntity.ok(null); // Retorna null por enquanto
    }
}