# 🧱 Imutabilidade

> Objetivo: entender **o que é** um objeto imutável, **como construir**, **onde aplicar** e **por que isso melhora** seu código.

---

## O que é **Imutabilidade**?

**Imutável** = **estado não muda após criação**.  
Qualquer operação que **pareça** mudar o objeto **devolve um NOVO objeto** com o novo estado (ex: `String`, `BigDecimal`, `LocalDate`).

**Vantagens:**

- Thread-safe (sem lock)  
- Pode ser compartilhado sem cópias  
- Chave segura em Map/Set  
- Menos bugs (surpresa de estado)  
- Facilita raciocínio funcional

---

## Regras para **objeto imutável** (checklist)

| Regra | Implementação |
| ------- | --------------- |
| 1. Classe `final` | impede herança que quebre regras |
| 2. Campos `private final` | não podem ser reassinados |
| 3. **Sem setters** | não oferece mudança |
| 4. **Não expor** estruturas mutáveis | devolver cópia ou wrapper imutável |
| 5. **Construtor inicializa tudo** | validações no construtor |
| 6. **Getters** só leitura | ou devolvem novos objetos |
| 7. **Métodos** não alteram estado | ou devolvem nova instância |

Exemplo **correto**:

```java
public final class Endereco {
    private final String rua;
    private final String cidade;
    private final List<String> tags;        // mutável!

    public Endereco(String rua, String cidade, List<String> tags) {
        this.rua = rua;
        this.cidade = cidade;
        this.tags = List.copyOf(tags);      // cópia defensiva
    }
    public String rua() { return rua; }
    public String cidade() { return cidade; }
    public List<String> tags() { return tags; } // List.of = imutável
}
```

---

## Palavra-chave `final` – **"não pode mudar"**

| Contexto | Significado |
| ---------- | ------------- |
| **variável** | **atribuição única** |
| **método** | **não pode ser sobrescrito** |
| **classe** | **não pode ser estendida** |
| **campo** | **obriga inicialização até fim do construtor** |

**Importante**: `final` **NÃO garante** imutabilidade do **conteúdo** da variável – **garante apenas a referência**.

```java
final List<String> lista = new ArrayList<>();
lista.add("Java");     // ✅ objeto MUDA
lista = new ArrayList<>(); // ❌ compilação – referência final
```

---

## Palavra-chave `static` – **pertence à classe**

- **1 cópia** para **toda aplicação**.  
- **Vida útil** = **vida da classe** (até JVM descarregar).  
- **Acesso sem instância**.

```java
public class Config {
    static int contador = 0;          // compartilhado
    static { /* bloco executado 1× */ }
}
```

**Relação com imutabilidade**:

- `static` **permite** criar **constantes globais**.  
- `static final` **combina** os dois efeitos: **única** e **inalterável**.

---

## `static final` – **constante global imutável**

| Uso | Convenção Java | Exemplo |
| ----- | ---------------- | --------- |
| **primitivo** | `MAIUSCULA_SNAKE` | `static final int MAX = 100;` |
| **String** | `MAIUSCULA` | `static final String APP = "Financeiro";` |
| **objeto imutável** | `MAIUSCULA` | `static final List<String> TAGS = List.of("A", "B");` |

**Atenção**: objeto **por dentro** deve ser **imutável também**:

```java
// ERRADO – interno mutável
public static final List<Produto> PRODUTOS = new ArrayList<>();

// CERTO – imutável
public static final List<Produto> PRODUTOS = List.copyOf(carregar());
```

---

## Imutabilidade **profunda** vs **rasa**

- **Rasa (shallow)**: referência não muda, mas **objeto interno sim**.  
- **Profunda (deep)**: **objeto e todos os objetos que ele alcança** são imutáveis.

Exemplo **profunda**:

```java
public final class NotaFiscal {
    private final String numero;
    private final List<ItemNota> itens;   // itens também imutáveis

    public NotaFiscal(String numero, List<ItemNota> itens) {
        this.numero = numero;
        this.itens = List.copyOf(itens);  // cópia + ItemNota imutável
    }
    public List<ItemNota> itens() { return itens; } // já é imutável
}
```

---

## Boas práticas & **quando** usar

✅ **Use imutabilidade**:

- **Entidades de valor** (dinheiro, endereço, data)  
- **Chaves de Map**  
- **Parâmetros de métodos** compartilhados  
- **Respostas de API** (DTOs)  
- **Cache / constantes**

❌ **Evite**:

- **Objetos grandes** que mudam com frequência (performance)  
- **Entidades JPA** com `@Entity` (precisam de setters para ORM) – **use DTOs imutáveis** para retorno.

---

## Ferramentas que **ajudam**

- **Record** (Java 14+) – **classe imutável** com **sintaxe curta**:

```java
public record Endereco(String rua, String cidade) { }
```

- **Lombok** (`@Value`) – **gera** `final`, `private`, `getters`, `equals`, `hashCode`, `toString`.

- **Google AutoValue / Immutables** – **geração** de **objetos imutáveis**.

---

## Exemplo completo – **classe imutável + static final constantes**

```java
public final class Configuracao {
    public static final String VERSAO = "1.0.0";
    public static final int    LIMITE_TENTATIVAS = 3;
    public static final BigDecimal TAXA_JUROS = new BigDecimal("0.05");

    private final LocalDate dataCriacao;
    private final String    idioma;

    public Configuracao(LocalDate dataCriacao, String idioma) {
        this.dataCriacao = Objects.requireNonNull(dataCriacao);
        this.idioma      = Objects.requireNonNull(idioma);
    }

    public LocalDate getDataCriacao() { return dataCriacao; }
    public String    getIdioma()      { return idioma; }

    public Configuracao comIdioma(String novoIdioma) {
        return new Configuracao(this.dataCriacao, novoIdioma); // novo objeto
    }
}
```

---

## Resumo

> **Imutabilidade** é **garantir que o estado de um objeto nunca mude após criado** – **use `final` para referências, `static final` para constantes globais**, **proteja campos internos** e **prefera records ou construtores que devolvam novos objetos** para **código mais seguro, thread-safe e limpo**.
