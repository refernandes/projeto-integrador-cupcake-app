// Local: /backend/src/main/java/br/com/cupcakeapp/backend/service/ClienteService.java
package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.ClienteCadastroDTO;
import br.com.cupcakeapp.backend.model.Cliente;
import br.com.cupcakeapp.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    // Injeção de dependência via construtor (melhor prática)
    @Autowired
    public ClienteService(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Cadastra um novo cliente no sistema.
     * Valida se o e-mail já existe e criptografa a senha.
     */
    public Cliente cadastrar(ClienteCadastroDTO clienteDTO) {
        // Regra de negócio: não permitir e-mails duplicados
        if (clienteRepository.findByEmail(clienteDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Erro: O e-mail informado já está em uso.");
        }

        Cliente novoCliente = new Cliente();
        novoCliente.setNome(clienteDTO.getNome());
        novoCliente.setEmail(clienteDTO.getEmail());
        novoCliente.setTelefone(clienteDTO.getTelefone());
        
        // Criptografa a senha antes de salvar
        novoCliente.setSenha(passwordEncoder.encode(clienteDTO.getSenha()));

        return clienteRepository.save(novoCliente);
    }

    // Adicione aqui os métodos para buscar e atualizar perfil...
}