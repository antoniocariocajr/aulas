# **Estrutura de Dados**

> “Tudo que guarda dados **em memória** (arrays, listas, filas, pilhas, conjuntos, mapas, árvores, grafos) **já existe pronto** na **Java Collections Framework** ou pode ser **codificado em 5 min** com **nós e referências**.”

---

## **Tabela Rápida – Onde usar cada uma?**

| Tarefa comum | Estrutura | Implementação Java | Complexidade típica |
| -------------- | ----------- | -------------------- | --------------------- |
| Acesso indexado rápido | array | `int[]` | O(1) |
| Lista ordenada/dinâmica | lista ligada | `LinkedList` | inserção O(1) |
| Lista com índice + redimensiona | vetor dinâmico | `ArrayList` | acesso O(1) |
| FIFO (primeiro entra, primeiro sai) | fila | `Queue → LinkedList` | enqueue/dequeue O(1) |
| LIFO (último entra, primeiro sai) | pilha | `Deque → ArrayDeque` | push/pop O(1) |
| Não permitir duplicatas | conjunto | `HashSet` / `TreeSet` | add O(1) ou O(log n) |
| Mapear chave → valor | tabela hash | `HashMap` | get/put O(1) |
| Ordenar chaves automaticamente | mapa ordenado | `TreeMap` | get/put O(log n) |
| Prioridade (maior/menor sempre no topo) | heap | `PriorityQueue` | insert/remove O(log n) |
| Grafo simples | lista adjacência | `Map<V,List<V>>` | depende do algoritmo |

---

## **Arrays – a base de tudo**

```java
int[] nums = {5, 2, 9};
nums[1] = 7;                 // O(1)
Arrays.sort(nums);           // Quick-sort dual-pivot O(n log n)
```

> **Limitações**: tamanho **fixo** → precisa de **estruturas dinâmicas**.

---

## **Java Collections Framework (JCF)**

O **Java Collections Framework** é um conjunto unificado de interfaces e classes que fornecem estruturas de dados prontas para armazenar e manipular grupos de objetos de forma eficiente. Ele está localizado no pacote `java.util`.

### **Hierarquia simplificada**

```bash
Iterable
  └── Collection
        ├── List        (índice + permite duplicatas)
        │     ├── ArrayList   ➜ vetor redimensionável
        │     └── LinkedList  ➜ lista duplamente ligada
        ├── Set         (não duplicata)
        │     ├── HashSet     ➜ tabela hash
        │     └── TreeSet     ➜ árvore vermelho-preto
        └── Queue/Deque (FIFO ou LIFO)
              └── ArrayDeque  ➜ fila/pilha circular
Map (não herda Collection)
  ├── HashMap              ➜ hash table
  └── TreeMap              ➜ árvore ordenada
```

---

## **Listas – ArrayList vs LinkedList**

| Operação | ArrayList | LinkedList |
| ---------- | ----------- | ------------ |
| `get(i)` | O(1) | O(n) |
| `add(E)` no fim | O(1) amortizado | O(1) |
| `add(i,E)` no meio | O(n) | O(n) *mas só percorre metade* |
| `remove(i)` | O(n) | O(n) |
| memória | array + 1 referência/célula | nó + 2 referências/célula |

```java
List<String> nomes = new ArrayList<>();
nomes.add("Ana");               // append
nomes.add(1, "Bruno");          // insert
String primeiro = nomes.get(0); // random access O(1)
nomes.remove("Bruno");          // remove objeto
Collections.sort(nomes);        // merge/tim-sort O(n log n)
```

```java
List<Integer> listaLigada = new LinkedList<>();
listaLigada.addFirst(10);       // O(1)
listaLigada.addLast(20);        // O(1)
```

---

## **Pilha (Stack) – sem usar Vector**

```java
Deque<Character> pilha = new ArrayDeque<>();
pilha.push('A');      // empilhar
pilha.push('B');
char topo = pilha.pop();  // desempilhar → 'B'
char semRemover = pilha.peek(); // só olha → 'A'
```

`ArrayDeque` é **mais rápida** que `Stack` (legada).

---

## **Fila (Queue) – FIFO**

```java
Queue<Integer> fila = new LinkedList<>();
fila.offer(1);        // enqueue
fila.offer(2);
int cabeca = fila.poll();  // dequeue → 1
int soOlha = fila.peek();  // 2
```

**Fila circular rápida**:

```java
Queue<Integer> fila circular = new ArrayDeque<>(); // mesma API
```

---

## **Heap (fila de prioridade)**

