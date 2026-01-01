# **Estrutura de Dados em Kotlin**

> "Estruturas de dados são a base da programação eficiente. Em Kotlin, a biblioteca padrão oferece uma coleção rica e idiomática que torna o trabalho com dados um prazer."

---

## **Tabela Rápida – Onde usar cada uma?**

| Tarefa comum | Estrutura | Implementação Kotlin | Complexidade típica |
| -------------- | ----------- | -------------------- | --------------------- |
| Acesso indexado rápido | Array | `Array<T>` / `IntArray` | O(1) |
| Lista ordenada/dinâmica | Lista (mutável) | `mutableListOf` | Adição O(1) amortizado |
| Lista somente leitura | Lista (imutável) | `listOf` | Criação O(n) |
| FIFO (primeiro entra, primeiro sai) | Fila | `ArrayDeque` | `addLast`/`removeFirst` O(1) |
| LIFO (último entra, primeiro sai) | Pilha | `ArrayDeque` | `addLast`/`removeLast` O(1) |
| Não permitir duplicatas | Conjunto | `mutableSetOf` / `setOf` | `add` O(1) em média |
| Mapear chave → valor | Mapa | `mutableMapOf` / `mapOf` | `get`/`put` O(1) em média |
| Ordenar chaves automaticamente | Mapa ordenado | `sortedMapOf` | `get`/`put` O(log n) |
| Prioridade (maior/menor) | Heap | `PriorityQueue` (Java) | `add`/`remove` O(log n) |

---

## **Arrays – A base de tudo**

Arrays em Kotlin têm tamanho fixo, mas são mais seguros e versáteis que em Java.

```kotlin
val nums = intArrayOf(5, 2, 9) // Primitivo, mais eficiente
val nomes = arrayOf("Ana", "Bruno") // Genérico

nums[1] = 7                 // O(1)
nums.sort()                 // O(n log n)
```

> **Limitações**: Tamanho **fixo** → use **coleções dinâmicas** para flexibilidade.

---

## **Kotlin Collections – Imutabilidade em primeiro lugar**

A principal diferença em Kotlin é a distinção clara entre coleções **somente leitura** (`List`, `Set`, `Map`) e **mutáveis** (`MutableList`, `MutableSet`, `MutableMap`).

### **Hierarquia simplificada**

```bash
Iterable
  └── Collection
        ├── List (somente leitura)
        │     └── MutableList (pode alterar)
        ├── Set (somente leitura)
        │     └── MutableSet (pode alterar)
... e assim por diante
```

**Prefira sempre as interfaces somente leitura** quando não precisar modificar a coleção.

---

## **Listas – Acesso por índice**

`ArrayList` é a implementação padrão para `listOf` e `mutableListOf`.

```kotlin
val nomes: MutableList<String> = mutableListOf("Ana")
nomes.add("Bruno")               // Adiciona no final
nomes.add(1, "Carlos")           // Adiciona no índice 1
val primeiro = nomes[0]          // Acesso direto O(1)
nomes.remove("Bruno")            // Remove pelo objeto
nomes.sort()                     // Ordena a própria lista
```

**Lista somente leitura**:

```kotlin
val linguagens = listOf("Kotlin", "Java", "Swift")
// linguagens.add("C#") // Erro de compilação!
```

---

## **Pilha e Fila com `ArrayDeque`**

Desde o Kotlin 1.3, `ArrayDeque` é a implementação recomendada para pilhas e filas.

**Pilha (Stack) – LIFO**:

```kotlin
val pilha = ArrayDeque<Char>()
pilha.addLast('A')      // Empilhar (push)
pilha.addLast('B')
val topo = pilha.removeLast()  // Desempilhar (pop) → 'B'
val semRemover = pilha.last() // Só olha (peek) → 'A'
```

**Fila (Queue) – FIFO**:

```kotlin
val fila = ArrayDeque<Int>()
fila.addLast(1)        // Enfileirar (enqueue)
fila.addLast(2)
val cabeca = fila.removeFirst()  // Desenfileirar (dequeue) → 1
val soOlha = fila.first()  // 2
```

---

## **Set – Conjunto (sem duplicatas)**

`HashSet` (via `LinkedHashSet` por padrão) é a implementação principal, mantendo a ordem de inserção.

```kotlin
val nomes = mutableSetOf<String>()
nomes.add("Alice")
nomes.add("Bob")
val adicionou = nomes.add("Alice") // retorna false – ignorado
val existe = "Bob" in nomes        // "contains" idiomático O(1)
```

---

## **Map – Dicionário chave-valor**

`HashMap` (via `LinkedHashMap` por padrão) também mantém a ordem de inserção.

```kotlin
val idades = mutableMapOf<String, Int>()
idades["Maria"] = 28 // put
idades["João"] = 35
val i = idades["Maria"] // get

// Atualização segura
idades.computeIfPresent("Maria") { _, v -> v + 1 } // Maria agora 29
```

---

## **Funções de Coleção Idiomáticas**

Kotlin brilha com suas funções de extensão para coleções.

```kotlin
val numeros = listOf(1, 2, 3, 4, 5)

val pares = numeros.filter { it % 2 == 0 }  // [2, 4]
val quadrados = numeros.map { it * it }     // [1, 4, 9, 16, 25]
val soma = numeros.reduce { acc, i -> acc + i } // 15
val primeiroPar = numeros.find { it % 2 == 0 } // 2

// Agrupamento
val pessoas = listOf(Pessoa("Ana", 20), Pessoa("Bia", 30), Pessoa("Ana", 25))
val porNome = pessoas.groupBy { it.nome } // Map<String, List<Pessoa>>
```

---

## **Tabela de Complexidades Big-O (resumo)**

| Estrutura | Acesso `[i]` | Adicionar/Remover | Contém `in` | Espaço |
| ----------- |:-----------:|:-----------------:|:-----------:|:-------:|
| Array | O(1) | O(n) | O(n) | O(n) |
| MutableList | O(1) | O(1) amort. | O(n) | ~1.5·n |
| LinkedHashSet* | — | O(1) amort. | O(1) amort. | ~2·n |
| HashMap* | O(1) amort. | O(1) amort. | — | ~2·n |
| TreeMap | O(log n) | O(log n) | — | n |
| PriorityQueue | — | O(log n) | O(n) | n |

*\* Implementações padrão para `mutableSetOf` e `mutableMapOf`.*

---

## **Dicas de uso rápido**

- **Precisa de uma coleção?** Comece com `listOf`, `setOf` ou `mapOf`.
- **Precisa modificar?** Mude para `mutableListOf`, `mutableSetOf` ou `mutableMapOf`.
- **Pilha ou Fila?** → `ArrayDeque`.
- **Garantir ausência de duplicatas?** → `Set`.
- **Mapear chave a um valor?** → `Map`.
- **Precisa de ordenação natural?** → `sortedSetOf` ou `sortedMapOf`.
- **Processar dados?** → Explore as funções de extensão (`filter`, `map`, `groupBy`, etc.).

---

## **Resumo**

> **Coleções em Kotlin** são **poderosas, seguras e idiomáticas**. Prefira sempre **interfaces imutáveis** e aproveite a **rica biblioteca de funções de extensão** para escrever um código mais limpo e expressivo.
