// Local: /backend/src/main/java/br/com/cupcakeapp/backend/repository/EnderecoRepository.java

package br.com.cupcakeapp.backend.repository;

import br.com.cupcakeapp.backend.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Certifique-se de que este import está presente

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {

    // A LINHA QUE FALTAVA:
    // Spring vai entender "findByClienteId" e criar a query: SELECT * FROM Enderecos WHERE cliente_id = ?
    List<Endereco> findByClienteId(Integer clienteId);
}