```java
Queue<Integer> heapMin = new PriorityQueue<>(); // min-heap
heapMin.offer(10);
heapMin.offer(3);
heapMin.offer(5);
System.out.println(heapMin.poll()); // 3 (menor)
```

**Max-heap**:

```java
Queue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
```

Complexidade: `offer/poll` **O(log n)** – backed by **array binário**.

---

## **Set – conjunto (sem duplicatas)**

```java
Set<String> nomes = new HashSet<>(); // O(1) médio
nomes.add("Alice");
nomes.add("Bob");
nomes.add("Alice"); // retorna false – ignorado
boolean existe = nomes.contains("Bob"); // O(1)
```

**Ordenado automaticamente**:

```java
Set<Integer> ordenado = new TreeSet<>(); // árvore vermelho-preto O(log n)
```

---

## **Map – dicionário chave→valor**

```java
Map<String, Integer> idade = new HashMap<>();
idade.put("Maria", 28);
idade.put("João", 35);
int i = idade.get("Maria"); // 28
idade.merge("Maria", 1, Integer::sum); // Maria agora 29
```

**Ordenado por chave**:

```java
Map<String, Integer> ordem = new TreeMap<>();
```

**Mantém ordem de inserção**:

```java
Map<String, Integer> fifo = new LinkedHashMap<>();
```

---

## **Estruturas próprias – 3 exemplos**

### Lista simplesmente ligada (manual)

```java
class No {
    int dado;
    No prox;
    No(int d) { dado = d; }
}

class ListaSimples {
    private No cabeca;

    void addFirst(int v) {
        No novo = new No(v);
        novo.prox = cabeca;
        cabeca = novo;
    }
    // remove, busca, iterator...
}
```

### Pilha com array

```java
class PilhaArray<T> {
    private Object[] stk;
    private int topo;
    PilhaArray(int cap) { stk = new Object[cap]; topo = -1; }
    void push(T v) { stk[++topo] = v; }
    @SuppressWarnings("unchecked")
    T pop() { return (T) stk[topo--]; }
}
```

### Grafo (lista adjacência) – 5 linhas

```java
Map<Integer, List<Integer>> grafo = new HashMap<>();
grafo.put(1, new ArrayList<>());
grafo.get(1).add(2);  // aresta 1→2
```

---

## **Tabela de Complexidades Big-O (resumo)**

| Estrutura | get | add/remove | contains | espaço |
| ----------- | ----- | ------------ | ---------- | -------- |
| Array | O(1) | O(n) | O(n) | O(n) |
| ArrayList | O(1) | O(n) | O(n) | ~1.5·n |
| LinkedList | O(n) | O(1) * | O(n) | 3·n |
| HashSet | — | O(1) amort. | O(1) amort. | ~2·n |
| TreeSet | — | O(log n) | O(log n) | n |
| HashMap | O(1) amort. | O(1) amort. | — | ~2·n |
| TreeMap | O(log n) | O(log n) | — | n |
| PriorityQueue | — | O(log n) | O(n) | n |
| ArrayDeque | O(1) | O(1) | O(n) | 2^cap |

\* inserção no meio O(n) porque precisa percorrer; nas extremidades O(1).

---

## **Dicas de uso rápido**

- **Pilha** → `ArrayDeque` (não `Stack`)  
- **Fila FIFO** → `ArrayDeque` ou `LinkedList`  
- **Lista com índice rápido** → `ArrayList`  
- **Evitar duplicatas** → `HashSet` (ou `LinkedHashSet` para manter ordem)  
- **Ordenação automática** → `TreeSet` / `TreeMap`  
- **Chave→valor** → `HashMap` (mais rápido) ou `LinkedHashMap` (ordem de inserção)  
- **Prioridade** → `PriorityQueue` (min-heap pronto)  
- **Grafo/Árvore customizada** → `Map<K,List<K>>` ou nós com referências

---

## **Resumo**

> **Estruturas de dados em Java** são **arrays ou objetos interligados** que organizam informações na memória – **use a Collections Framework** para **90 % dos casos** e **crie suas listas/pilhas/árvores** apenas quando **precisar de lógica customizada**.

## A Classe Utilitária Collections

A classe java.util.Collections (no plural) fornece métodos estáticos poderosos para operar ou retornar coleções:

| Método | Descrição |
| :--- | :--- |
| sort(List<?> list) | Ordena a lista em ordem natural. |
| shuffle(List<?> list) | Embaralha os elementos aleatoriamente. |
| reverse(List<?> list) | Inverte a ordem dos elementos. |
| binarySearch(List, key) | Busca um item de forma otimizada (exige lista ordenada). |
| unmodifiableList(list) | Retorna uma versão da lista que não pode ser alterada. |
