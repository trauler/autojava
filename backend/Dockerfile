FROM openjdk:11-slim AS build
WORKDIR /app
ADD .mvn/ ./.mvn/
ADD pom.xml .
ADD mvnw .
RUN ./mvnw dependency:go-offline
ADD ./src ./src
#ADD . .
#RUN ls
RUN ./mvnw install
RUN ls ..

FROM openjdk:11-slim
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "backend-0.0.1-SNAPSHOT.jar"]