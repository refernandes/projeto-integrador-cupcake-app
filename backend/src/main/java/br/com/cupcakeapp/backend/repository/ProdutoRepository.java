// Local: /backend/src/main/java/br/com/cupcakeapp/backend/repository/ProdutoRepository.java

package br.com.cupcakeapp.backend.repository;

import br.com.cupcakeapp.backend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    // Método para a funcionalidade de busca (HU #19).
    // O Spring entende "findByNameContainingIgnoreCase" e cria uma query que busca
    // produtos cujo nome contém o texto passado, ignorando maiúsculas/minúsculas.
    List<Produto> findByNomeContainingIgnoreCaseAndAtivoTrue(String nome);

    // Método para buscar todos os produtos ativos para o catálogo do cliente.
    List<Produto> findByAtivoTrue();
}