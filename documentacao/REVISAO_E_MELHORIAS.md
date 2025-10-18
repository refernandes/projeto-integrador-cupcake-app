# **Relatório de Revisão e Melhoria Contínua (Kaizen) - Fase II**

**Projeto:** Cupcake App  
**Autor:** Renan Rodrigo Fernandes de Sousa  
**RGM:** 30064597  
**Data da Revisão:** 18/10/2025

## **1. Introdução**

Este documento formaliza o processo de revisão e melhoria contínua (Kaizen) aplicado à documentação do projeto "Cupcake App". A análise crítica e a incorporação de feedbacks são etapas fundamentais da **Situação-Problema 1**, visando adequar o escopo e robustecer a especificação antes da fase de codificação.

## **2. Autoavaliação Crítica da Especificação Original**

A seguir, são detalhados os pontos de melhoria identificados a partir de uma análise criteriosa da especificação ágil original (`Especificacao_Agil_Cupcake_App.docx`).

### **2.1. Gerenciamento de Produtos (Painel do Administrador)**

- **Ponto Crítico Identificado:** As funcionalidades administrativas para produtos estão incompletas. A especificação atual contempla apenas o cadastro de novos cupcakes.
- **Análise do Problema:** Em um cenário real, um catálogo de produtos é dinâmico. Preços mudam, descrições precisam ser corrigidas e produtos podem se tornar indisponíveis temporariamente. A ausência das funcionalidades de **edição** e **desativação** torna o sistema inflexível e de difícil manutenção para o administrador.
- **Solução Proposta:** Serão criadas duas novas histórias de usuário para enriquecer o painel administrativo:
  1. **Editar Produto:** _"Como administrador, quero poder editar os dados de um cupcake já cadastrado para manter as informações do catálogo sempre atualizadas."_
  2. **Desativar Produto:** _"Como administrador, quero poder desativar um cupcake do catálogo para que ele não apareça para os clientes, sem precisar excluí-lo do sistema."_
- **Impacto Técnico:** Adição da coluna `ativo (BOOLEAN)` na tabela `Produtos`. Desenvolvimento de uma nova tela e endpoints na API para edição e atualização de produtos.

### **2.2. Gerenciamento de Perfil do Usuário**

- **Ponto Crítico Identificado:** O usuário não possui autonomia para gerenciar seus próprios dados após o cadastro.
- **Análise do Problema:** A especificação prevê o cadastro e a recuperação de senha, mas não permite que um usuário logado altere suas informações pessoais (como nome ou telefone) ou sua senha por segurança. Isso compromete a experiência do usuário e é uma funcionalidade padrão esperada em qualquer aplicação com autenticação.
- **Solução Proposta:** Criação de uma nova história de usuário de alta prioridade: _"Como usuário cadastrado, quero acessar uma área "Minha Conta" para poder visualizar e editar meus dados pessoais e alterar minha senha."_
- **Impacto Técnico:** Criação de uma nova tela de "Perfil do Usuário" e endpoints de API para `UPDATE` dos dados do cliente.

### **2.3. Simplificação do Fluxo de Pagamento**

- **Ponto Crítico Identificado:** A implementação de um gateway de pagamento real (cartão de crédito) possui alta complexidade técnica, sendo desproporcional para o escopo de um projeto acadêmico.
- **Análise do Problema:** A integração com APIs de pagamento envolve tratamento de dados sensíveis, múltiplos cenários de erro e um fluxo de autorização complexo. Tentar implementar isso do zero consumiria um tempo valioso que poderia ser melhor investido no desenvolvimento das funcionalidades centrais do sistema.
- **Solução Proposta:** A funcionalidade será mantida do ponto de vista da interface do usuário (UI), mas o processamento no back-end será **simulado**. O usuário preencherá os dados, mas o sistema irá automaticamente aprovar o pedido para fins de demonstração, permitindo que o fluxo continue para a etapa de acompanhamento da entrega. A História de Usuário #8 será reescrita para refletir essa simulação.
- **Impacto Técnico:** O front-end permanece o mesmo. O back-end terá uma lógica simplificada que não se comunica com um serviço externo, focando em registrar o pedido com o status "Em Preparo".

## **3. Coleta de Feedback de Pares (Kaizen Colaborativo)**

Conforme a orientação de utilizar a colaboração e a empatia, o projeto foi apresentado a colegas para coleta de sugestões de melhoria.

### **Colega 1: Felipe Macedo**

- **Data:** [13/10/2025]
- **Sugestão:** _"O layout do catálogo está claro, mas com muitos produtos, seria difícil achar um específico. Sugiro adicionar uma barra de busca por nome."_
- **Análise e Decisão:** A sugestão é pertinente e alinhada às boas práticas de UX. Uma funcionalidade de busca aumenta significativamente a usabilidade com um esforço de implementação moderado.

- **Decisão: Acatada.** Será criada uma nova história de usuário de prioridade "C" para a busca.

### **Colega 2: Grayce Noronha**

- **Data:** [15/10/2025]
- **Sugestão:** _"Consigo acompanhar meu pedido atual, o que é ótimo. Mas e se eu quisesse ver os detalhes de um pedido que fiz na semana passada ou até repetir uma compra? Senti falta de um histórico de pedidos na minha conta."_
- **Análise e Decisão:** A sugestão é excelente, pois um histórico de pedidos aumenta o engajamento e a recorrência de compras do cliente. A funcionalidade se encaixa perfeitamente na área "Minha Conta", já planejada na autoavaliação. A implementação é viável e agrega muito valor à experiência do usuário.

- **Decisão: Acatada.** Será criada uma nova história de usuário para "Visualizar Histórico de Pedidos".

## 4. Plano de Ação e Impacto na Documentação

Com base na análise crítica e nos feedbacks, o seguinte plano de ação foi executado para atualizar a documentação do projeto antes de iniciar a codificação. A tabela abaixo detalha cada melhoria, os artefatos de especificação que foram impactados e o status final da tarefa.

| ID  | Ação de Melhoria                             | Artefato(s) a ser(em) Atualizado(s)                           | Status    |
| :-: | :------------------------------------------- | :------------------------------------------------------------ | :-------- |
| 01  | Adicionar busca de produtos por nome         | Backlog (nova história), Casos de Uso, Wireframes (`TELA001`) | `[FEITO]` |
| 02  | Adicionar gerenciamento de perfil do usuário | Backlog (nova história), Casos de Uso, Diagrama de Classes    | `[FEITO]` |
| 03  | Adicionar edição e desativação de produtos   | Backlog (novas histórias), Casos de Uso, Diagrama de Classes  | `[FEITO]` |
| 04  | Adicionar histórico de pedidos do cliente    | Backlog (nova história), Casos de Uso, Wireframes (nova tela) | `[FEITO]` |
| 05  | Simplificar fluxo de pagamento (simulação)   | Backlog (reescrever História #8), Casos de Uso Expandidos     | `[FEITO]` |
| 06  | Detalhar segurança da API com tokens         | Adicionar como Requisito Não Funcional na especificação       | `[FEITO]` |

**Conclusão da Revisão:** Todas as tarefas planejadas foram concluídas e implementadas na documentação `Especificacao_Agil_Cupcake_App_v2.docx`. O projeto está agora em um estado consistente e pronto para a próxima fase.
