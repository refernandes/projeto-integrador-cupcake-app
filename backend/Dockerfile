# -----------------------------------------------------------------
# ESTÁGIO 1: Build (Compilação)
# Usamos a imagem oficial do Maven com o JDK 21 (eclipse-temurin),
# que é a versão que seu projeto requer (conforme o log do 'mvn test').
# -----------------------------------------------------------------
FROM maven:3.9-eclipse-temurin-21 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do Maven Wrapper e o pom.xml primeiro.
# Isso otimiza o cache do Docker. O Docker só re-baixará as dependências
# se o arquivo pom.xml for alterado.
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Baixa todas as dependências do projeto
RUN ./mvnw dependency:go-offline

# Copia o resto do código-fonte do projeto (a pasta 'src')
COPY src src

# Compila o projeto, cria o .jar e pula os testes (já rodamos localmente)
RUN ./mvnw clean package -DskipTests

# -----------------------------------------------------------------
# ESTÁGIO 2: Run (Execução)
# Usamos uma imagem JRE (Java Runtime Environment) mínima, 
# que é muito menor e mais segura que a imagem completa do JDK.
# -----------------------------------------------------------------
FROM eclipse-temurin:21-jre-jammy

# Define o diretório de trabalho
WORKDIR /app

# --- Ação Manual Necessária ---
# Verifique o nome do .jar na sua pasta 'backend/target/'.
# O nome 'backend-0.0.1-SNAPSHOT.jar' é o padrão.
# Se o seu for diferente, altere a linha abaixo.
# ------------------------------
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta 8080 (padrão do Spring Boot)
EXPOSE 8080

# Comando para iniciar a aplicação quando o contêiner rodar
CMD ["java", "-jar", "app.jar"]