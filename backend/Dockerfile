# Этап 1: Сборка приложения
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Копируем файлы сборки
COPY pom.xml .
RUN mvn dependency:go-offline

# Копируем исходники и собираем JAR
COPY src ./src
RUN mvn clean package -DskipTests

# Этап 2: Запуск
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Копируем JAR из этапа сборки и сразу переименовываем
COPY --from=build /app/target/*.jar /app/app.jar

# Открываем порт
EXPOSE 8080

# Запускаем приложение
ENTRYPOINT ["java", "-jar", "app.jar"]