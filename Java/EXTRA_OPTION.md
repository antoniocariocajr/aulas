# 🔍 **Classe Optional**

> **Objetivo**: representar **a presença ou ausência** de um valor **sem usar null** → **evita** `NullPointerException` e **torna o código mais expressivo**.

---

## Por que Optional?

```java
// SEM Optional – clássico null-check
if (usuario != null) {
    Endereco e = usuario.getEndereco();
    if (e != null && e.getCep() != null) {
        System.out.println(e.getCep());
    }
}

// COM Optional – encadeamento funcional
usuarioOpt.flatMap(User::getEnderecoOpt)
          .map(Endereco::getCep)
          .ifPresent(System.out::println);
```

---

## Criando instâncias

| Fábrica | Descrição | Exemplo |
| --------- | ----------- | --------- |
| `Optional.of(T value)` | **valor NÃO nulo** (senão NPE) | `Optional.of("Java")` |
| `Optional.ofNullable(T value)` | aceita **null** → vira `Optional.empty()` | `Optional.ofNullable(busca())` |
| `Optional.empty()` | **ausência** | `Optional.empty()` |

---

## Verificando presença

| Método | Retorno | Uso |
| -------- | --------- | ----- |
| `boolean isPresent()` | true se há valor | `if (opt.isPresent()) ...` |
| `boolean isEmpty()` | true se **vazio** (Java 11+) | `if (opt.isEmpty()) ...` |
| `void ifPresent(Consumer<? super T> action)` | executa só se existir | `opt.ifPresent(System.out::println)` |
| `void ifPresentOrElse(Consumer<T>, Runnable)` | **Java 9** – ação ou else | |

---

## Recuperando valores

| Método | Descrição | Quando ausente |
| -------- | ----------- | ---------------- |
| `T get()` | **valor** | lança `NoSuchElementException` |
| `T orElse(T other)` | valor ou **outro** | devolve `other` |
| `T orElseGet(Supplier<? extends T> supplier)` | valor ou **fornecido** | devolve `supplier.get()` |
| `T orElseThrow(Supplier<? extends X> ex)` | valor ou **exceção** | lança `ex.get()` |

```java
String nome = buscarNomeOpt().orElse("Sem nome");
BigDecimal preco = buscarPrecoOpt()
                     .orElseGet(() -> getPrecoPadrao());
Usuario u = usuarioOpt.orElseThrow(
                () -> new UsuarioNaoEncontradoException());
```

---

## Transformação funcional

| Método | Assinatura | Efeito |
| -------- | ------------ | -------- |
| `Optional<U> map(Function<T,U> mapper)` | **valor → novo valor** | se **vazio** continua vazio |
| `Optional<U> flatMap(Function<T,Optional<U>> mapper)` | **valor → Optional** | evita `Optional<Optional<U>>` |
| `Optional<T> filter(Predicate<? super T> predicate)` | **mantém ou vira empty** | |

Exemplo completo:

```java
Optional<Usuario> userOpt = repo.findById(1L);
Optional<String> cepOpt = userOpt
        .flatMap(Usuario::getEnderecoOpt)   // Optional<Endereco>
        .map(Endereco::getCep)              // Optional<String>
        .filter(c -> c.startsWith("013"));  // só CEPs de SP
cepOpt.ifPresent(System.out::println);
```

---

## Streams & Optional

**Java 8** – `Optional` **não é `Stream`**, mas possui método `stream()`:

```java
List<String> lista = userOpt.stream()   // 0 ou 1 elemento
                            .map(Usuario::getNome)
                            .collect(Collectors.toList());
```

---

## Exemplos práticos

### a) Retornando Optional em DAO

```java
public Optional<Produto> findByCodigo(long cod) {
    return Optional.ofNullable(
            em.find(Produto.class, cod)); // pode vir null
}
```

### b) Calcula desconto só se produto existir

```java
BigDecimal precoFinal = produtoOpt
        .map(p -> p.getPreco().multiply(BigDecimal.valueOf(0.9)))
        .orElse(BigDecimal.ZERO);
```

### c) Validação com filter

```java
Optional<Integer> idadeOpt = Optional.of(idade);
boolean maior = idadeOpt.filter(i -> i >= 18).isPresent();
```

---

## **NÃO** use Optional para

- **Campos de entidade** – prefira **null** ou **objeto vazio**; serialização pode falhar.  
- **Parâmetros de método** – deixa o **código verboso**; use **sobrecarga** ou **null com @Nullable**.  
- **Retornos obrigatórios** – se **sempre há valor**, retorne **T** direto.

---

## Métodos adicionais (Java 9+)

| Método | Descrição |
| -------- | ----------- |
| `Optional<T> or(Supplier<Optional<T>> supplier)` | **outro Optional** se vazio |
| `Stream<T> stream()` | 0 ou 1 elemento → Stream |
| `T orElseThrow()` | igual a `get()` mas nome mais claro |
| `ifPresentOrElse(action, emptyAction)` | executa ação ou **else** |

---

## Performance & overhead

- **Wrapper leve** (1 referência + 1 campo `value`).  
- **Custo semelhante a null-check**, mas **evita NPE**.  
- **Não aloca** se já houver referência – **use sem medo** em **retornos de API**.

---

## Resumo de 1 frase

> `Optional` é um **recipiente que pode ou não conter um valor não-nulo** – **use-o como retorno** para **evitar NPE** e **deixe o código mais funcional e claro**, mas **nunca o utilize como campo ou parâmetro obrigatório**.
