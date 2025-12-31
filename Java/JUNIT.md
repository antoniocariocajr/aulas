# 🧪 Testes Unitários com JUnit 5

> **JUnit** é o **framework padrão** para **testar unidades (métodos/classes)** de forma **automatizada** e **independente**.

---

## Dependência (Maven/Gradle)

**Maven**:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
</dependency>
```

**Gradle**:

```groovy
testImplementation 'org.junit.jupiter:junit-jupiter:5.10.2'
```

**Plugin para rodar** (se IDE não incluir):

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <version>3.2.5</version>
</plugin>
```

**Executar**:

```bash
mvn test                 # Maven
gradle test              # Gradle
```

---

## Estrutura básica – **anotações essenciais**

```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.*;

class CalculadoraTest {

    @BeforeAll          // 1× antes de TODOS os testes (must be static)
    static void setupClass() {
        System.out.println("Iniciando suite");
    }

    @BeforeEach         // antes de CADA teste
    void setup() {
        System.out.println("Novo teste");
    }

    @Test
    void deveSomarCorretamente() {
        int resultado = Calculadora.somar(2, 3);
        assertEquals(5, resultado);
    }

    @Test
    @DisplayName("Quando subtrair deve retornar diferença")
    void subtrair() {
        assertEquals(4, Calculadora.subtrair(7, 3));
    }

    @AfterEach          // depois de CADA teste
    void tearDown() {
        System.out.println("Fim do teste");
    }

    @AfterAll           // 1× depois de TODOS os testes
    static void tearDownClass() {
        System.out.println("Fim da suite");
    }
}
```

---

## **Assertions** modernas

```java
import static org.junit.jupiter.api.Assertions.*;

assertEquals(esperado, atual);
assertNotNull(obj);
assertTrue(condicao);
assertFalse(condicao);
assertThrows(IllegalArgumentException.class, () -> metodo(0));
assertTimeout(Duration.ofMillis(100), () -> metodoLento());
```

**Hamcrest / AssertJ** (mais fluente):

```java
import static org.assertj.core.api.Assertions.*;

assertThat(resultado).isEqualTo(5);
assertThat(lista).containsExactly("A", "B");
assertThatThrownBy(() -> dividir(10, 0))
        .isInstanceOf(ArithmeticException.class)
        .hasMessageContaining("/ by zero");
```

---

## **Parametrizados** – **mesmo teste, vários dados**

```java
@ParameterizedTest
@ValueSource(ints = {1, 3, 5, 7})
void numeroImpar(int num) {
    assertTrue(Calculadora.isImpar(num));
}

@ParameterizedTest
@CsvSource({
    "10, 2, 5",
    "20, 4, 5",
    "6, 3, 2"
})
void divisaoCsv(int a, int b, int esperado) {
    assertEquals(esperado, a / b);
}

@ParameterizedTest
@MethodSource("gerarPares")
void somaPar(int a, int b, int soma) {
    assertEquals(soma, a + b);
}

static Stream<Arguments> gerarPares() {
    return Stream.of(
            Arguments.of(2, 3, 5),
            Arguments.of(4, 5, 9)
    );
}
```

---

## 5️⃣ **Nested** – **agrupar testes**

```java
@DisplayName("Operações matemáticas")
class CalculadoraTest {

    @Nested
    @DisplayName("Testes de soma")
    class SomaTest {
        @Test
        void positivos() { assertEquals(5, 2 + 3); }

        @Test
        void negativos() { assertEquals(-5, -2 + -3); }
    }
}
```

---

## **Mocking** – **isolamento com Mockito**

**Dependência**:

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>
```

**Exemplo**:

```java
@ExtendWith(MockitoExtension.class)   // **ativa extensão**
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserService service;

    @Test
    void deveSalvarUsuario() {
        User user = new User("ana", "ana@mail.com");
        when(repository.save(any(User.class))).thenReturn(user);

        User salvo = service.criar(user);

        assertThat(salvo.getNome()).isEqualTo("ana");
        verify(repository).save(user);
    }
}
```

---

## **Testes condicionais**

```java
@Test
@EnabledOnOs(OS.WINDOWS)
void soWindows() { ... }

@Test
@DisabledIfEnvironmentVariable(named = "CI", matches = "true")
void desabilitadoNoCI() { ... }

@EnabledIf("java.lang.Runtime.version().feature() >= 17")
void soJava17Mais() { ... }
```

---

## **Timeout** e **performance**

```java
@Test
@Timeout(value = 500, unit = TimeUnit.MILLISECONDS)
void rapido() {
    // falha se demorar > 500 ms
}
```

---

## **Integração com Spring Boot**

```java
@DataJpaTest        // **configura banco em memória**
@AutoConfigureTestDatabase(replace = Replace.ANY)
class AlunoRepositoryTest {

    @Autowired
    private AlunoRepository repository;

    @Test
    void deveSalvarAluno() {
        Aluno aluno = new Aluno("Bia", LocalDate.of(2005, 5, 15));
        Aluno salvo = repository.save(aluno);
        assertThat(salvo.getId()).isNotNull();
    }
}
```

**Teste de controller (WebMvcTest)**:

```java
@WebMvcTest(AlunoController.class)
class AlunoControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void buscarPorId() throws Exception {
        mvc.perform(get("/api/alunos/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.nome").value("Ana"));
    }
}
```

---

## **Boas práticas**

✅ **Nome descritivo** – `deveCalcularDescontoQuandoClienteVip()`  
✅ **AAA** – **Arrange, Act, Assert**  
✅ **Independente** – **não dependa de ordem** (`@TestMethodOrder` só se necessário)  
✅ **Isolado** – **mock dependências externas**  
✅ **Cobertura ≠ qualidade** – **teste comportamento, não linhas**  
✅ **Um assert por teste** (ideal) – **clareza do propósito**  

❌ **Não teste** **getters/setters** – **a menos que tenham lógica**.  
❌ **Não acesse** **banco real** – **use @DataJpaTest + banco em memória** ou **TestContainers**.  
❌ **Não deixe** **testes ignorados** (`@Disabled`) **sem justificativa**.

---

## **Resumo de 1 frase**

> **JUnit 5** **anota testes com `@Test`**, **asserta com `Assertions`** ou **AssertJ**, **parametriza com `@CsvSource`**, **isola com Mockito** e **integra com Spring Boot** (`@DataJpaTest`, `MockMvc`) – **execute com `mvn test`** ou **Gradle** para **garantir que cada unidade funciona antes da integração**.
