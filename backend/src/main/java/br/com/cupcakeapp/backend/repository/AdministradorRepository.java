// Local: /backend/src/main/java/br/com/cupcakeapp/backend/repository/AdministradorRepository.java

package br.com.cupcakeapp.backend.repository;

import br.com.cupcakeapp.backend.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Integer> {

    // Spring Data JPA criará automaticamente a query para buscar um administrador pelo email.
    // Usamos Optional para tratar casos em que o email não é encontrado de forma segura.
    Optional<Administrador> findByEmail(String email);
}