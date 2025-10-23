DELETE FROM `itens_pedido`;
DELETE FROM `pedidos`;
DELETE FROM `enderecos`;
DELETE FROM `administradores`;
DELETE FROM `clientes`;
DELETE FROM `produtos`;
-- ----------------------------------------------------------------------------------
-- data.sql - Script de Carga Inicial para o Spring Boot
-- ----------------------------------------------------------------------------------
-- Este script assume que as tabelas JÁ EXISTEM (criadas pelo 'ddl-auto=update').
-- Os dados abaixo são uma cópia exata dos INSERTs fornecidos.
-- ----------------------------------------------------------------------------------

-- Despejando dados para a tabela `administradores`
INSERT INTO `administradores` (`id`, `email`, `nome`, `senha`) VALUES
(1, 'admin@cupcake.com', 'Admin Principal', '$2a$10$EjwNsM37F8UgmI4YkgRzwOsNpJWQUroTctZMlGXdUkOkCe69VfKtq');

-- Despejando dados para a tabela `clientes`
INSERT INTO `clientes` (`id`, `email`, `nome`, `senha`, `telefone`) VALUES
(1, 'renan.teste@example.com', 'Renan Teste', '$2a$10$vF3dLNT4Hx.vDzXGJPHOvOKQFut0gDiiNuPNuRnaOGDxZys7eEe2e', '11987654321'),
(2, 'renan.f.sousa@outlook.com', 'Renan Rodrigo Fernandes de Sousa', '$2a$10$/LyzJKpS4DjL3.v7nynQiO3CQq9ZSsYVSEoYZzJGBudN8.QcGQHl6', '41987943495'),
(3, 'graycenoronha@gmail.com', 'Grayce Noronha', '$2a$10$OL9/ra/UTyLXtzdSZck6n.Eb9IEDNl2PtHCvdelmnpc4Yd3hBlwiS', '47997139827');

-- Despejando dados para a tabela `enderecos`
INSERT INTO `enderecos` (`id`, `bairro`, `cep`, `cidade`, `complemento`, `numero`, `rua`, `cliente_id`) VALUES
(1, 'Sé', '01001-000', 'São Paulo', 'Lado da Catedral', '100', 'Praça da Sé', 1),
(2, 'Campestre', '09070-360', 'Santo André', '123', '96', 'R JequitinhonhaAAA', 2),
(3, 'Uberaba', '81590-100', 'Curitiba', '123', '791', 'Rua abóbora', 2),
(4, 'Campestre', '09070-360', 'Santo André', 'Casa', '176', 'R Jequitinhonha', 2),
(5, 'AVENTUREIRO', '000000000', 'JOINVILLE', '10', '10', 'R TAL', 2),
(6, '11111', '11111-111', '11111', '111', '111', 'Rua 111', 2),
(7, 'Aventureiro', '89226-001', 'Joinville', 'Bl 2 Apto 306', '3210', 'Rua Tuiuti', 3);

-- Despejando dados para a tabela `produtos`
INSERT INTO `produtos` (`id`, `ativo`, `categoria`, `descricao`, `estoque`, `imagem_url`, `nome`, `preco`, `sabor`) VALUES
(1, b'0', NULL, 'Um clássico intenso com massa de chocolate e cobertura cremosa de brigadeiro belga.', 10, 'https://i.imgur.com/YftNEHt.png', 'Chocolate Belga', 12.00, 'Chocolate'),
(2, b'1', NULL, 'A delicadeza da baunilha em uma combinação perfeita com cobertura de buttercream suave.', 2, 'https://i.imgur.com/ONX9Uyt.png', 'Baunilha Francesa', 10.00, 'Baunilha'),
(3, b'1', NULL, 'Massa leve com recheio de geleia de morango e cobertura de frosting de champagne rosé.', 1, 'https://i.imgur.com/8ms1b6J.png', 'Morango & Champagne', 14.00, 'Frutas'),
(4, b'1', NULL, 'Massa amanteigada com recheio e cobertura de doce de leite argentino, finalizado com flor de caramelo.', 26, 'https://i.imgur.com/tf9fXq9.png', 'Doce de Leite Gourmet', 10.00, 'Baunilha'),
(5, b'1', NULL, 'Massa aveludada vermelha com leve toque de cacau, coberta com cream cheese frosting.', 42, 'https://i.imgur.com/wN4U5hH.png', 'Red Velvet', 9.00, 'Chocolate'),
(6, b'1', NULL, 'Massa branca com recheio de leite ninho e cobertura cremosa de Nutella.', 50, 'https://i.imgur.com/ykZSq9I.png', 'Ninho com Nutella', 10.00, 'Baunilha'),
(7, b'1', NULL, 'Massa úmida de cenoura coberta com ganache de chocolate meio amargo.', 50, 'https://i.imgur.com/jjXBUQg.png', 'Cenoura com Chocolate', 9.00, 'Frutas'),
(8, b'1', NULL, 'Massa leve e cítrica com cobertura de merengue tostado e raspas de limão.', 50, 'https://i.imgur.com/ACet2BJ.png', 'Limão Siciliano', 20.00, 'Frutas');

