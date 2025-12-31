# 🅰️ Hibernate / JPA

- **mapear objetos ↔ tabelas** sem escrever SQL

> **JPA** = **especificação** (interfaces)  
> **Hibernate** = **implementação** mais popular

---

## Dependência (Spring Boot)

**Maven**:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

**Gradle**:

```groovy
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
runtimeOnly 'org.postgresql:postgresql'
```

---

## **Entidade básica**

```java
@Entity
@Table(name = "tb_aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "data_nascimento")
    private LocalDate dataNasc;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ATIVO;

    // getters & setters (ou record/lombok)
}
```

**Convenções**:

- **Nome da tabela** = nome da classe (lower snake)  
- **Colunas** = atributos (camel → snake)  
- `@Id` **obrigatório**

---

## **Repositório** – **CRUD sem SQL**

```java
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    // **query derivada**
    List<Aluno> findByNomeContainingIgnoreCase(String nome);

    // **JPQL** (Java Persistence Query Language)
    @Query("select a from Aluno a where a.dataNasc < :data")
    List<Aluno> buscarNascidosAntesDe(@Param("data") LocalDate data);

    // **native query** (SQL puro)
    @Query(value = "SELECT * FROM tb_aluno WHERE status = 'ATIVO'", nativeQuery = true)
    List<Aluno> buscarAtivosNative();
}
```

**Uso**:

```java
@Service
public class AlunoService {

    private final AlunoRepository repo;

    public void salvar(AlunoDto dto) {
        Aluno aluno = new Aluno();
        aluno.setNome(dto.nome());
        aluno.setDataNasc(dto.dataNasc());
        repo.save(aluno);           // **INSERT ou UPDATE**
    }

    public Optional<Aluno> buscar(Long id) {
        return repo.findById(id);   // **SELECT**
    }

    public void remover(Long id) {
        repo.deleteById(id);        // **DELETE**
    }

    public Page<Aluno> listar(Pageable pageable) {
        return repo.findAll(pageable); // paginação
    }
}
```

---

## **Paginação & ordenação**

```java
Pageable pageable = PageRequest.of(0, 10, Sort.by("nome"));
Page<Aluno> pagina = repo.findAll(pageable);

System.out.println("Total: " + pagina.getTotalElements());
System.out.println("Páginas: " + pagina.getTotalPages());
pagina.getContent().forEach(System.out::println);
```

---

## **Transações** – `@Transactional`

```java
@Service
public class PedidoService {

    @Transactional              // commit/rollback automático
    public void finalizar(Long pedidoId) {
        // buscar, alterar, salvar vários objetos
    }

    @Transactional(readOnly = true)   // otimiza leitura
    public List<Pedido> buscarPendentes() { ... }
}
```

---

## **Relacionamentos**

### **@OneToMany** / **@ManyToOne**

```java
@Entity
public class Pedido {

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemPedido> itens = new ArrayList<>();
}

@Entity
public class ItemPedido {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
}
```

### **@ManyToMany**

```java
@ManyToMany
@JoinTable(name = "professor_disciplina",
           joinColumns = @JoinColumn(name = "prof_id"),
           inverseJoinColumns = @JoinColumn(name = "disc_id"))
private Set<Disciplina> disciplinas;
```

### **@OneToOne**

```java
@OneToOne
@JoinColumn(name = "endereco_id")
private Endereco endereco;
```

---

## **Herança** – **estrategias**

| Anotação | Descrição |
| ---------- | ----------- |
| `@Inheritance(strategy = InheritanceType.SINGLE_TABLE)` | **1 tabela** com discriminator (padrão) |
| `JOINED` | **tabela por classe** (normalizada) |
| `TABLE_PER_CLASS` | **tabela concreta** (union) |

```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo")
public abstract class Pagamento { ... }

@Entity
@DiscriminatorValue("PIX")
public class PagamentoPix extends Pagamento { ... }
```

---

## **Queries dinâmicas** – **Specification / Criteria API**

```java
public interface ProdutoRepository extends JpaRepository<Produto, Long>, JpaSpecificationExecutor<Produto> { }

static Specification<Produto> nomeContendo(String nome) {
    return (root, query, cb) -> cb.like(cb.upper(root.get("nome")), "%" + nome.toUpperCase() + "%");
}

static Specification<Produto> precoEntre(BigDecimal min, BigDecimal max) {
    return (root, query, cb) -> cb.between(root.get("preco"), min, max);
}

// uso
Specification<Produto> spec = nomeContendo("mouse")
        .and(precoEntre(new BigDecimal("10"), new BigDecimal("100")));

List<Produto> lista = produtoRepository.findAll(spec);
```

---

## **Lock otimista/pessimista**

### **Otimista** – `@Version`

```java
@Entity
public class Conta {
    @Version
    private int version;
}
```

### **Pessimista** – `@Lock`

```java
@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select c from Conta c where c.id = :id")
    Optional<Conta> buscarComLock(Long id);
}
```

---

## **Propriedades** – **application.yml**

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/db_exemplo
    username: postgres
    password: 123
  jpa:
    hibernate:
      ddl-auto: update        # create, create-drop, validate, none
    show-sql: true            # log SQL
    properties:
      hibernate:
        format_sql: true
        jdbc:
          batch_size: 20
logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
```

---

## **Boas práticas & dicas**

✅ **Use** `JpaRepository` – **não escreva SQL** se **puder evitar**.  
✅ **Sempre** **anote** `@Entity`, `@Id`, `@GeneratedValue`.  
✅ **Prefira** **FetchType.LAZY** – **evita N+1** (use `join fetch` ou `EntityGraph`).  
✅ **Transações** – **service layer** com `@Transactional`.  
✅ **Paginação** – **sempre** `Pageable` para **listas grandes**.  
✅ **Evite** **salvar dentro loop** – **use `saveAll()` ou batch**.  

❌ **Não use** `EntityManager` **sem necessidade** – **Spring Data já faz**.  
❌ **Não exponha entidades** na **API** – **use DTOs**.  
❌ **Evite** **herança complexa** – **prefira composição**.  

---

## **Resumo**

> **JPA/Hibernate** **mapeia classes para tabelas**, **gera SQL**, **oferece Repository com métodos mágicos**, **paginação, transações e relacionamentos** – **use anotações**, **prefira `saveAll()`**, **controle transações com `@Transactional`** e **nunca exponha entidades na API**.
