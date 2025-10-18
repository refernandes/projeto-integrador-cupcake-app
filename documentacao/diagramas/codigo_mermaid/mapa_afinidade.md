# Código Mermaid para o Mapa de Afinidades v2.0

Este documento contém o código-fonte para o Mapa de Afinidades do projeto, utilizando a sintaxe Mermaid.

```mermaid
---
config:
  theme: redux-dark-color
---

mmindmap
  root((Cupcake App v2.0<br/>Mapa de Afinidade))
    **Cadastro/Autenticação**
      ID 01: Cadastro de Cliente
      ID 02: Login de Usuário
      ID 03: Recuperação de Senha
    **Gerenciamento de Conta**
      ID 18: Gerenciar Perfil
      ID 20: Ver Histórico de Pedidos
    **Catálogo e Compra**
      ID 04: Visualizar Catálogo
      ID 05: Filtrar por Sabor
      ID 19: Buscar Produtos
      ID 06: Adicionar ao Carrinho
      ID 07: Remover do Carrinho
      ID 08: Simular Pagamento
    **Entrega e Acompanhamento**
      ID 09: Escolher Endereço
      ID 10: Rastreamento de Pedido
    **Administração**
      ID 11: Cadastrar Cupcake
      ID 16: Editar Cupcake
      ID 17: Desativar Cupcake
      ID 12: Ver Pedidos Pendentes
      ID 13: Alterar Status do Pedido
    **Notificações**
      ID 14: Notificação de Confirmação
      ID 15: Notificação de Entrega
```
