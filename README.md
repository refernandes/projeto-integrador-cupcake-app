# 🧁 Cupcake App - Projeto Integrador em Engenharia de Software II

![Status](<https://img.shields.io/badge/status-Funcional%20(SP2%20Concluída)-brightgreen>)
![Documentation](https://img.shields.io/badge/documentation-v2.0-blue)
![Java](https://img.shields.io/badge/Java-21-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-green)
![React](https://img.shields.io/badge/React-TS%20+%20Vite-cyan)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

Este repositório contém todos os artefatos do projeto "Cupcake App", desenvolvido para a disciplina de **Projeto Integrador Transdisciplinar em Engenharia de Software II** do curso de Engenharia de Software da Universidade Positivo.

## 🚀 Links da Aplicação (Deploy)

- **Frontend (Vercel):** [https://projeto-integrador-cupcake-app.vercel.app](https://projeto-integrador-cupcake-app.vercel.app)
- **Backend API (Render):** [https://projeto-integrador-cupcake-app.onrender.com](https://projeto-integrador-cupcake-app.onrender.com)
  - _Endpoint de Exemplo (Produtos):_ [https://projeto-integrador-cupcake-app.onrender.com/api/produtos](https://projeto-integrador-cupcake-app.onrender.com/api/produtos)
- **Credenciais Admin (para teste):**
  - **E-mail:** `admin@cupcake.com`
  - **Senha:** `admin123`

## Tabela de Conteúdos

- [🧁 Cupcake App - Projeto Integrador em Engenharia de Software II](#-cupcake-app---projeto-integrador-em-engenharia-de-software-ii)
  - [🚀 Links da Aplicação (Deploy)](#-links-da-aplicação-deploy)
  - [Tabela de Conteúdos](#tabela-de-conteúdos)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Principais Funcionalidades (v2.0)](#principais-funcionalidades-v20)
    - [Para Clientes](#para-clientes)
    - [Para Administradores](#para-administradores)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Estrutura do Repositório](#estrutura-do-repositório)
  - [Documentação Principal](#documentação-principal)
  - [Testes](#testes)
  - [Status Atual e Próximos Passos (SP3)](#status-atual-e-próximos-passos-sp3)
  - [Autor](#autor)

## Sobre o Projeto

O **Cupcake App** é uma aplicação web completa projetada para uma confeitaria de cupcakes gourmet. O objetivo é digitalizar o processo de vendas, oferecendo aos clientes uma vitrine virtual, um sistema de pedidos online com pagamento simulado e acompanhamento de entregas. O projeto também inclui um painel administrativo para o gerenciamento de produtos e pedidos.

Este projeto seguiu a metodologia ágil Scrum, com entregas incrementais baseadas em histórias de usuário e um ciclo de melhoria contínua (Kaizen) aplicado após a fase inicial de planejamento. A estrutura do backend segue o padrão Model-View-Controller (MVC).

## Principais Funcionalidades (v2.0)

A versão 2.0 do projeto, após a fase de revisão, contempla as seguintes funcionalidades:

### Para Clientes

- **Autenticação Completa:** Cadastro, login e recuperação de senha.
- **Gerenciamento de Conta:** Visualização e edição de dados pessoais e alteração de senha.
- **Catálogo Inteligente:** Visualização de produtos, filtro por sabores e busca por nome.
- **Jornada de Compra Completa:** Adicionar/remover itens do carrinho, selecionar/cadastrar endereço e finalizar pedido com pagamento simulado.
- **Pós-venda:** Acompanhamento do status do pedido em tempo real e acesso ao histórico de compras.

### Para Administradores

- **Autenticação Segura:** Login específico para administradores.
- **Gerenciamento de Produtos:** Cadastro, edição de informações, controle de estoque e ativação/desativação de cupcakes no catálogo.
- **Gerenciamento de Pedidos:** Visualização de todos os pedidos recebidos, com filtros por status e capacidade de alterar o andamento da entrega.

## Tecnologias Utilizadas

- **Backend:**
  - Linguagem: Java 21
  - Framework: Spring Boot 3
  - Segurança: Spring Security com JWT (JSON Web Tokens)
  - Persistência: Spring Data JPA / Hibernate
  - Build: Maven
- **Frontend:**
  - Framework: React com TypeScript
  - Build Tool: Vite
  - Estilização: Tailwind CSS
- **Banco de Dados:** MySQL 8
- **Hospedagem:**
  - Backend: Render.com (Serviço Web Dockerizado)
  - Frontend: Vercel
  - Database: Aiven (MySQL)
- **Versionamento:** Git & GitHub

## Estrutura do Repositório

O projeto está organizado da seguinte forma:

- **`/backend`**: Contém todo o código-fonte do servidor Spring Boot (Java).
  - `src/main/java`: Código principal da aplicação (Controllers, Services, Repositories, Models, Config).
  - `src/main/resources`: Arquivos de configuração (`application.properties` - _no .gitignore_), scripts SQL (`data.sql`).
  - `src/test/java`: Testes unitários (JUnit) para as camadas de serviço.
  - `pom.xml`: Arquivo de configuração do Maven.
  - `Dockerfile`: Instruções para build da imagem Docker usada no Render.
- **`/frontend`**: Contém todo o código-fonte da aplicação React (TypeScript).
  - `src`: Código principal da aplicação (Components, Pages, Services, Config - `apiConfig.ts`).
  - `package.json`: Arquivo de configuração do Node.js/NPM.
  - `tsconfig.json`: Configurações do TypeScript.
  - `vite.config.ts`: Configurações do Vite.
  - `.env`: Configuração local da API*URL (\_no .gitignore*).
- **`/banco_de_dados`**: Artefatos relacionados à estrutura do banco de dados.
  - `schema.sql` ou `cupcake_db.sql`: Script de criação manual (backup/referência).
  - `DICIONARIO_DE_DADOS.md`: Documentação detalhada do schema.
- **`/documentacao`**: Documentação de planejamento, requisitos e design.
  - `Especificacao_Agil_Cupcake_App_v2.docx`: Especificação completa do projeto.
  - `REVISAO_E_MELHORIAS.md`: Relatório Kaizen.
  - `/diagramas`: Imagens e códigos Mermaid dos diagramas UML.

## Documentação Principal

Os principais artefatos que definem este projeto podem ser encontrados nos links abaixo:

- **[📄 Especificação Ágil Completa (v2.0)](/documentacao/Especificacao_Agil_Cupcake_App_v2.docx)**
- **[📝 Relatório de Revisão e Melhorias (Kaizen)](/documentacao/REVISAO_E_MELHORIAS.md)**
- **[🗃️ Dicionário de Dados](/banco_de_dados/DICIONARIO_DE_DADOS.md)**

## Testes

- **Testes Unitários (Backend):** Foram implementados testes unitários utilizando JUnit e Mockito para validar a lógica de negócio nas classes de Serviço (`/backend/src/test/java`), conforme requisito da SP2. Os testes cobrem as principais operações de Clientes, Produtos e Pedidos.
- **Testes de Validação (Frontend/Integração):** Estão sendo realizados na Situação-Problema 3, através de testes manuais por pares (colegas), utilizando a aplicação hospedada. O feedback está sendo coletado via Google Forms.

## Status Atual e Próximos Passos (SP3)

- ✅ **Situação-Problema 1 (Planejamento e BD):** Concluída. Documentação revisada (v2.0) e banco de dados modelado e documentado.
- ✅ **Situação-Problema 2 (Codificação e Testes Unitários):** Concluída. Backend e Frontend implementados, integrados e hospedados. Testes unitários do backend implementados e passando. Vídeo de demonstração inicial gravado.
- 🚧 **Situação-Problema 3 (Validação e Entrega Final):** Em andamento.
  - Coleta de feedback de 5 pares via formulário.
  - Análise do feedback e implementação de correções/melhorias pertinentes.
  - Elaboração do Laudo de Qualidade.
  - Gravação do vídeo final (até 5 min) demonstrando a solução atualizada.
  - Preenchimento e entrega do documento `PIT_atividade.docx`.

## Autor

- **Nome:** Renan Rodrigo Fernandes de Sousa
- **RGM:** 30064597
- **Curso:** Engenharia de Software
- **Instituição:** Universidade Positivo
