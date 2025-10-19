// Local: /backend/src/main/java/br/com/cupcakeapp/backend/repository/EnderecoRepository.java

package br.com.cupcakeapp.backend.repository;

import br.com.cupcakeapp.backend.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {

    // Método para buscar todos os endereços de um cliente específico.
    List<Endereco> findByClienteId(Integer clienteId);
}