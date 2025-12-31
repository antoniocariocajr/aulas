# 🔧 Interfaces Funcionais

- Interface funcional = **interface com EXATAMENTE 1 método abstrato** (pode ter `default`/`static`).  
- Anotada opcionalmente com `@FunctionalInterface` → **garante** que não haja 2º método abstrato.  
- **Objetivo**: permitir **lambda** ou **referência de método** onde se espera um objeto da interface.  
- **Vantagem**: código **mais curto**, **legível** e **funcional**.

---

## Anatomia de uma lambda

```java
// antes (classe anônima)
Runnable r = new Runnable() {
    public void run() {
        System.out.println("Oi");
    }
};

// com lambda
Runnable r = () -> System.out.println("Oi");
```

**Partes**: `(parâmetros) -> { corpo }`  
Quando o corpo tem **1 linha** as chaves e `return` são opcionais.

---

## Pacote `java.util.function` – **interfaces funcionais oficiais**

| Interface | Assinatura | Uso típico | Exemplo lambda |
| ----------- | ------------ | ------------ | ---------------- |
| `Runnable` | `void run()` | tarefa sem entrada/saída | `() -> System.out.println("ok")` |
| `Consumer<T>` | `void accept(T t)` | consome valor | `s -> System.out.println(s)` |
| `BiConsumer<T,U>` | `void accept(T t, U u)` | consome 2 valores | `(k, v) -> map.put(k, v)` |
| `Supplier<T>` | `T get()` | fornece valor | `() -> UUID.randomUUID()` |
| `Function<T,R>` | `R apply(T t)` | transforma T → R | `s -> s.length()` |
| `BiFunction<T,U,R>` | `R apply(T t, U u)` | transforma (T,U) → R | `(a, b) -> a + b` |
| `UnaryOperator<T>` | `T apply(T t)` | `Function` com mesmo tipo | `n -> n * 2` |
| `BinaryOperator<T>` | `T apply(T t1, T t2)` | `BiFunction` mesmo tipo | `(x, y) -> x.concat(y)` |
| `Predicate<T>` | `boolean test(T t)` | testa verdadeiro/falso | `n -> n % 2 == 0` |
| `BiPredicate<T,U>` | `boolean test(T t, U u)` | testa 2 valores | `(s, i) -> s.length() == i` |

> **Primitivas** evitam boxing:  
> `IntPredicate`, `LongFunction<R>`, `IntConsumer`, `DoubleSupplier`...

---

## Criando a sua própria interface funcional

```java
@FunctionalInterface
public interface Calculadora {
    double executar(double a, double b);
}

// uso
Calculadora soma = (x, y) -> x + y;
Calculadora pot  = (x, y) -> Math.pow(x, y);
System.out.println(soma.executar(5, 3)); // 8.0
```

Se **adicionar 2º método abstrato** → **ERRO de compilação**.

---

## Lambdas em ação – exemplos rápidos

### a) `Consumer` – imprimir lista

```java
List<String> nomes = List.of("Ana", "Bruno");
nomes.forEach(n -> System.out.println(n));     // ou Reference: System.out::println
```

### b) `Function` – transformar

```java
List<Integer> nums = List.of(1, 2, 3);
List<Integer> dobrados = nums.stream()
                             .map(n -> n * 2)   // Function<Integer,Integer>
                             .toList();         // [2, 4, 6]
```

### c) `Predicate` – filtrar

```java
List<Integer> lista = List.of(10, 3, 7, 8);
lista.removeIf(n -> n % 2 == 1);   // remove ímpares
```

### d) `Supplier` – valor sob demanda

```java
Supplier<Double> sorteio = () -> Math.random() * 100;
System.out.println(sorteio.get()); // novo valor a cada chamada
```

### e) `Runnable` – tarefa

```java
new Thread(() -> System.out.println("Tarefa")).start();
```

---

## Method Reference – atalho quando lambda só chama 1 método

| Tipo | Exemplo lambda → Reference |
| ------ | ---------------------------- |
| **estático** | `s -> Integer.parseInt(s)` → `Integer::parseInt` |
| **instância específica** | `s -> System.out.println(s)` → `System.out::println` |
| **instância arbitrária** | `str -> str.length()` → `String::length` |
| **construtor** | `() -> new ArrayList<>()` → `ArrayList::new` |

```java
List<String> frutas = List.of("abacate", "uva", "banana");
frutas.sort(Comparator.comparing(String::length)); // referência
```

---

## Composição de funções

```java
Function<Integer, Integer> vezes2 = x -> x * 2;
Function<Integer, Integer> mais3 = x -> x + 3;

Function<Integer, Integer> composta = vezes2.andThen(mais3); // 1º depois 2º
System.out.println(composta.apply(5)); // 5*2 = 10 +3 = 13

Function<Integer, Integer> antes = vezes2.compose(mais3); // 1º mais3, 2º vezes2
System.out.println(antes.apply(5)); // 5+3 = 8 *2 = 16
```

`Predicate` também compõe:

```java
Predicate<Integer> par      = n -> n % 2 == 0;
Predicate<Integer> maior10  = n -> n > 10;
Predicate<Integer> parMaior10 = par.and(maior10);
```

---

## **Exceção: interfaces funcionais com métodos default**

```java
@FunctionalInterface
interface Texto {
    String texto();              // único abstrato
    default String textoMaiusculo() {
        return texto().toUpperCase();
    }
}
```

---

## **Boas práticas & dicas**

1. **Use as built-in** (`Function`, `Consumer`...) **antes de criar** a sua.  
2. **Nomeie lambdas** quando **complexos** → extraia método ou use **method reference**.  
3. **Não capture variáveis mutáveis** (devem ser **efetivamente finais**).  
4. **Escolha tipos primitivos** (`IntPredicate`, `LongFunction`) para **evitar boxing**.  
5. **Documente** a **lógica** quando **não óbvia** – lambda **não tem JavaDoc**.

---

## **Resumo**

> Interfaces funcionais são **interfaces com 1 método abstrato** que **aceitam lambdas** ou **referências de método**, **tornam o código funcional e curto** – **use as do pacote `java.util.function`** e **crie a sua só quando necessário**.
