# 🔁 **Estruturas de Repetição em Java**  

(`while`, `do-while`, `for`, `for-each`, `Iterator` + recursos modernos)

---

## **while**

* repete **ENQUANTO** condição for verdadeira

```java
int c = 1;
while (c <= 5) {          // testa **no início**
    System.out.println(c);
    c++;
}
```

---

## **do-while**

* repete **PELO MENOS 1 vez**

```java
char op;
Scanner sc = new Scanner(System.in);
do {
    System.out.print("Continua (s/n)? ");
    op = sc.next().charAt(0);
} while (op == 's');
```

---

## **for tradicional**

* contador / passo fixo

```java
for (int i = 0; i < 10; i += 2) {
    System.out.print(i + " ");   // 0 2 4 6 8
}
```

> Primeira parte inicia as variaveis, segunda verificação, terceira atualiza a variavel.

**Decrescente / múltiplos**:

```java
for (int i = 100; i >= 0; i -= 5) { ... }
```

---

## **for-each**

* **percorre TODA coleção/array** (sintaxe enxuta)

```java
int[] nums = {7, 3, 9};
for (int n : nums) {          // lê apenas, **não muda índice**
    System.out.println(n);
}

List<String> lista = List.of("A", "B", "C");
for (String s : lista) {
    System.out.println(s);
}
```

**Limitações**:

* Não tem índice  
* Não remove ao iterar  
* Para alterar elementos use índice ou `Iterator`

---

## **Iterator**

* quando **precisa REMOVER** ou **navegar customizado**

```java
List<Integer> valores = new ArrayList<>(List.of(1, 2, 3, 4, 5));
Iterator<Integer> it = valores.iterator();
while (it.hasNext()) {
    Integer v = it.next();
    if (v % 2 == 0) it.remove();   // apaga pares
}
System.out.println(valores); // [1, 3, 5]
```

**ListIterator** – permite ir para **trás** e **setar** valor

```java
ListIterator<Integer> lit = valores.listIterator();
while (lit.hasNext()) {
    int idx = lit.nextIndex();
    int val = lit.next();
    lit.set(val * 10);        // multiplica por 10
}
```

---

## **keywords de controle de fluxo**

| Palavra | Efeito |
| --------- | -------- |
| `break` | **sai** do laço imediatamente |
| `continue` | **pula** para próxima iteração |
| `break rótulo` | sai de **laço externo** (Java tem **rótulo**) |

```java
externo:                     // rótulo
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == 1 && j == 1) break externo; // sai dos DOIS fors
        System.out.printf("(%d,%d) ", i, j);
    }
}
// saída: (0,0) (0,1) (0,2) (1,0)
```

---

## **Streams + lambda (Java 8+)**

* **repetição interna**

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5);
nums.stream()
    .filter(n -> n % 2 == 0)
    .forEach(System.out::println);   // 2 4
```

**não é laço explícito**, mas **itera** sobre os elementos.

---

## **Boas práticas**

1. **Escolha o laço mais claro**:  
   * **contador** → `for`  
   * **condição de parada desconhecida** → `while`/`do-while`  
   * **percorrer tudo** → `for-each`
2. **Evite loops infinitos** sem `break` ou condição de saída.  
3. **Não altere** coleção dentro de `for-each` – use `Iterator`.  
4. **Feche Scanner** quando terminar.  
5. **Prefira streams** para **transformações/ filtros** (código mais funcional).

---

## 1️⃣1️⃣ **Resumo de 1 frase**

> Em Java você **repete** com **`while`**, **`do-while`**, **`for`**, **`for-each`** ou **`Iterator`** – **escolha pelo tipo de controle** (contador, condição, remoção, etc.) e **lembre do `break`/`continue`** quando precisar **sair ou pular** iterações.
