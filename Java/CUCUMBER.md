# 🥒 Cucumber (BDD)

- **escreva cenários em linguagem natural** e **execute como testes automatizados** em Java

> **BDD = Behavior Driven Development**  
> **Cucumber** lê arquivos `.feature` (Gherkin) e **vincula** frases a **código Java** (step definitions).

---

## Dependências (Maven)

```xml
<!-- Cucumber + JUnit 5 -->
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>7.17.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit-platform-engine</artifactId>
    <version>7.17.0</version>
    <scope>test</scope>
</dependency>
<!-- opcional: assertions fluentes -->
<dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.26.0</version>
    <scope>test</scope>
</dependency>
```

**Gradle**:

```groovy
testImplementation 'io.cucumber:cucumber-java:7.17.0'
testImplementation 'io.cucumber:cucumber-junit-platform-engine:7.17.0'
testImplementation 'org.assertj:assertj-core:3.26.0'
```

---

## Estrutura de diretório (convenção)

```BASH
src/test/resources
└── features
    └── calculadora.feature
src/test/java
   └── com/example/calc
       ├── RunCucumberTest.java   // config
       └── steps
           └── CalculadoraSteps.java
```

---

## Arquivo `.feature` (Gherkin)

```gherkin
# language: pt                    # opcional - português
Funcionalidade: Soma de inteiros
  Como usuário da calculadora
  Quero somar dois números
  Para obter o resultado correto

  Cenário: Soma de números positivos
    Dado que eu informei os valores 5 e 3
    Quando eu solicitar a soma
    Então o resultado deve ser 8
```

**Palavras-chave**:  
`Funcionalidade`, `Cenário`, `Esquema do Cenário`, `Dado`, `Quando`, `Então`, `E`, `Mas`, `Exemplos`

---

## **Classe de configuração / runner**

```java
@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")   // pasta raiz .feature
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "com.example.calc.steps")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME, value = "pretty, html:target/cucumber-report.html")
public class RunCucumberTest {
}
```

**Rodar**:

```bash
mvn test                 # Maven
gradle test              # Gradle
# ou pela IDE (JUnit 5 engine)
```

**Relatório HTML**:  
`target/cucumber-report.html`

---

## **Step Definitions** – **ligar frases ao código**

```java
package com.example.calc.steps;

import static org.assertj.core.api.Assertions.*;

public class CalculadoraSteps {

    private int valorA;
    private int valorB;
    private int resultado;

    @Dado("que eu informei os valores {int} e {int}")
    void que_eu_informei_os_valores(int a, int b) {
        valorA = a;
        valorB = b;
    }

    @Quando("eu solicitar a soma")
    void eu_solicitar_a_soma() {
        resultado = valorA + valorB;   // chamada real
    }

    @Então("o resultado deve ser {int}")
    void o_resultado_deve_ser(int esperado) {
        assertThat(resultado).isEqualTo(esperado);
    }
}
```

**Parâmetros**:

- `{int}`, `{double}`, `{word}`, `{string}` → **converte automaticamente**
- **Expressões regulares** também funcionam:
  `@Given("^que eu informei os valores (\\d+) e (\\d+)$")`

---

## **Esquema do Cenário** – **teste parametrizado**

```gherkin
Esquema do Cenário: Soma de vários pares
  Dado que eu informei os valores <a> e <b>
  Quando eu solicitar a soma
  Então o resultado deve ser <soma>

  Exemplos:
    | a  | b  | soma |
    | 10 | 5  | 15   |
    | -2 | 7  | 5    |
    | 0  | 0  | 0    |
```

**Mesmos steps** – **Cucumber substitui placeholders**.

---

## **Hooks** – **executar código antes/depois**

```java
public class Hooks {

    @Before             // antes de CADA cenário
    public void setup() {
        System.out.println("Iniciou cenário");
    }

    @After              // depois de CADA cenário
    public void tearDown() {
        System.out.println("Finalizou cenário");
    }

    @BeforeStep         // antes de CADA step (opcional)
    public void beforeStep() { }

    @AfterStep
    public void afterStep() { }
}
```

---

## **Contexto compartilhado** – **objetos entre steps**

```java
public class ScenarioContext {
    private final Map<String, Object> map = new HashMap<>();

    public void set(String chave, Object valor) { map.put(chave, valor); }
    public <T> T get(String chave) { return (T) map.get(chave); }
}

public class StepsBase {

    protected ScenarioContext context = new ScenarioContext();

    @Before
    public void before() {
        context = new ScenarioContext(); // limpa a cada cenário
    }
}
```

**Uso**:

```java
@Dado("que eu criei o usuário")
public void criarUsuario() {
    Usuario u = new Usuario("Ana");
    context.set("user", u);
}

@Quando("eu consulto o usuário")
public void consultar() {
    Usuario u = context.get("user");
    // ...
}
```

---

## **Tags** – **executar subconjuntos**

```gherkin
@smoke
Funcionalidade: Login
  ...
```

**Rodar só smoke**:

```bash
mvn test -Dcucumber.filter.tags=@smoke
```

**Na classe runner**:

```java
@ConfigurationParameter(key = FILTER_TAGS_PROPERTY_NAME, value = "@smoke")
```

---

## **Integração com Spring Boot**

**Dependência extra**:

```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-spring</artifactId>
    <version>7.17.0</version>
    <scope>test</scope>
</dependency>
```

**Config**:

```java
@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CucumberSpringConfig {
}
```

**Step com `@Autowired`**:

```java
public class UserSteps {

    @Autowired
    private UserRepository repository;

    @Autowired
    private MockMvc mockMvc; // ou TestRestTemplate / WebTestClient

    @When("eu envio POST para /users com:")
    public void envioPost(String json) throws Exception {
        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated());
    }
}
```

---

## **Boas práticas & dicas**

✅ **Escreva cenários** **legíveis para negócio** – **sem técnico**.  
✅ **Reutilize** **steps** – **não duplique frases**.  
✅ **Um cenário = um comportamento único**.  
✅ **Combine** **DataTable** ou **DocString** para **dados grandes**:

```gherkin
Dado os seguintes usuários:
  | nome | email       |
  | Ana  | ana@mail.com |
  | Bob  | bob@mail.com |
```

✅ **Use** **background** para **passos comuns**:

```gherkin
Contexto:
  Dado que o sistema possui produtos cadastrados
```

❌ **Não coloque** **elementos UI** (botão, campo) – **use conceito** (quando "submeter pedido").  
❌ **Não escreva** **scripts de teste** – **escreva comportamentos**.

---

## **Resumo**

> **Cucumber** **liga frases em inglês/português (Gherkin)** **a métodos Java (steps)** – **escreva cenários legíveis**, **parametrize com `Exemplos`**, **reutilize steps** e **execute com JUnit 5** para **testar comportamentos, não código**.
