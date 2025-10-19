# 🧁 Cupcake App - Projeto Integrador em Engenharia de Software II

![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)
![Documentation](https://img.shields.io/badge/documentation-v2.0-blue)

Este repositório contém todos os artefatos do projeto "Cupcake App", desenvolvido para a disciplina de **Projeto Integrador Transdisciplinar em Engenharia de Software II**.

## Tabela de Conteúdos

- [🧁 Cupcake App - Projeto Integrador em Engenharia de Software II](#-cupcake-app---projeto-integrador-em-engenharia-de-software-ii)
  - [Tabela de Conteúdos](#tabela-de-conteúdos)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Estrutura do Repositório](#estrutura-do-repositório)
  - [Principais Funcionalidades (v2.0)](#principais-funcionalidades-v20)
    - [Para Clientes](#para-clientes)
    - [Para Administradores](#para-administradores)
  - [Documentação Principal](#documentação-principal)
  - [Próximos Passos (Situação-Problema 2)](#próximos-passos-situação-problema-2)
  - [Autor](#autor)

---

## Sobre o Projeto

O **Cupcake App** é uma solução de software mobile-first projetada para uma confeitaria de cupcakes gourmet. O objetivo é digitalizar o processo de vendas, oferecendo aos clientes uma vitrine virtual, um sistema de pedidos online com pagamento simulado e acompanhamento de entregas. O projeto também inclui um painel administrativo robusto para o gerenciamento de produtos e pedidos.

Este projeto segue a metodologia ágil Scrum, com entregas incrementais baseadas em histórias de usuário e um ciclo de melhoria contínua (Kaizen).

---

## Estrutura do Repositório

O projeto está organizado da seguinte forma para facilitar a navegação e a avaliação:

- **`/banco_de_dados`**: Contém os artefatos relacionados à persistência de dados.

  - `schema.sql`: Script SQL para a criação da estrutura física do banco de dados.
  - `DICIONARIO_DE_DADOS.md`: Documentação detalhada de cada tabela e coluna.

- **`/documentacao`**: Contém toda a documentação de planejamento, requisitos e design do projeto.
  - `Especificacao_Agil_Cupcake_App_v2.docx`: O documento central com a especificação completa do projeto.
  - `REVISAO_E_MELHORIAS.md`: O relatório Kaizen, detalhando as melhorias da V1 para a V2.
  - `/diagramas`: Subpasta com as imagens e o código-fonte Mermaid de todos os diagramas UML.

---

## Principais Funcionalidades (v2.0)

A versão 2.0 do projeto, após a fase de revisão, contempla as seguintes funcionalidades:

### Para Clientes

- **Autenticação Completa:** Cadastro, login e recuperação de senha.
- **Gerenciamento de Conta:** Visualização e edição de dados pessoais e alteração de senha.
- **Catálogo Inteligente:** Visualização de produtos, filtro por sabores e busca por nome.
- **Jornada de Compra Completa:** Adicionar/remover itens do carrinho, selecionar endereço e finalizar pedido com pagamento simulado.
- **Pós-venda:** Acompanhamento do status do pedido em tempo real e acesso ao histórico de compras.

### Para Administradores

- **Gerenciamento de Produtos:** Cadastro, edição de informações, controle de estoque e ativação/desativação de cupcakes no catálogo.
- **Gerenciamento de Pedidos:** Visualização de todos os pedidos recebidos, com filtros por status e capacidade de alterar o andamento da entrega.

---

## Documentação Principal

Os principais artefatos que definem este projeto podem ser encontrados nos links abaixo:

- **[📄 Especificação Ágil Completa (v2.0)](/documentacao/Especificacao_Agil_Cupcake_App_v2.docx)**
- **[📝 Relatório de Revisão e Melhorias (Kaizen)](/documentacao/REVISAO_E_MELHORIAS.md)**
- **[🗃️ Dicionário de Dados](/banco_de_dados/DICIONARIO_DE_DADOS.md)**

---

## Próximos Passos (Situação-Problema 2)

A próxima fase deste projeto se concentrará na implementação e codificação da aplicação, incluindo:

- Desenvolvimento do back-end seguindo o padrão MVC.
- Criação das APIs RESTful para servir o front-end.
- Implementação dos testes unitários para garantir a qualidade do código.
- Publicação da solução funcional.

---

## Autor

- **Nome:** Renan Rodrigo Fernandes de Sousa
- **RGM:** 30064597
