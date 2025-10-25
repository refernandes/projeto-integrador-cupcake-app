# 🧁 Cupcake App - Projeto Integrador em Engenharia de Software II

![Status](<https://img.shields.io/badge/status-Projeto%20Concluído%20(SP3)-brightgreen>)
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
  - [Metodologia e Ferramentas](#metodologia-e-ferramentas)
  - [Estrutura do Repositório](#estrutura-do-repositório)
  - [Documentação Principal](#documentação-principal)
  - [Testes](#testes)
    - [Testes Unitários (Backend)](#testes-unitários-backend)
  - [Status do Projeto (SP3 Concluída)](#status-do-projeto-sp3-concluída)
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

## Metodologia e Ferramentas

[cite_start]Este projeto foi desenvolvido utilizando a stack de código **Tradicional** (Java/React), conforme classificado no `PIT_atividade.docx`[cite: 13]. O código-fonte base do frontend (React/TypeScript) foi gerado inicialmente com o auxílio do Google AI Studio e, em seguida, foi inteiramente refatorado, adaptado e integrado manualmente com a API backend (Java/Spring Boot) para atender aos requisitos da `Especificacao_Agil_Cupcake_App_v2.docx`.

## Estrutura do Repositório

O projeto está organizado da seguinte forma:

- [cite_start]**`/backend`**: Contém todo o código-fonte do servidor Spring Boot (Java)[cite: 165].
  - [cite_start]`src/main/java`: Código principal da aplicação (Controllers, Services, Repositories, Models, Config)[cite: 166].
  - [cite_start]`src/main/resources`: Arquivos de configuração (`application.properties` - _no .gitignore_), scripts SQL (`data.sql`)[cite: 167].
  - [cite_start]`src/test/java`: Testes unitários (JUnit) para as camadas de serviço[cite: 168].
  - [cite_start]`pom.xml`: Arquivo de configuração do Maven[cite: 169].
  - [cite_start]`Dockerfile`: Instruções para build da imagem Docker usada no Render[cite: 170].
- [cite_start]**`/frontend`**: Contém todo o código-fonte da aplicação React (TypeScript)[cite: 171].
  - [cite_start]`src`: Código principal da aplicação (Components, Pages, Services, Config - `apiConfig.ts`)[cite: 172].
  - [cite_start]`package.json`: Arquivo de configuração do Node.js/NPM[cite: 173].
  - [cite_start]`tsconfig.json`: Configurações do TypeScript[cite: 174].
  - [cite_start]`vite.config.ts`: Configurações do Vite[cite: 175].
  - [cite_start]`.env`: Configuração local da API*URL (\_no .gitignore*)[cite: 176].
- [cite_start]**`/banco_de_dados`**: Artefatos relacionados à estrutura do banco de dados[cite: 177].
  - [cite_start]`schema.sql` ou `cupcake_db.sql`: Script de criação manual (backup/referência)[cite: 178].
  - [cite_start]`DICIONARIO_DE_DADOS.md`: Documentação detalhada do schema[cite: 179].
- [cite_start]**`/documentacao`**: Documentação de planejamento, requisitos e design[cite: 180].
  - [cite_start]`Especificacao_Agil_Cupcake_App_v2.docx`: Especificação completa do projeto[cite: 181].
  - [cite_start]`REVISAO_E_MELHORIAS.md`: Relatório Kaizen[cite: 182].
  - [cite_start]`/diagramas`: Imagens e códigos Mermaid dos diagramas UML[cite: 183].

## Documentação Principal

Os principais artefatos que definem este projeto podem ser encontrados nos links abaixo:

- [cite_start]**[📄 Especificação Ágil Completa (v2.0)](/documentacao/Especificacao_Agil_Cupcake_App_v2.docx)** [cite: 185]
- [cite_start]**[📝 Relatório de Revisão e Melhorias (Kaizen)](/documentacao/REVISAO_E_MELHORIAS.md)** [cite: 186]
- [cite_start]**[🗃️ Dicionário de Dados](/banco_de_dados/DICIONARIO_DE_DADOS.md)** [cite: 187]

## Testes

### Testes Unitários (Backend)

[cite_start]Conforme solicitado na Situação-Problema 3 [cite: 189][cite_start], foram implementados testes unitários para a camada de serviço do backend, utilizando JUnit 5 e Mockito, como parte do processo de verificação do código[cite: 189].

[cite_start]As classes de teste implementadas estão localizadas no diretório `/backend/src/test/java` do repositório e incluem[cite: 191]:

- [cite_start]`ProdutoServiceTest.java` (6 testes) [cite: 193]
- [cite_start]`ClienteServiceTest.java` (4 testes) [cite: 194]
- [cite_start]`PedidoServiceTest.java` (4 testes) [cite: 195]

[cite_start]**Total de Testes:** 15 [cite: 197]

[cite_start]**Resultado:** Todos os 15 testes unitários passam com sucesso quando executados localmente via `./mvnw test`, confirmando que as lógicas de negócio principais estão funcionando conforme o esperado[cite: 199]. [cite_start]Os arquivos de teste foram devidamente versionados no GitHub[cite: 200].

[cite_start]**Evidência da Execução:** [cite: 202]

[cite_start]![Resultado dos Testes Unitários](https://github-production-user-asset-6210df.s3.amazonaws.com/100616022/505629403-ed1ec39f-eddb-4adf-a15e-ab79737e49a1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251025%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251025T121519Z&X-Amz-Expires=300&X-Amz-Signature=0d7d55e46617bd3742fbb9f020f047f9f40fe3070b6b3d8b757a4bc341254ddb&X-Amz-SignedHeaders=host) [cite: 202]

- [cite_start]**Testes de Validação (Frontend/Integração):** Estão sendo realizados na Situação-Problema 3, através de testes manuais por pares (colegas), utilizando a aplicação hospedada[cite: 204]. [cite_start]O feedback está sendo coletado via Google Forms[cite: 205].

## Status do Projeto (SP3 Concluída)

- ✅ **Situação-Problema 1 (Planejamento e BD):** Concluída. [cite_start]Documentação revisada (v2.0) e banco de dados modelado e documentado[cite: 208].
- ✅ **Situação-Problema 2 (Codificação e Testes Unitários):** Concluída. Backend e Frontend implementados, integrados e hospedados. Testes unitários do backend implementados e passando. [cite_start]Vídeo de demonstração inicial gravado[cite: 209].
- ✅ **Situação-Problema 3 (Validação e Entrega Final):** Concluída.
  - [cite_start]Coleta de feedback de 5 pares via formulário[cite: 211].
  - [cite_start]Análise do feedback e implementação de 5 correções/melhorias pertinentes[cite: 212].
  - [cite_start]Elaboração do Laudo de Qualidade (com evidências) [cite: 213, 19-87].
  - [cite_start]Gravação do vídeo final (até 5 min) demonstrando a solução atualizada[cite: 214, 88].
  - [cite_start]Preenchimento e entrega do documento `PIT_atividade.docx` [cite: 215, 1-90].

## Autor

- [cite_start]**Nome:** Renan Rodrigo Fernandes de Sousa [cite: 218]
- [cite_start]**RGM:** 30064597 [cite: 219]
- [cite_start]**Curso:** Engenharia de Software [cite: 220]
- [cite_start]**Instituição:** Universidade Positivo [cite: 221]
