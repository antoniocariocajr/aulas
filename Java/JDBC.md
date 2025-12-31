# 🗃️ JDBC (Java Database Connectivity) – **acesso direto a banco de dados** sem frameworks

> **API padrão Java** para **conexão + SQL** em **qualquer SGBD** que tenha **driver JDBC**.

---

## Componentes principais

| Interface/Classe | Função |
| ------------------ | -------- |
| `DriverManager` | **obtem conexão** via URL |
| `Connection` | **sessão** com o banco |
| `Statement` | **SQL estático** (sem parâmetros) |
| `PreparedStatement` | **SQL com ?** → **performance + segurança** |
| `CallableStatement` | **chama procedures/functions** |
| `ResultSet` | **tabela retornada** por `SELECT` |
| `ResultSetMetaData` | **metadados** (nomes, tipos das colunas) |

---

## **Passo-a-passo básico**

1. **Adicionar driver** (Maven/Gradle)  
2. **Abrir conexão**  
3. **Criar statement**  
4. **Executar SQL**  
5. **Processar ResultSet**  
6. **Fechar recursos** (try-with-resources)

---

## Adicionando driver – **exemplo PostgreSQL**

**Maven**:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.7.2</version>
</dependency>
```

**Gradle**:

```groovy
implementation 'org.postgresql:postgresql:42.7.2'
```

**Outros drivers**:

- MySQL: `com.mysql:mysql-connector-j:8.3.0`
- H2: `com.h2database:h2:2.2.224`
- SQLite: `org.xerial:sqlite-jdbc:3.45.3.0`

---

## **Conectando** (URL + usuário + senha)

```java
String url      = "jdbc:postgresql://localhost:5432/db_exemplo";
String user     = "postgres";
String password = "123";

try (Connection conn = DriverManager.getConnection(url, user, password)) {
    System.out.println("Conectado! Versão: " + conn.getMetaData().getDatabaseProductVersion());
} catch (SQLException e) {
    throw new RuntimeException("Erro de conexão", e);
}
```

**URL comuns**:

| Banco | URL |
| ------- | ----- |
| PostgreSQL | `jdbc:postgresql://host:port/db` |
| MySQL | `jdbc:mysql://host:port/db?useSSL=false&serverTimezone=UTC` |
| H2 (memória) | `jdbc:h2:mem:testdb` |
| SQLite | `jdbc:sqlite:meu.db` |

---

## **SELECT com PreparedStatement**

```java
String sql = "SELECT id, nome, preco FROM produto WHERE preco < ?";

try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement ps = conn.prepareStatement(sql)) {

    ps.setBigDecimal(1, new BigDecimal("100.00"));

    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            long   id    = rs.getLong("id");
            String nome  = rs.getString("nome");
            BigDecimal preco = rs.getBigDecimal("preco");

            System.out.printf("%d - %s - R$ %s%n", id, nome, preco);
        }
    }
}
```

---

## **INSERT com generated keys**

```java
String sql = "INSERT INTO produto (nome, preco) VALUES (?, ?)";

try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

    ps.setString(1, "Mouse");
    ps.setBigDecimal(2, new BigDecimal("59.90"));
    int rows = ps.executeUpdate();

    if (rows == 1) {
        try (ResultSet keys = ps.getGeneratedKeys()) {
            if (keys.next()) {
                long idGerado = keys.getLong(1);
                System.out.println("ID = " + idGerado);
            }
        }
    }
}
```

---

## **UPDATE e DELETE**

```java
// UPDATE
String upd = "UPDATE produto SET preco = ? WHERE id = ?";
try (PreparedStatement ps = conn.prepareStatement(upd)) {
    ps.setBigDecimal(1, new BigDecimal("49.90"));
    ps.setLong(2, 10L);
    int linhas = ps.executeUpdate();
    System.out.println("Atualizadas: " + linhas);
}

// DELETE
String del = "DELETE FROM produto WHERE id = ?";
try (PreparedStatement ps = conn.prepareStatement(del)) {
    ps.setLong(1, 10L);
    ps.executeUpdate();
}
```

---

## **Transações** – commit/rollback

```java
try (Connection conn = DriverManager.getConnection(url, user, password)) {
    conn.setAutoCommit(false);          // inicia transação

    try (PreparedStatement ps1 = conn.prepareStatement(SQL1);
         PreparedStatement ps2 = conn.prepareStatement(SQL2)) {

        ps1.executeUpdate();
        ps2.executeUpdate();

        conn.commit();                  // **confirma**
    } catch (SQLException e) {
        conn.rollback();                // **desfaz**
        throw new RuntimeException("Transação falhou", e);
    }
}
```

---

## **Batch** – **múltiplas linhas de uma vez**

```java
String sql = "INSERT INTO item (pedido_id, produto_id, qtd) VALUES (?, ?, ?)";

try (Connection conn = DriverManager.getConnection(url, user, password);
     PreparedStatement ps = conn.prepareStatement(sql)) {

    conn.setAutoCommit(false);
    for (Item item : itens) {
        ps.setLong(1, item.getPedidoId());
        ps.setLong(2, item.getProdutoId());
        ps.setInt(3, item.getQtd());
        ps.addBatch();              // **adiciona ao lote**
    }
    ps.executeBatch();              // **envia tudo**
    conn.commit();
}
```

---

## **Metadados** – descobrir estrutura da tabela

```java
try (ResultSet rs = conn.prepareStatement("SELECT * FROM produto LIMIT 0").executeQuery()) {
    ResultSetMetaData meta = rs.getMetaData();
    int cols = meta.getColumnCount();
    for (int i = 1; i <= cols; i++) {
        System.out.printf("%s (%s)%n",
                meta.getColumnName(i),
                meta.getColumnTypeName(i));
    }
}
```

---

## **DataSource** – **conexão via pool** (ex: HikariCP)

**Maven**:

```xml
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>5.1.0</version>
</dependency>
```

**Código**:

```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:postgresql://localhost/db");
config.setUsername("postgres");
config.setPassword("123");
config.setMaximumPoolSize(10);

DataSource ds = new HikariDataSource(config);

try (Connection conn = ds.getConnection()) {
    // igual ao exemplo anterior
}
```

---

## **Boas práticas & dicas**

✅ **Sempre** **fechar** `Connection`, `Statement`, `ResultSet` – **use try-with-resources**.  
✅ **Use PreparedStatement** – **evita SQL Injection** + **performance**.  
✅ **Configure pool** (HikariCP) – **não crie Connection manualmente em produção**.  
✅ **Isola** código JDBC em **DAO/Repository** – **não espalhe SQL na lógica**.  
✅ **Trate** `SQLException` – **logue ou converta** para exceção de negócio.  

❌ **Nunca** **concatene valores** no SQL – **use `?`**.  
❌ **Não deixe** `autoCommit = true` **em transações grandes** – **controle manualmente**.

---

## **Resumo**

> **JDBC** é a **API padrão Java** que **conecta, executa SQL e devolve ResultSets** – **use `PreparedStatement`**, **controle transações** e **feche recursos com try-with-resources** para **acesso seguro e eficiente ao banco de dados**.
