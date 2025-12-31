# 🗃️ DAO (Data Access Object)

> **Padrão DAO** isola **todo acesso a dados** (SQL, NoSQL, arquivo, API) **em uma classe/objeto específico**, deixando a **lógica de negócio** desacoplada da **fonte de dados**.

---

## Objetivos do DAO

- **Separar** regras de negócio ↔ persistência  
- **Facilitar** mudança de tecnologia (JDBC → JPA → Mongo)  
- **Centralizar** queries e **reutilizar** código  
- **Facilitar testes** (mock DAO)

---

## Estrutura típica

```bash
model (entidade)
  ↕
dao (interface + implementação)
  ↕
database (JDBC, JPA, etc.)
```

---

## Entidade simples

```java
public record Produto(Long id, String nome, BigDecimal preco) { }
```

---

## Interface DAO (contrato)

```java
public interface ProdutoDAO {
    Optional<Produto> buscarPorId(Long id);
    List<Produto> buscarTodos();
    void inserir(Produto p);
    void atualizar(Produto p);
    void deletar(Long id);
}
```

---

## Implementação JDBC – **sem JPA**

```java
public class ProdutoDAOJDBC implements ProdutoDAO {

    private Connection conn;

    public ProdutoDAOJDBC(Connection conn) { this.conn = conn; }

    @Override
    public Optional<Produto> buscarPorId(Long id) {
        String sql = "SELECT id, nome, preco FROM produto WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Produto p = new Produto(rs.getLong("id"),
                                        rs.getString("nome"),
                                        rs.getBigDecimal("preco"));
                return Optional.of(p);
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar", e);
        }
    }

    @Override
    public List<Produto> buscarTodos() {
        String sql = "SELECT * FROM produto";
        List<Produto> lista = new ArrayList<>();
        try (Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next()) {
                lista.add(new Produto(rs.getLong(1),
                                      rs.getString(2),
                                      rs.getBigDecimal(3)));
            }
            return lista;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void inserir(Produto p) {
        String sql = "INSERT INTO produto (nome, preco) VALUES (?, ?)";
        try (PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, p.nome());
            ps.setBigDecimal(2, p.preco());
            ps.executeUpdate();
            ResultSet keys = ps.getGeneratedKeys();
            if (keys.next()) {
                Long idGerado = keys.getLong(1);
                // retornar Produto com id se desejar
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void atualizar(Produto p) {
        String sql = "UPDATE produto SET nome = ?, preco = ? WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, p.nome());
            ps.setBigDecimal(2, p.preco());
            ps.setLong(3, p.id());
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deletar(Long id) {
        String sql = "DELETE FROM produto WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
```

---

## Usando o DAO (service/controller)

```java
public class ProdutoService {
    private final ProdutoDAO dao;

    public ProdutoService(ProdutoDAO dao) { this.dao = dao; }

    public Optional<Produto> buscar(Long id) {
        return dao.buscarPorId(id);
    }

    public void cadastrar(String nome, BigDecimal preco) {
        if (preco.signum() < 0) throw new IllegalArgumentException("Preço negativo");
        Produto p = new Produto(null, nome, preco);
        dao.inserir(p);
    }
}
```

**Injeção**:

```java
Connection conn = DataSourceFactory.getConnection();
ProdutoDAO dao = new ProdutoDAOJDBC(conn);
ProdutoService service = new ProdutoService(dao);
```

---

## DAO genérico (base para todas entidades)

```java
public interface DAO<T, K> {
    Optional<T> findById(K id);
    List<T> findAll();
    void save(T t);
    void update(T t);
    void delete(K id);
}
```

Implementação **abstrata** com **Spring JDBC** ou **JPA**.

---

## 8️⃣ DAO com **JPA (Spring Data)** – **1 linha**

```java
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByNomeContainingIgnoreCase(String nome);
    List<Produto> findByPrecoLessThan(BigDecimal preco);
}
```

**Spring** **gera** a implementação **em tempo de execução** – **padrão DAO** **automático**.

---

## Testando com **mock** (sem banco)

```java
public class ProdutoDAOMock implements ProdutoDAO {
    private final Map<Long, Produto> db = new HashMap<>();
    private AtomicLong idGen = new AtomicLong(1);

    @Override public Optional<Produto> buscarPorId(Long id) {
        return Optional.ofNullable(db.get(id));
    }
    @Override public List<Produto> buscarTodos() {
        return List.copyOf(db.values());
    }
    @Override public void inserir(Produto p) {
        long id = idGen.getAndIncrement();
        db.put(id, new Produto(id, p.nome(), p.preco()));
    }
    // ... demais métodos
}
```

**Teste unitário**:

```java
@Test
void deveCadastrarProduto() {
    ProdutoDAO dao = new ProdutoDAOMock();
    ProdutoService service = new ProdutoService(dao);
    service.cadastrar("Mouse", new BigDecimal("50.00"));
    assertEquals(1, dao.buscarTodos().size());
}
```

---

## Boas práticas & dicas

1. **Interface primeiro** – **desacopla** service do banco.  
2. **Nunca exponha** `SQLException` **para cima** – **lance exceção de negócio**.  
3. **Feche** `Connection`, `Statement`, `ResultSet` **com try-with-resources**.  
4. **Use connection pool** (HikariCP, Spring, Jakarta).  
5. **Não faça SQL** **no controller** – **mantenha no DAO**.  
6. **Paginação** – **aceite limite/offset** ou **Pageable** (Spring).  
7. **Transações** – **delegue para service** (`@Transactional` Spring) ou **controle manual**.  
8. **Evite aninhamento** – **extraia métodos privados** dentro do DAO.

---

## Resumo

> **DAO** é o **padrão que isola todo acesso a dados** (SQL, NoSQL, APIs) **numa camada própria**, **devolvendo Optional/List** e **permitindo trocar a tecnologia sem tocar na lógica de negócio**.
