// Local: /backend/src/main/java/br/com/cupcakeapp/backend/repository/PedidoRepository.java

package br.com.cupcakeapp.backend.repository;

import br.com.cupcakeapp.backend.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    // Método para a funcionalidade de Histórico de Pedidos (HU #20).
    // Busca todos os pedidos de um cliente, ordenados do mais recente para o mais antigo.
    List<Pedido> findByClienteIdOrderByDataPedidoDesc(Integer clienteId);
}