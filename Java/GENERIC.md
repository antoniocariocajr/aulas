# 🔧 Generics em Java – **do básico ao avançado**

→ **evita `ClassCastException`**, **remove casts** e **permite código reutilizável e type-safe**.

---

## O que é Generics?

- **Parâmetros de tipo** (`<T>`) em **classes, interfaces, métodos**.  
- **Verificação em tempo de compilação** – **não existe em tempo de execução** (type erasure).  
- **Slogan**: **"escreva uma vez, use para qualquer tipo"**.

---

## Exemplo sem generics (Java 1.4)

```java
List lista = new ArrayList();   // raw type
lista.add("Java");
lista.add(123);                 // aceita Object

String s = (String) lista.get(1); // ❌ ClassCastException em runtime
```

---

## Com generics – **type-safe**

```java
List<String> lista = new ArrayList<>();
lista.add("Java");
lista.add(123);                   // ❌ erro de compilação
String s = lista.get(0);          // ✅ sem cast
```

---

## Sintaxe básica – **classe genérica**

```java
public class Caixa<T> {   // T = "type parameter"
    private T conteudo;

    public Caixa(T conteudo) { this.conteudo = conteudo; }
    public T getConteudo()   { return conteudo; }
    public void setConteudo(T conteudo) { this.conteudo = conteudo; }
}
```

Uso:

```java
Caixa<String> caixa = new Caixa<>("Java");
String s = caixa.getConteudo(); // sem cast
```

---

## **Múltiplos parâmetros**

```java
public class Par<K, V> {
    private K chave;
    private V valor;
    public Par(K chave, V valor) {
        this.chave = chave;
        this.valor = valor;
    }
    public K getChave() { return chave; }
    public V getValor() { return valor; }
}
```

---

## **Interface genérica** – exemplo `Comparable`

```java
public class Produto implements Comparable<Produto> {
    private String nome;
    private BigDecimal preco;

    @Override
    public int compareTo(Produto outro) {
        return this.preco.compareTo(outro.preco);
    }
}
```

---

## **Métodos genéricos** (fora de classe genérica)

```java
public static <T> void imprimirLista(List<T> lista) {
    for (T item : lista) {
        System.out.println(item);
    }
}
```

Uso:

```java
List<Integer> nums = List.of(1, 2, 3);
imprimirLista(nums);   // T = Integer
```

---

## **Wildcards** – curingas (`?`)

| Tipo | Significado |
| ------ | ------------- |
| `List<?>` | **qualquer tipo** (só leitura segura) |
| `List<? extends Number>` | **Number ou subclasse** (leitura) |
| `List<? super Integer>` | **Integer ou superclasse** (escrita) |

Exemplo **covariante** (leitura):

```java
public static double somar(List<? extends Number> numeros) {
    double s = 0;
    for (Number n : numeros) s += n.doubleValue();
    return s;
}
```

**Contravariante** (escrita):

```java
public static void adicionarInteiros(List<? super Integer> lista) {
    lista.add(10);   // ✅ seguro
}
```

---

## **Limites** (`extends` / `super`) – **PECS**

> **PECS** = **Producer** `extends`, **Consumer** `super`

- **Produz** dados → `? extends T`  
- **Consome** dados → `? super T`

```java
public static <T> void copiar(List<? extends T> src, List<? super T> dest) {
    for (T item : src) dest.add(item);
}
```

---

## **Type erasure** – **apaga tipo em runtime**

**Motivo**: compatibilidade binária com Java 1.4.

```java
List<String> ls = new ArrayList<>();
List<Integer> li = new ArrayList<>();
System.out.println(ls.getClass() == li.getClass()); // true – mesma classe!
```

**Consequências**:

- **Não pode usar** `new T()` ou `T.class` diretamente.  
- **Overloads** com mesmo apagamento → **erro de compilação**.

Solução: **passar `Class<T>`** ou **factory**.

---

## **Tipo com múltiplas restrições** (`&`)

```java
public static <T extends Comparable<T> & Serializable> void ordenar(List<T> lista) {
    Collections.sort(lista);
}
```

---

## **Enum genérico** – **não pode**, mas **com classe funciona**

```java
public enum Opcao implements Comparable<Opcao> { ... } // OK
// public enum Opcao<T> { ... } // ❌ proibido
```

---

## **Record + Generics**

```java
public record Par<K, V>(K chave, V valor) { }

Par<String, Integer> par = new Par<>("Java", 10);
```

---

## **Exemplo real** – **DAO genérico**

```java
public interface DAO<T, K> {
    Optional<T> findById(K id);
    List<T> findAll();
    void save(T entity);
    void delete(K id);
}

public class ProdutoDAO implements DAO<Produto, Long> { ... }
```

---

## **Boas práticas & dicas**

✅ **Use** generics **sempre** que **tipo for variar**.  
✅ **Prefira** `List<T>` **a** `List<?>` – **mais informação**.  
✅ **Produza** (`extends`) e **Consuma** (`super`) – **PECS**.  
✅ **Não misture** **tipos primitivos** com **genéricos** – use **wrappers**.  
✅ **Documente** `<T>` – **ex: `<T extends Entidade>`**.  

❌ **Não exponha** `T[]` – **prefira** `List<T>` (arrays e genéricos não combinam bem).  
❌ **Não use** **raw types** (`List lista`) – **perde type-safety**.

---

## **Resumo de 1 frase**

> **Generics** (`<T>`) **parametrizam tipos** em **classes, interfaces e métodos**, **garantindo segurança em tempo de compilação**, **evitando casts e NullPointerException** – **use `extends`/`super` para flexibilidade** e **nunca mais use raw types**.
