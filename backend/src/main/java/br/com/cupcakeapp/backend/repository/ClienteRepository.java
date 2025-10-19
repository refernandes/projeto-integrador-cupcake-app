// Local: /backend/src/main/java/br/com/cupcakeapp/backend/repository/ClienteRepository.java

package br.com.cupcakeapp.backend.repository;

import br.com.cupcakeapp.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; // Certifique-se de que este import está presente

@Repository // Opcional, mas boa prática para indicar que é um componente de acesso a dados
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    // A mágica acontece aqui!
    // Ao estender JpaRepository, esta interface herda automaticamente métodos como:
    // save(), findById(), findAll(), deleteById(), etc.
Optional<Cliente> findByEmail(String email);
    // Você também pode declarar métodos de busca customizados.
    // Por exemplo, para buscar um cliente pelo e-mail:
    // Cliente findByEmail(String email);
}