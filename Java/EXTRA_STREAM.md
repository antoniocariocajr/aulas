# 🌊 Stream API

> **Stream** é uma **sequência de elementos** que **não armazena dados** e **suporta operações funcionais** (map, filter, reduce) de forma **lazy** (preguiçosa) e **paralela**.

---

## Obtendo um Stream

| Fonte | Forma |
| ------- | ------- |
| Coleção | `list.stream()` |
| Array | `Arrays.stream(array)` ou `Stream.of(...)` |
| Valores isolados | `Stream.of(1,2,3)` |
| Intervalo numérico | `IntStream.range(1, 10)` |
| Gerador | `Stream.generate(() -> "A")` |
| IO / linhas | `Files.lines(path)` |

Exemplo:

```java
List<String> nomes = List.of("Ana", "Bruno", "Carlos");
Stream<String> stream = nomes.stream();
```

---

## Pipeline: 2 tipos de operações

1. **Intermediárias** (lazy) – devolvem **novo Stream**  
   `filter`, `map`, `flatMap`, `distinct`, `sorted`, `limit`, `skip`, `peek`...

2. **Finais** (eager) – **fecham** o stream e **produzem resultado**  
   `forEach`, `collect`, `reduce`, `count`, `anyMatch`, `allMatch`, `noneMatch`, `findFirst`, `findAny`, `min`, `max`, `sum`...

---

## Passo-a-passo básico

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);

List<Integer> resultado =
        nums.stream()               // fonte
            .filter(n -> n % 2 == 0) // intermediária
            .map(n -> n * 10)        // intermediária
            .collect(Collectors.toList()); // final
// [20, 40, 60]
```

---

## Filter + Map + Collect

```java
List<Produto> produtos = dao.todos();

List<String> nomesPromo =
        produtos.stream()
                .filter(p -> p.getPreco() < 100)
                .map(Produto::getNome)
                .collect(Collectors.toList());
```

---

## Reduce – agregação

```java
int soma = IntStream.range(1, 6)   // 1..5
                    .reduce(0, (a, b) -> a + b); // 15

OptionalInt max = nums.stream()
                      .mapToInt(Integer::intValue)
                      .reduce(Integer::max);
```

---

## Match & Find

```java
boolean temPar = nums.stream().anyMatch(n -> n % 2 == 0);
boolean todosMaioresQueZero = nums.stream().allMatch(n -> n > 0);
Optional<Integer> primeiro = nums.stream().filter(n -> n > 3).findFirst();
```

---

## Ordenação & Distintos

```java
List<String> lista = List.of("Banana", "Abacate", "Banana");

List<String> unicosOrdenados =
        lista.stream()
             .distinct()
             .sorted()
             .collect(Collectors.toList());
// [Abacate, Banana]
```

**Sort reverso**:

```java
.sorted(Comparator.reverseOrder())
```

---

## FlatMap – "achata" streams de coleções

```java
List<List<Integer>> matriz = List.of(
        List.of(1, 2),
        List.of(3, 4)
);

List<Integer> plano =
        matriz.stream()
              .flatMap(List::stream)
              .collect(Collectors.toList());
// [1, 2, 3, 4]
```

**Palavras de frases**:

```java
List<String> linhas = Files.readAllLines(path);
List<String> palavras =
        linhas.stream()
              .flatMap(l -> Arrays.stream(l.split("\\s+")))
              .collect(Collectors.toList());
```

---

## Collectors úteis

| Finalizador | Resultado |
| ------------- | ----------- |
| `Collectors.toList()` | `List<T>` |
| `Collectors.toSet()` | `Set<T>` |
| `Collectors.toMap(k, v)` | `Map<K,V>` |
| `Collectors.joining(", ")` | String concatenada |
| `Collectors.counting()` | quantidade |
| `Collectors.summingInt(ToIntFunction)` | soma |
| `Collectors.averagingDouble(...)` | média |
| `Collectors.groupingBy(classifier)` | `Map<K,List<T>>` |
| `Collectors.partitioningBy(predicate)` | `Map<Boolean,List<T>>` |

Exemplo **grouping**:

```java
Map<String, List<Produto>> porCategoria =
        produtos.stream()
                .collect(Collectors.groupingBy(Produto::getCategoria));
```

**Particionando**:

```java
Map<Boolean, List<Produto>> baratosCaros =
        produtos.stream()
                .collect(Collectors.partitioningBy(p -> p.getPreco() < 100));
```

---

## Streams numéricos especializados

| Stream | Range | Métodos úteis |
| -------- | ------- | --------------- |
| `IntStream` | `range(0, 10)` **exclusive** | `sum()`, `average()`, `max()`... |
| `LongStream` | `rangeClosed(1, 1_000_000)` **inclusive** | |
| `DoubleStream` | `of(1.2, 3.4)` | |

Exemplo:

```java
int somaDosPares = IntStream.rangeClosed(1, 100)
                            .filter(i -> i % 2 == 0)
                            .sum(); // 2550
```

---

## 1️⃣1️⃣ Paralelo fácil

```java
long contagem = produtos.parallelStream()
                        .filter(p -> p.getPreco() > 1000)
                        .count();
```

**Cuidado**: **apenas** se **base grande** e **operação custosa**; **pode ser mais lento** para poucos elementos.

---

## Bom & ruim – **nunca faça**

❌ **Modificar fonte** durante iteração:

```java
list.stream().filter(...).forEach(list::remove); // ConcurrentModificationException
```

❌ **Reusar** **mesmo stream**:

```java
Stream<Integer> s = list.stream();
s.forEach(System.out::println);
s.forEach(System.out::println); // IllegalStateException: stream já consumido
```

✅ **Crie novo** sempre que precisar.

---

## Performance – **lazy** só executa o necessário

```java
IntStream.iterate(0, i -> i + 1)
         .filter(i -> i % 2 == 0)
         .limit(5)          // só processa 5 pares
         .forEach(System.out::println); // 0 2 4 6 8
```

---

## Resumo

> **Stream** é **sequência funcional de elementos** que **não armazena** – **use `filter`, `map`, `collect`, `reduce`** e **outros métodos encadeados** para **processar coleções de forma declarativa, lazy e até paralela** sem **modificar a fonte original**.
