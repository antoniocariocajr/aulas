# 🎭 Mockito

- **crie mocks, stubs e verificações** para **testes unitários isolados** em Java

> **Mockito** simula **comportamentos de dependências** (DAO, serviços, APIs) **sem executar o código real**, **permitindo focar na unidade sob teste**.

---

## Dependência (Maven/Gradle)

**Maven**:

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>

<!-- integração JUnit 5 -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>
```

**Gradle**:

```groovy
testImplementation 'org.mockito:mockito-core:5.11.0'
testImplementation 'org.mockito:mockito-junit-jupiter:5.11.0'
```

---

## **Anotações** – **modo moderno**

```java
@ExtendWith(MockitoExtension.class)   // ativa extensão
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserService service;   // instância real com mocks injetados

    // ...
}
```

---

## **Criando mocks manualmente**

```java
UserRepository repo = Mockito.mock(UserRepository.class);
UserService service = new UserService(repo);
```

---

## **Comportamentos** – **when() / then*()**

```java
// stub: quando chamar findById(1L) devolva Optional.of(user)
User user = new User(1L, "Ana");
when(repository.findById(1L)).thenReturn(Optional.of(user));

// stub com argumento genérico
when(repository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
```

**Lançar exceção**:

```java
when(repository.findById(999L)).thenThrow(
        new RecursoNaoEncontradoException("User 999"));
```

**Múltiplos retornos**:

```java
when(service.gerarNumero())
        .thenReturn(1L)
        .thenReturn(2L);   // 1ª chamada → 1, 2ª → 2
```

---

## **Argument Matchers** – **flexibilidade**

| Matcher | Significado |
| --------- | ------------- |
| `any()` | **qualquer objeto** |
| `anyString()` | **qualquer String** |
| `anyLong()` | **qualquer long** |
| `eq(value)` | **igual ao valor** |
| `notNull()` | **não nulo** |
| `argThat(predicate)` | **lambda predicado** |

Exemplo:

```java
when(repository.buscarPorEmail(eq("ana@mail.com"))).thenReturn(Optional.of(user));
```

**Lambda matcher**:

```java
when(repository.existePorEmail(argThat(email -> email.endsWith("@mail.com"))))
        .thenReturn(true);
```

---

## **Verificações** – **verify()**

**Confere se método foi chamado** (com quantidade/argumentos):

```java
verify(repository).save(user);              // 1× (padrão)
verify(repository, times(1)).save(user);     // explicitamente 1
verify(repository, never()).delete(any());   // nunca chamado
verify(repository, atMost(2)).findAll();     // no máximo 2
verify(repository, timeout(100)).save(any()); // chamado dentro de 100 ms
```

**Argument captor** – **pegue valor passado**

```java
@Captor
private ArgumentCaptor<User> userCaptor;

@Test
void aoSalvarCapturaUsuario() {
    service.criar("Bob", "bob@mail.com");

    verify(repository).save(userCaptor.capture());
    User salvo = userCaptor.getValue();
    assertThat(salvo.getNome()).isEqualTo("Bob");
}
```

---

## **Spy** – **mock parcial** (métodos reais + stubs)

```java
UserService spyService = Mockito.spy(userService);

// stub apenas um método
doReturn(Optional.of(user)).when(spyService).buscar(1L);

// outros métodos executam código real
spyService.processar(1L);   // código real
```

**Cuidado**: **não use `@InjectMocks` com spy** – **crie manualmente**.

---

## **InOrder** – **verificar ordem de chamadas**

```java
InOrder inOrder = inOrder(repo1, repo2);
inOrder.verify(repo1).save(any());
inOrder.verify(repo2).flush();
```

---

## **Mockito + Spring Boot** – **@MockBean**

```java
@WebMvcTest(UsuarioController.class)
class UsuarioControllerTest {

    @MockBean
    private UsuarioService service;

    @Autowired
    private MockMvc mvc;

    @Test
    void buscarPorId() throws Exception {
        when(service.buscar(1L)).thenReturn(new UsuarioDto(1L, "Ana"));

        mvc.perform(get("/api/usuarios/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.nome").value("Ana"));

        verify(service).buscar(1L);
    }
}
```

---

## **Boas práticas & dicas**

✅ **Nomeie** **mocks claramente** – `userRepositoryMock`.  
✅ **Use** `@Mock` + `@InjectMocks`** – **menos código**.  
✅ **Verifique** **comportamento** (`verify`) **apenas quando** **side-effect** é importante.  
✅ **Prefira** **stub** (`when`) **a** `doReturn` **quando possível**.  
✅ **Não mock** **valores/objetos simples** – **crie instância real**.  

❌ **Não mock** **classe em teste** – **teste código real**.  
❌ **Não use** `any()` **em métodos sobrecarregados** – **prefira `any(Tipo.class)`**.  
❌ **Não deixe** **mocks não utilizados** – **use `Mockito.validateMockitoUsage()`** ou **anotação**.

---

## **BDD estilo** – **Given When Then** (BDDMockito)

```java
import static org.mockito.BDDMockito.*;

// Given
given(repository.findById(1L)).willReturn(Optional.of(user));

// When
Optional<User> encontrado = service.buscar(1L);

// Then
assertThat(encontrado).isPresent();
then(repository).should().findById(1L);
```

---

## **Resumo**

> **Mockito** **cria mocks** (`@Mock`) **e define comportamentos** (`when(...).thenReturn(...)`) **ou verifica chamadas** (`verify(...)`) **para isolar a unidade sob teste** – **use com JUnit 5** e **nunca mock a classe que está testando**.
