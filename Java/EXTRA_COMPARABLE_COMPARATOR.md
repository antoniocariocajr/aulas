# 🔁 `Comparable` vs `Comparator`

→ **como e quando ordenar objetos** com **1 interface interna** ou **várias estratégias externas**

---

## 1️⃣ `Comparable<T>` – **ordenação natural** da própria classe

- **Interface funcional** (1 método):  
  `int compareTo(T o)`  
  ➜ **< 0** this vem **antes**  
  ➜ **0** iguais  
  ➜ **> 0** this vem **depois**

- Implementa **1 vez** na classe → **lógica padrão**

```java
public class Pessoa implements Comparable<Pessoa> {
    private String nome;
    private int idade;

    @Override
    public int compareTo(Pessoa outra) {
        return Integer.compare(this.idade, outra.idade); // por idade
    }
}
```

**Uso:**

```java
List<Pessoa> lista = ...;
Collections.sort(lista);              // ordenação natural
Arrays.sort(arrayPessoas);            // igual
```

**Dica**: use `Comparator.comparingInt(...)` dentro de `compareTo` para **evitar erros de sinal**.

---

## 2️⃣ `Comparator<T>` – **estratégias externas** (múltiplas ordens)

- **Interface funcional**:  
  `int compare(T o1, T o2)`

- **Não altera** a classe original → **quantas ordens quiser**

```java
Comparator<Pessoa> porNome = (p1, p2) -> p1.getNome().compareTo(p2.getNome());

Comparator<Pessoa> porIdadeDesc = Comparator.comparingInt(Pessoa::getIdade).reversed();

Comparator<Pessoa> porNomeIdade = Comparator
        .comparing(Pessoa::getNome)
        .thenComparingInt(Pessoa::getIdade);
```

**Aplicando**:

```java
List<Pessoa> lista = ...;
lista.sort(porNome);                  // List.sort (Java 8)
Collections.sort(lista, porIdadeDesc); // ou utilitário
```

---

## Tabela comparativa rápida

| Característica | Comparable | Comparator |
| ---------------- | ------------ | ------------ |
| **Local** | dentro da classe | fora (classe separada ou lambda) |
| **Método** | `compareTo(T o)` | `compare(T o1, T o2)` |
| **Quantidade** | **1 por classe** | **quantas quiser** |
| **Chamada** | `Collections.sort(lista)` | `Collections.sort(lista, comp)` |
| **Flexibilidade** | baixa | alta (ordens diferentes) |
| **É funcional?** | sim (1 método) | sim (1 método) |

---

## Exemplos práticos

### a) Ordenação **natural** – **por salário**

```java
public class Funcionario implements Comparable<Funcionario> {
    private BigDecimal salario;
    @Override
    public int compareTo(Funcionario f) {
        return this.salario.compareTo(f.salario); // menor → maior
    }
}
```

### b) **Várias** estratégias com `Comparator`

```java
static Comparator<Funcionario> porNome      = Comparator.comparing(Funcionario::getNome);
static Comparator<Funcionario> porSalarioDesc = Comparator.comparing(Funcionario::getSalario).reversed();
static Comparator<Funcionario> porNomeSalario = porNome.thenComparing(Funcionario::getSalario);
```

**Uso**:

```java
lista.sort(porSalarioDesc);
```

### c) **Classe anônima** (antes de lambda)

```java
Collections.sort(lista, new Comparator<Pessoa>() {
    public int compare(Pessoa p1, Pessoa p2) {
        return p1.getIdade() - p2.getIdade();
    }
});
```

### d) **Lambda** (Java 8+)

```java
lista.sort((p1, p2) -> Integer.compare(p1.getIdade(), p2.getIdade()));
// ou
lista.sort(Comparator.comparingInt(Pessoa::getIdade));
```

---

## 5️⃣ Métodos úteis de `Comparator`

| Método | Exemplo |
| -------- | --------- |
| `comparing(Function<T,U> keyExtractor)` | `Comparator.comparing(Pessoa::getNome)` |
| `thenComparing(...)` | cadeia de critérios |
| `reversed()` | ordem inversa |
| `nullsFirst(comparator)` | **nulls no início** |
| `nullsLast(comparator)` | **nulls no final** |
| `naturalOrder()` | ordem **Comparable** |
| `reverseOrder()` | ordem **Comparable** invertida |

```java
Comparator<Pessoa> seguro = Comparator
        .comparing(Pessoa::getNome, String.CASE_INSENSITIVE_ORDER)
        .thenComparingInt(Pessoa::getIdade)
        .reversed();
```

---

## Ordenando **primitivos** e **Strings**

```java
int[] nums = {5, 2, 8};
Arrays.sort(nums); // já tem compareTo nativo

String[] frutas = {"banana", "abacate"};
Arrays.sort(frutas); // String implementa Comparable
```

---

## Quando **NÃO** implementar `Comparable`?

- Classe **de biblioteca** que **não pode ser alterada** → use `Comparator`.  
- Precisa de **várias ordens** → **prefira** `Comparator` **externo**.  
- Campos **podem ser null** → use `Comparator.nullsFirst/Last`.

---

## Exceção: **consistência com equals**

Regra: `a.compareTo(b) == 0` **deve implicar** `a.equals(b) == true` **se possível**.  
Senão, **coleções ordenadas** (`TreeSet`, `TreeMap`) podem **duplicar** elementos.

```java
// OK
public int compareTo(Produto p) {
    return Integer.compare(this.codigo, p.codigo); // PK única
}
```

---

## Resumo de 1 frase

> Use `Comparable` para **definir a ordenação natural** da classe e `Comparator` para **criar qualquer outra ordem (ou quando não pode alterar a classe)** – **ambos devolvem <0, 0 ou >0** e **tornam sort/stream simples**.
