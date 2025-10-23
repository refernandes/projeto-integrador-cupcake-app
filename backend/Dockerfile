# ESTÁGIO 1: Build (Compilação)
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copia os arquivos do Maven Wrapper e o pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# -----------------------------------------------------------------
# A CORREÇÃO ESTÁ AQUI:
# Adiciona permissão de execução ao script do Maven Wrapper
RUN chmod +x mvnw
# -----------------------------------------------------------------

# Baixa todas as dependências do projeto
RUN ./mvnw dependency:go-offline

# Copia o resto do código-fonte
COPY src src

# Compila o projeto
RUN ./mvnw clean package -DskipTests

# ... (O restante do arquivo permanece o mesmo) ...