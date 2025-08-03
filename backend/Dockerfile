# Etapa 1: build
FROM maven:3.8.5-openjdk-17-slim AS build

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:resolve
COPY src ./src

RUN mvn clean package -DskipTests

# Opcional: verificar que el JAR existe
RUN ls -l /app/target

# Etapa 2: runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiamos el JAR desde la etapa de build
COPY --from=build /app/target/hogar-0.0.1-SNAPSHOT.jar /app/backend.jar

# Verificamos que sí esté copiado
RUN ls -l /app

EXPOSE 8080
CMD ["java", "-jar", "/app/backend.jar"]