-- Despejando dados para a tabela `pedidos`
INSERT INTO `pedidos` (`id`, `data_pedido`, `status_pedido`, `valor_total`, `cliente_id`, `endereco_entrega_id`) VALUES
(1, '2025-10-19 09:14:12.000000', 'Entregue', 38.00, 1, 1),
(2, '2025-10-19 09:37:53.000000', 'Pedido Confirmado', 38.00, 1, 1),
(3, '2025-10-20 07:56:52.000000', 'Pedido Confirmado', 12.00, 2, 2),
(4, '2025-10-20 07:57:29.000000', 'Pedido Confirmado', 12.00, 2, 2),
(5, '2025-10-20 08:13:17.000000', 'Pedido Confirmado', 28.00, 2, 2),
(6, '2025-10-20 08:13:56.000000', 'Pedido Confirmado', 12.00, 2, 2),
(7, '2025-10-20 08:18:41.000000', 'Pedido Confirmado', 12.00, 2, 2),
(8, '2025-10-20 08:20:11.000000', 'Pedido Confirmado', 12.00, 2, 2),
(9, '2025-10-20 08:26:04.000000', 'Pedido Confirmado', 12.00, 2, 2),
(10, '2025-10-20 08:28:39.000000', 'Pedido Confirmado', 36.00, 2, 2),
(11, '2025-10-20 08:34:19.000000', 'Pedido Confirmado', 28.00, 2, 2),
(12, '2025-10-20 08:47:58.000000', 'Pedido Confirmado', 96.00, 2, 5),
(13, '2025-10-20 08:52:47.000000', 'Pedido Confirmado', 126.00, 2, 5),
(14, '2025-10-20 09:18:45.000000', 'A Caminho', 48.00, 2, 5),
(15, '2025-10-20 09:26:22.000000', 'Entregue', 24.00, 2, 5),
(16, '2025-10-20 09:32:17.000000', 'Entregue', 28.00, 2, 4),
(17, '2025-10-20 13:57:44.000000', 'Entregue', 48.00, 2, 2),
(18, '2025-10-20 14:14:28.000000', 'Entregue', 30.00, 2, 4),
(19, '2025-10-20 20:18:28.000000', 'Entregue', 10.00, 2, 2),
(20, '2025-10-21 22:05:35.000000', 'Em Preparo', 10.00, 2, 2),
(21, '2025-10-22 07:14:22.000000', 'A Caminho', 20.00, 2, 3),
(22, '2025-10-22 08:06:20.000000', 'Pedido Confirmado', 132.00, 2, 3),
(23, '2025-10-22 08:22:50.000000', 'Entregue', 54.00, 2, 6),
(24, '2025-10-22 08:28:40.000000', 'Pedido Confirmado', 34.00, 3, 7);

-- Despejando dados para a tabela `itens_pedido`
INSERT INTO `itens_pedido` (`id`, `preco_unitario`, `quantidade`, `subtotal`, `pedido_id`, `produto_id`) VALUES
(1, 12.00, 2, 24.00, 1, 1),
(2, 14.00, 1, 14.00, 1, 3),
(3, 12.00, 2, 24.00, 2, 1),
(4, 14.00, 1, 14.00, 2, 3),
(5, 12.00, 1, 12.00, 3, 1),
(6, 12.00, 1, 12.00, 4, 1),
(7, 14.00, 2, 28.00, 5, 3),
(8, 12.00, 1, 12.00, 6, 1),
(9, 12.00, 1, 12.00, 7, 1),
(10, 12.00, 1, 12.00, 8, 1),
(11, 12.00, 1, 12.00, 9, 1),
(12, 12.00, 3, 36.00, 10, 1),
(13, 14.00, 2, 28.00, 11, 3),
(14, 12.00, 6, 72.00, 12, 1),
(15, 10.00, 1, 10.00, 12, 2),
(16, 14.00, 1, 14.00, 12, 3),
(17, 14.00, 9, 126.00, 13, 3),
(18, 12.00, 4, 48.00, 14, 1),
(19, 12.00, 2, 24.00, 15, 1),
(20, 14.00, 2, 28.00, 16, 3),
(21, 12.00, 4, 48.00, 17, 1),
(22, 10.00, 3, 30.00, 18, 2),
(23, 10.00, 1, 10.00, 19, 2),
(24, 10.00, 1, 10.00, 20, 2),
(25, 10.00, 2, 20.00, 21, 2),
(26, 14.00, 6, 84.00, 22, 3),
(27, 10.00, 3, 30.00, 22, 4),
(28, 9.00, 2, 18.00, 22, 5),
(29, 9.00, 6, 54.00, 23, 5),
(30, 10.00, 1, 10.00, 24, 2),
(31, 14.00, 1, 14.00, 24, 3),
(32, 10.00, 1, 10.00, 24, 4);