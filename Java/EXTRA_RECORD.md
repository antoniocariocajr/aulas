# 📦 Record

> **Classe de dados imutáveis** com **sintaxe ultra-curta**: **automático** `equals`, `hashCode`, `toString`, **construtor compacto**, **desconstrução** em `switch`.

---

## O que é um `record`?

- **Classe imutável** que **agrupa dados** (data carrier).  
- **Campos são `final`** – **não pode ser alterado** após criado.  
- **Compilador gera**:  
  - **construtor canônico** (todos os campos)  
  - **getters** (sem prefixo `get` – `nome()`)  
  - `equals`, `hashCode`, `toString` **baseados nos campos**  
  - **classe final** + **campos private final**  

**Sintaxe**:

```java
public record Pessoa(String nome, int idade) { }
```

**Uso**:

```java
Pessoa p = new Pessoa("Ana", 25);
System.out.println(p.nome()); // Ana
System.out.println(p);        // Pessoa[nome=Ana, idade=25]
```

---

## Por que usar? – **vantagens**

- **Código enxuto** – **não precisa escrever** POJO.  
- **Imutabilidade** – **thread-safe**.  
- **Equals por valor** – `new Pessoa("Ana",25).equals(outra)` **true** se dados iguais.  
- **Leitura clara** – **intenção explícita**: **só transporta dados**.

---

## Construtor compacto (validações)

```java
public record Cpf(String valor) {
    public Cpf {                                  // **sem parênteses**
        if (!valor.matches("\\d{11}")) {
            throw new IllegalArgumentException("CPF inválido");
        }
    }
}
```

- **É executado DEPOOS** que os parâmetros já foram **atribuídos** aos campos.  
- **Não declara lista de parâmetros** – usa **campos implícitos**.

---

## Métodos adicionais (pode colocar)

```java
public record Produto(String codigo, BigDecimal preco) {
    public BigDecimal precoComDesconto(double pct) {
        return preco.multiply(BigDecimal.valueOf(1 - pct));
    }

    public static Produto barato() {          // método estático
        return new Produto("000", BigDecimal.ONE);
    }
}
```

---

## Implementando interfaces

```java
public record Point(int x, int y) implements Comparable<Point> {
    @Override
    public int compareTo(Point p) {
        return Integer.compare(this.x, p.x);
    }
}
```

**NÃO pode estender classe** – **record é implicitamente final**.

---

## Record vs Classe tradicional

| Característica | Record | Classe normal |
| ---------------- | -------- | --------------- |
| **Campos** | `private final` gerados | você declara |
| **Getters** | `nome()` | você escreve (`getNome()`) |
| `equals/hashCode/toString` | **automáticos** | você ou IDE |
| **Imutável** | **sim** | opcional |
| **Estende** | **nenhuma** (final impl.) | pode estender |
| **Construtor** | canônico + compacto | você escreve |
| **Anulação de campos** | **não** – **todos no cabeçalho** | livre |

---

## Desconstrução (pattern matching) – **Java 21+**

```java
static String classificar(Object obj) {
    return switch (obj) {
        case Point(var x, var y) when x == y -> "Diagonal";
        case Point(var x, var y)             -> "Qualquer ponto";
        default                              -> "Outro";
    };
}
```

**Campos são extraídos** direto no `switch`.

---

## Exemplo real – **DTO de API**

```java
public record EnderecoDTO(
        String logradouro,
        String numero,
        String bairro,
        String cidade,
        String uf,
        String cep) { }

// Controlador
@GetMapping("/{id}/endereco")
public EnderecoDTO endereco(@PathVariable Long id) {
    Endereco entidade = service.buscar(id);
    return new EnderecoDTO(
            entidade.getLogradouro(),
            entidade.getNumero(),
            ...
    );
}
```

**Jackson** serializa **automaticamente**:

```json
{
  "logradouro": "Rua Java",
  "numero": "100",
  ...
}
```

---

## Dicas & boas práticas

1. **Use record** quando **objeto é só dados** – **não comportamento complexo**.  
2. **Campos complexos** (List, Map) **devem ser imutáveis também**:  
   `List<String> tags` → **guarde** `List.copyOf(tags)` **no construtor**.  
3. **Não anule** `equals/hashCode/toString` – **a menos que tenha BOM motivo**.  
4. **Adicione** `@Override` em **métodos especiais** se **quiser versão customizada**.  
5. **Record é serializável** – mas **campos mutáveis dentro** **quebram imutabilidade**.

---

## Resumo

> `record` é **classe imutável compacta** que **gera automaticamente construtor, getters, equals, hashCode e toString** – **use para transportar dados** (DTOs, tuplas, POJOs) **sem escrever código boilerplate**.
