// Local: /backend/src/main/java/br/com/cupcakeapp/backend/model/Cliente.java

package br.com.cupcakeapp.backend.model;

import jakarta.persistence.*; // Importa as anotações do JPA
import lombok.Getter;
import lombok.Setter;

@Entity // Marca esta classe como uma entidade do banco de dados
@Table(name = "Clientes") // Especifica o nome da tabela
@Getter // Anotações do Lombok para gerar getters e setters automaticamente
@Setter
public class Cliente {

    @Id // Marca este campo como a chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configura o auto-incremento
    private Integer id;

    @Column(nullable = false) // Mapeia para uma coluna, NOT NULL
    private String nome;

    @Column(nullable = false, unique = true) // Mapeia para uma coluna, NOT NULL e UNIQUE
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column
    private String telefone;
    
    // Construtores, getters e setters são geralmente omitidos por brevidade
    // ou gerados com a biblioteca Lombok para um código mais limpo.
}