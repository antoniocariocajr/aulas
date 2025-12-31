# 🍃 Spring Boot

- **inicialize, desenvolva e entregue** aplicações Java **rápido e sem XML**

> **Spring Boot** é **extensão do Spring Framework** que **elimina configuração manual**, **embarca servidor**, **gerencia dependências** e **proporciona startup em segundos**.

---

## Criar projeto – **3 cliques**

1. [https://start.spring.io](https://start.spring.io)  
2. **Escolher**:  
   - Project: **Maven/Gradle**  
   - Language: **Java/Kotlin**  
   - Spring Boot: **3.2.x**  
   - Dependencies: **Spring Web**, **Spring Data JPA**, **Lombok**, **H2**...  
3. **Generate** → descompactar → abrir na IDE

**Ou via Spring CLI**:

```bash
spring boot new com.demo app --dependencies web,data-jpa,h2
```

---

## **Hello World** – **REST Controller**

```java
package com.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication   // **ativa auto-configuração**
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
@RequestMapping("/api")
class HelloController {

    @GetMapping("/hello")
    public String hello(@RequestParam(defaultValue = "World") String name) {
        return "Hello, " + name + "!";
    }
}
```

**Rodar**:

```bash
./mvnw spring-boot:run   # ou ./gradlew bootRun
```

**Acesse**:`http://localhost:8080/api/hello?name=Java`

---

## **Estrutura de pastas** (convenção)

```bash
src/main/java/com/demo
├── DemoApplication.java    # **classe principal**
├── controller/             # REST endpoints
├── service/                # lógica de negócio
├── repository/             # acesso a dados
├── model/                  # entidades/DTOs
└── config/                 # configs opcionais

src/main/resources
├── application.yml         # **configurações**
├── static/                 # css, js, imagens
└── templates/              # Thymeleaf, Freemarker
```

---

## **application.yml** – **config central**

```yaml
server:
  port: 8080
  servlet:
    context-path: /app

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/db_exemplo
    username: postgres
    password: 123
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

logging:
  level:
    com.demo: DEBUG
```

**ou** `application.properties`:

```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:test
spring.jpa.hibernate.ddl-auto=update
```

---

## **CRUD completo** – **REST + JPA**

**Entidade**:

```java
@Entity
public class Produto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private BigDecimal preco;
}
```

**Repositório**:

```java
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeContainingIgnoreCase(String nome);
}
```

**Serviço**:

```java
@Service
public class ProdutoService {
    private final ProdutoRepository repo;
    // @RequiredArgsConstructor gera construtor
    public List<Produto> listar() { return repo.findAll(); }
    public Produto salvar(Produto p) { return repo.save(p); }
    public void excluir(Long id) { repo.deleteById(id); }
}
```

**Controlador**:

```java
@RestController
@RequestMapping("/api/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService service;

    @GetMapping
    public List<Produto> listar() { return service.listar(); }

    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody Produto p) {
        Produto salvo = service.salvar(p);
        return ResponseEntity.created(URI.create("/api/produtos/" + salvo.getId())).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
```

**Rodar**:

```bash
./mvnw spring-boot:run
```

**Testes**:

```bash
curl http://localhost:8080/api/produtos
curl -X POST -H "Content-Type: application/json" -d '{"nome":"Mouse","preco":59.90}' http://localhost:8080/api/produtos
```

---

## **Testes** – **camadas completas**

**Unitário** (service):

```java
@ExtendWith(MockitoExtension.class)
class ProdutoServiceTest {
    @Mock private ProdutoRepository repo;
    @InjectMocks private ProdutoService service;

    @Test
    void deveSalvarProduto() {
        Produto p = new Produto(null, "Mouse", BigDecimal.valueOf(59.90));
        when(repo.save(any())).thenReturn(p);

        Produto salvo = service.salvar(p);
        assertThat(salvo).isNotNull();
        verify(repo).save(p);
    }
}
```

**Integração** (controller):

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProdutoControllerIT {

    @Autowired private TestRestTemplate rest;

    @Test
    void deveListarProdutos() {
        ResponseEntity<List> resp = rest.getForEntity("/api/produtos", List.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
```

**WebMvcTest** (só controller):

```java
@WebMvcTest(ProdutoController.class)
class ProdutoControllerTest {

    @Autowired private MockMvc mvc;
    @MockBean private ProdutoService service;

    @Test
    void deveListar() throws Exception {
        when(service.listar()).thenReturn(List.of(new Produto(1L, "Mouse", BigDecimal.TEN)));

        mvc.perform(get("/api/produtos"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$[0].nome").value("Mouse"));
    }
}
```

---

## **Perfis** – **dev / prod / test**

```java
@Component
@Profile("dev")
public class DevConfig {
    @Bean
    public CommandLineRunner inicializar(ProdutoRepository repo) {
        return args -> repo.saveAll(List.of(
                new Produto(null, "Mouse", BigDecimal.valueOf(59.90)),
                new Produto(null, "Teclado", BigDecimal.valueOf(129.90))
        ));
    }
}
```

**Ativar**:

```bash
java -jar app.jar --spring.profiles.active=dev
```

---

## **Actuator** – **monitoramento e health-check**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**Endpoints úteis**:

```BASH
/actuator/health        ← status da app
/actuator/metrics        ← JVM, memória, HTTP
/actuator/env            ← variáveis de ambiente
/actuator/loggers        ← alterar nível de log em runtime
```

**Segurança**:

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,env
```

---

## **Docker** – **container oficial**

**Dockerfile**:

```dockerfile
FROM openjdk:21-jdk-slim
COPY target/app-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

**Build & run**:

```bash
mvn clean package
docker build -t demo-app .
docker run -p 8080:8080 demo-app
```

**Compose** (com banco):

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/db
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: 123
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: db
      POSTGRES_PASSWORD: 123
```

---

## **Propriedades úteis**

```properties
# application-dev.properties
spring.datasource.url=jdbc:h2:mem:dev
spring.h2.console.enabled=true
spring.jpa.show-sql=true
logging.level.org.springframework.web=DEBUG
server.error.include-message=always
server.error.include-binding-errors=always
```

---

## **Boas práticas & dicas**

✅ **Use** **Spring Initializr** – **evite dependências desnecessárias**.  
✅ **Isolado** – **DTOs, services, repositories** – **não exponha entidades**.  
✅ **Teste** – **@WebMvcTest**, **@DataJpaTest**, **TestContainers** para integração.  
✅ **Perfil** – **dev / prod / test** – **separe configurações**.  
✅ **Health** – **Actuator** + **Docker HEALTHCHECK**.  

❌ **Não coloque** **lógica no controller** – **use service**.  
❌ **Não use** **JSP** – **prefira REST + React/Vue** ou **Thymeleaf** se for server-side.  
❌ **Não commit** **senhas** – **use variáveis de ambiente / Vault**.

---

## **Resumo**

> **Spring Boot** **elimina XML**, **embarca servidor**, **configura automaticamente** Spring **via application.yml**, **fornece starters** (Web, Data, Security) e **te deixa rodando** `./mvnw spring-boot:run` **em segundos** – **use para APIs REST, microsserviços e protótipos rápidos**.
