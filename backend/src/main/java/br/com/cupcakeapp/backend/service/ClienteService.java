// Local: /backend/src/main/java/br/com/cupcakeapp/backend/service/ClienteService.java
package br.com.cupcakeapp.backend.service;

import br.com.cupcakeapp.backend.dto.ClienteCadastroDTO;
import br.com.cupcakeapp.backend.dto.EnderecoDTO;
import br.com.cupcakeapp.backend.dto.PerfilUpdateRequestDTO;
import br.com.cupcakeapp.backend.model.Cliente;
import br.com.cupcakeapp.backend.model.Endereco;
import br.com.cupcakeapp.backend.repository.ClienteRepository;
import br.com.cupcakeapp.backend.repository.EnderecoRepository; // 1. IMPORTE O REPOSITÓRIO QUE FALTAVA
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List; // Adicione este import também
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final EnderecoRepository enderecoRepository; // 2. DECLARE A DEPENDÊNCIA AQUI

    // Injeção de dependência via construtor (melhor prática)
    @Autowired
    public ClienteService(
        ClienteRepository clienteRepository, 
        PasswordEncoder passwordEncoder, 
        EnderecoRepository enderecoRepository // 3. ATUALIZE O CONSTRUTOR PARA RECEBER A DEPENDÊNCIA
    ) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
        this.enderecoRepository = enderecoRepository; // E atribua ela aqui
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

    /**
    * Busca o perfil de um cliente pelo seu ID.
    */
    public Cliente buscarPerfil(Integer clienteId) {
        return clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com o ID: " + clienteId));
    }

    /**
    * Atualiza os dados do perfil de um cliente.
    */
    public Cliente atualizarPerfil(Integer clienteId, PerfilUpdateRequestDTO perfilDTO) {
        Cliente clienteExistente = buscarPerfil(clienteId); // Reusa o método de busca

        clienteExistente.setNome(perfilDTO.getNome());
        clienteExistente.setTelefone(perfilDTO.getTelefone());

        return clienteRepository.save(clienteExistente);
    }

    /**
     * Busca todos os endereços de um cliente específico.
     */
    public List<Endereco> buscarEnderecosPorCliente(Integer clienteId) {
        return enderecoRepository.findByClienteId(clienteId);
    }

    /**
     * Adiciona um novo endereço para um cliente.
     */
    public Endereco adicionarEndereco(Integer clienteId, EnderecoDTO enderecoDTO) {
        Cliente cliente = buscarPerfil(clienteId); // Reusa o método que já temos

        Endereco novoEndereco = new Endereco();
        novoEndereco.setCliente(cliente);
        novoEndereco.setRua(enderecoDTO.getRua());
        novoEndereco.setNumero(enderecoDTO.getNumero());
        novoEndereco.setComplemento(enderecoDTO.getComplemento());
        novoEndereco.setBairro(enderecoDTO.getBairro());
        novoEndereco.setCidade(enderecoDTO.getCidade());
        novoEndereco.setCep(enderecoDTO.getCep());

        return enderecoRepository.save(novoEndereco);
    }
    /** // MÉTODO ADICIONADO
     * Deleta um endereço específico de um cliente.             // MÉTODO ADICIONADO
     * Garante que o endereço pertence ao cliente antes de deletar. // MÉTODO ADICIONADO
     */                                                        // MÉTODO ADICIONADO
    public void deletarEndereco(Integer clienteId, Integer enderecoId) { // MÉTODO ADICIONADO
        // 1. Busca o endereço pelo ID
        Endereco endereco = enderecoRepository.findById(enderecoId) // MÉTODO ADICIONADO
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado com o ID: " + enderecoId)); // MÉTODO ADICIONADO

        // 2. VERIFICA SE O ENDEREÇO PERTENCE AO CLIENTE LOGADO (Medida de Segurança)
        if (!endereco.getCliente().getId().equals(clienteId)) { // MÉTODO ADICIONADO
            // Lança uma exceção de segurança se o ID do cliente do endereço não bater com o ID do cliente logado
            throw new SecurityException("Acesso negado: Este endereço não pertence ao usuário."); // MÉTODO ADICIONADO
        } // MÉTODO ADICIONADO

        // 3. Se tudo estiver ok, deleta o endereço
        enderecoRepository.delete(endereco); // MÉTODO ADICIONADO
    } // MÉTODO ADICIONADO

    @Transactional // Garante que a operação seja atômica
    public Endereco atualizarEndereco(Integer clienteId, Integer enderecoId, EnderecoDTO enderecoDTO) {
        // 1. Reusa o método 'buscarPerfil' para validar o cliente
        Cliente cliente = buscarPerfil(clienteId); 

        // 2. Busca o endereço que queremos atualizar
        // (O ClienteService já tem a dependência 'enderecoRepository')
        Endereco enderecoExistente = enderecoRepository.findById(enderecoId)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado com o ID: " + enderecoId));

        // 3. REGRA DE SEGURANÇA: Garante que o endereço pertence ao cliente logado
        if (!enderecoExistente.getCliente().getId().equals(cliente.getId())) {
            throw new SecurityException("Acesso negado: Este endereço não pertence ao usuário.");
        }

        // 4. Atualiza os campos do endereço com os dados do DTO
        enderecoExistente.setRua(enderecoDTO.getRua());
        enderecoExistente.setNumero(enderecoDTO.getNumero());
        enderecoExistente.setComplemento(enderecoDTO.getComplemento());
        enderecoExistente.setBairro(enderecoDTO.getBairro());
        enderecoExistente.setCidade(enderecoDTO.getCidade());
        enderecoExistente.setCep(enderecoDTO.getCep());

        // 5. Salva as alterações no banco de dados
        return enderecoRepository.save(enderecoExistente);
    }

 // Fim da classe ClienteService
}