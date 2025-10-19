# Dicionário de Dados - Cupcake App v2.0

Este documento detalha a estrutura do banco de dados relacional projetado para a aplicação Cupcake App, conforme a especificação da Versão 2.0.

---

## Tabela: `Administradores`

Armazena as credenciais e informações dos usuários com permissões administrativas.

| Coluna       | Tipo de Dado | PK/FK | Descrição                             | Observações                         |
| ------------ | ------------ | ----- | ------------------------------------- | ----------------------------------- |
| id           | INT          | PK    | Identificador único do administrador. | Preenchimento automático.           |
| nome         | VARCHAR(255) |       | Nome completo do administrador.       | Campo obrigatório.                  |
| email        | VARCHAR(255) |       | Endereço de e-mail para login.        | Deve ser único.                     |
| senha        | VARCHAR(255) |       | Senha criptografada (hash).           | **NUNCA** armazenar em texto plano. |
| data_criacao | TIMESTAMP    |       | Data de criação do registro.          | Preenchido automaticamente.         |

---

## Tabela: `Clientes`

Armazena as informações dos clientes cadastrados no aplicativo.

| Coluna        | Tipo de Dado | PK/FK | Descrição                       | Observações                         |
| ------------- | ------------ | ----- | ------------------------------- | ----------------------------------- |
| id            | INT          | PK    | Identificador único do cliente. | Preenchimento automático.           |
| nome          | VARCHAR(255) |       | Nome completo do cliente.       | Campo obrigatório.                  |
| email         | VARCHAR(255) |       | Endereço de e-mail do cliente.  | Deve ser único. Campo de login.     |
| senha         | VARCHAR(255) |       | Senha criptografada (hash).     | **NUNCA** armazenar em texto plano. |
| telefone      | VARCHAR(20)  |       | Telefone de contato do cliente. | Campo opcional.                     |
| data_cadastro | TIMESTAMP    |       | Data e hora do cadastro.        | Preenchido automaticamente.         |

---

## Tabela: `Enderecos`

Armazena os endereços de entrega associados a cada cliente. Um cliente pode ter múltiplos endereços.

| Coluna      | Tipo de Dado | PK/FK | Descrição                                   | Observações                                |
| ----------- | ------------ | ----- | ------------------------------------------- | ------------------------------------------ |
| id          | INT          | PK    | Identificador único do endereço.            | Preenchimento automático.                  |
| cliente_id  | INT          | FK    | Chave estrangeira para a tabela `Clientes`. | Indica a qual cliente o endereço pertence. |
| rua         | VARCHAR(255) |       | Nome da rua/avenida.                        | Campo obrigatório.                         |
| numero      | VARCHAR(20)  |       | Número do imóvel.                           | Campo obrigatório.                         |
| complemento | VARCHAR(100) |       | Complemento (apto, bloco, etc.).            | Campo opcional.                            |
| bairro      | VARCHAR(100) |       | Bairro.                                     | Campo obrigatório.                         |
| cidade      | VARCHAR(100) |       | Cidade.                                     | Campo obrigatório.                         |
| cep         | VARCHAR(10)  |       | Código de Endereçamento Postal.             | Campo obrigatório.                         |

---

## Tabela: `Produtos`

Armazena os cupcakes disponíveis para venda no catálogo.

| Coluna       | Tipo de Dado  | PK/FK | Descrição                              | Observações                         |
| ------------ | ------------- | ----- | -------------------------------------- | ----------------------------------- |
| id           | INT           | PK    | Identificador único do produto.        | Preenchimento automático.           |
| nome         | VARCHAR(100)  |       | Nome do cupcake (Ex: Chocolate Belga). | Campo obrigatório.                  |
| descricao    | TEXT          |       | Descrição detalhada do produto.        | Campo obrigatório.                  |
| preco        | DECIMAL(10,2) |       | Preço de venda unitário.               | Campo obrigatório.                  |
| sabor        | VARCHAR(50)   |       | Sabor principal para filtros.          | Campo opcional.                     |
| categoria    | VARCHAR(50)   |       | Categoria geral do produto.            | Campo opcional.                     |
| imagem_url   | VARCHAR(255)  |       | URL da imagem do produto.              | Campo opcional.                     |
| estoque      | INT           |       | Quantidade disponível em estoque.      | Campo obrigatório. Default: 0.      |
| ativo        | BOOLEAN       |       | Status do produto no catálogo.         | `TRUE` = Visível, `FALSE` = Oculto. |
| data_criacao | TIMESTAMP     |       | Data de criação do registro.           | Preenchido automaticamente.         |

---

## Tabela: `Pedidos`

Registra a cabeça de cada pedido realizado por um cliente.

| Coluna              | Tipo de Dado  | PK/FK | Descrição                                    | Observações                                |
| ------------------- | ------------- | ----- | -------------------------------------------- | ------------------------------------------ |
| id                  | INT           | PK    | Identificador único do pedido.               | Preenchimento automático.                  |
| cliente_id          | INT           | FK    | Chave estrangeira para a tabela `Clientes`.  | Indica qual cliente fez o pedido.          |
| endereco_entrega_id | INT           | FK    | Chave estrangeira para a tabela `Enderecos`. | Indica o endereço de entrega do pedido.    |
| data_pedido         | TIMESTAMP     |       | Data e hora em que o pedido foi feito.       | Preenchido automaticamente.                |
| valor_total         | DECIMAL(10,2) |       | Soma total do pedido (produtos + frete).     | Campo obrigatório.                         |
| status_pedido       | VARCHAR(50)   |       | Status atual do pedido.                      | Ex: 'Em Preparo', 'A Caminho', 'Entregue'. |

---

## Tabela: `ItensPedido`

Tabela de junção que detalha os produtos contidos em cada pedido.

| Coluna         | Tipo de Dado  | PK/FK | Descrição                                   | Observações                               |
| -------------- | ------------- | ----- | ------------------------------------------- | ----------------------------------------- |
| id             | INT           | PK    | Identificador único do item do pedido.      | Preenchimento automático.                 |
| pedido_id      | INT           | FK    | Chave estrangeira para a tabela `Pedidos`.  | Indica a qual pedido este item pertence.  |
| produto_id     | INT           | FK    | Chave estrangeira para a tabela `Produtos`. | Indica qual produto foi comprado.         |
| quantidade     | INT           |       | Quantidade comprada deste produto.          | Campo obrigatório.                        |
| preco_unitario | DECIMAL(10,2) |       | Preço do produto no momento da compra.      | Garante a integridade histórica do preço. |
| subtotal       | DECIMAL(10,2) |       | Valor total (quantidade \* preco_unitario). | Campo obrigatório.                        |

---
