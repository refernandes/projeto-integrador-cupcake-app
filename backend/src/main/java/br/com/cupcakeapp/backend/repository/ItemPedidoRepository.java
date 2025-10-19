// Local: /backend/src/main/java/br/com/cupcakeapp/backend/repository/ItemPedidoRepository.java

package br.com.cupcakeapp.backend.repository;

import br.com.cupcakeapp.backend.model.ItemPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Integer> {
    // Geralmente, não precisamos de métodos customizados aqui, pois os itens de
    // um pedido são acessados através da própria entidade Pedido.
}