// Local: /backend/src/main/java/br/com/cupcakeapp/backend/model/Cliente.java

package br.com.cupcakeapp.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

// 1. A MUDANÇA PRINCIPAL: Adicionamos "implements UserDetails"
@Entity
@Table(name = "Clientes")
@Getter
@Setter
public class Cliente implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column
    private String telefone;
    
    // 2. MÉTODOS OBRIGATÓRIOS DO CONTRATO UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Define as permissões/cargos do usuário. Para um cliente normal,
        // podemos simplesmente dar o cargo "ROLE_USER".
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        // Spring Security usará este método para obter a senha criptografada.
        return this.senha;
    }

    @Override
    public String getUsername() {
        // Spring Security usará este método para obter o "nome de usuário".
        // No nosso caso, o login é feito com o e-mail.
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Para nosso projeto, a conta nunca expira.
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Para nosso projeto, a conta nunca é bloqueada.
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Para nosso projeto, as credenciais nunca expiram.
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Para nosso projeto, a conta está sempre ativa.
        // Se tivéssemos uma lógica de verificação de e-mail, este campo poderia ser false
        // até o usuário confirmar o e-mail.
        return true;
    }
}