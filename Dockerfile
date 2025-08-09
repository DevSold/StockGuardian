# Imagem base com Java 17
FROM eclipse-temurin:17-jdk-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia o arquivo pom.xml e instala dependências
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o código fonte
COPY src ./src

# Compila o projeto
RUN mvn clean package -DskipTests

# Expõe a porta (a mesma do application.yml)
EXPOSE 8080

# Comando para rodar o jar
CMD ["java", "-jar", "target/stockguardian-backend-1.0.0.jar"]
