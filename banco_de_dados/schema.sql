-- Arquivo: schema.sql
-- Projeto Físico do Banco de Dados para o Cupcake App v2.0
-- Stack Sugerida: MySQL / MariaDB

-- Desativa a verificação de chaves estrangeiras temporariamente para criar as tabelas sem erro de ordem.
SET FOREIGN_KEY_CHECKS=0;

--
-- Estrutura da tabela `Administradores`
--
DROP TABLE IF EXISTS `Administradores`;
CREATE TABLE `Administradores` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
-- Estrutura da tabela `Clientes`
--
DROP TABLE IF EXISTS `Clientes`;
CREATE TABLE `Clientes` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(20) NULL,
  `data_cadastro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
-- Estrutura da tabela `Enderecos`
--
DROP TABLE IF EXISTS `Enderecos`;
CREATE TABLE `Enderecos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `cliente_id` INT NOT NULL,
  `rua` VARCHAR(255) NOT NULL,
  `numero` VARCHAR(20) NOT NULL,
  `complemento` VARCHAR(100) NULL,
  `bairro` VARCHAR(100) NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  `cep` VARCHAR(10) NOT NULL,
  FOREIGN KEY (`cliente_id`) REFERENCES `Clientes`(`id`) ON DELETE CASCADE
);

--
-- Estrutura da tabela `Produtos`
--
DROP TABLE IF EXISTS `Produtos`;
CREATE TABLE `Produtos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` TEXT NOT NULL,
  `preco` DECIMAL(10, 2) NOT NULL,
  `sabor` VARCHAR(50) NULL,
  `categoria` VARCHAR(50) NULL,
  `imagem_url` VARCHAR(255) NULL,
  `estoque` INT NOT NULL DEFAULT 0,
  `ativo` BOOLEAN NOT NULL DEFAULT TRUE,
  `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
-- Estrutura da tabela `Pedidos`
--
DROP TABLE IF EXISTS `Pedidos`;
CREATE TABLE `Pedidos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `cliente_id` INT NOT NULL,
  `endereco_entrega_id` INT NOT NULL,
  `data_pedido` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `valor_total` DECIMAL(10, 2) NOT NULL,
  `status_pedido` VARCHAR(50) NOT NULL DEFAULT 'Aguardando Pagamento',
  FOREIGN KEY (`cliente_id`) REFERENCES `Clientes`(`id`),
  FOREIGN KEY (`endereco_entrega_id`) REFERENCES `Enderecos`(`id`)
);

--
-- Estrutura da tabela `ItensPedido` (Tabela associativa)
--
DROP TABLE IF EXISTS `ItensPedido`;
CREATE TABLE `ItensPedido` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `pedido_id` INT NOT NULL,
  `produto_id` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `preco_unitario` DECIMAL(10, 2) NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`pedido_id`) REFERENCES `Pedidos`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`produto_id`) REFERENCES `Produtos`(`id`)
);

-- Reativa a verificação de chaves estrangeiras
SET FOREIGN_KEY_CHECKS=1;