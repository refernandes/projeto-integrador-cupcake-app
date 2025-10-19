// Local: /backend/src/main/java/br/com/cupcakeapp/backend/model/Endereco.java

package br.com.cupcakeapp.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Enderecos")
@Getter
@Setter
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne // Muitos endereços para UM cliente
    @JoinColumn(name = "cliente_id", nullable = false) // Define a coluna da chave estrangeira
    private Cliente cliente;

    @Column(nullable = false)
    private String rua;

    @Column(nullable = false, length = 20)
    private String numero;

    @Column(length = 100)
    private String complemento;

    @Column(nullable = false, length = 100)
    private String bairro;

    @Column(nullable = false, length = 100)
    private String cidade;

    @Column(nullable = false, length = 10)
    private String cep;
}