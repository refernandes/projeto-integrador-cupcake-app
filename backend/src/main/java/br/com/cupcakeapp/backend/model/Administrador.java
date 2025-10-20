// Local: /backend/src/main/java/br/com/cupcakeapp/backend/model/Administrador.java

package br.com.cupcakeapp.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "Administradores")
@Getter
@Setter
public class Administrador implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    // --- MÉTODOS DO CONTRATO UserDetails ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // AQUI ESTÁ A CHAVE: Este usuário tem o cargo (role) de ADMIN.
        return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    // Para nosso projeto, as contas de admin estão sempre ativas e válidas.
    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}