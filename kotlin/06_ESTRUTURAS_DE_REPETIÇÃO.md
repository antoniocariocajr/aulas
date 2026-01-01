# **Estruturas de Repetição em Kotlin**

Estruturas de repetição, ou loops, são usadas para executar um bloco de código várias vezes. Kotlin oferece os loops `for` e `while` para esse propósito.

## **Loop `for`**

O loop `for` em Kotlin é extremamente versátil e é usado para iterar sobre qualquer coisa que forneça um iterador. Isso inclui intervalos, coleções, arrays e strings.

### **Iterando sobre Intervalos (Ranges)**

A forma mais comum de usar o `for` é com intervalos.

```kotlin
// Itera de 1 a 5 (inclusivo)
for (i in 1..5) {
    print("$i ")
}
// Saída: 1 2 3 4 5
```

**Outras formas de criar intervalos:**
*   **`until`**: Itera até o valor, mas não o inclui.
*   **`downTo`**: Itera em ordem decrescente.
*   **`step`**: Define o "passo" da iteração.

```kotlin
// de 1 a 4 (exclusivo)
for (i in 1 until 5) { print("$i ") } // 1 2 3 4
println()

// de 5 a 1
for (i in 5 downTo 1) { print("$i ") } // 5 4 3 2 1
println()

// de 1 a 10, de 2 em 2
for (i in 1..10 step 2) { print("$i ") } // 1 3 5 7 9
println()
```

### **Iterando sobre Coleções**

O `for` é ideal para percorrer os elementos de uma coleção (como `List`, `Set` ou `Map`).

```kotlin
val frutas = listOf("Maçã", "Banana", "Morango")
for (fruta in frutas) {
    println(fruta)
}
```

Para obter o índice e o valor ao mesmo tempo, use `withIndex()`:

```kotlin
for ((index, fruta) in frutas.withIndex()) {
    println("Índice $index: $fruta")
}
```

### **Iterando sobre Strings**

É possível iterar sobre os caracteres de uma `String`:

```kotlin
for (char in "Kotlin") {
    print("$char ")
}
// Saída: K o t l i n
```

## **Loop `while`**

O loop `while` executa um bloco de código enquanto uma condição for verdadeira.

```kotlin
var i = 1
while (i <= 5) {
    print("$i ")
    i++
}
// Saída: 1 2 3 4 5
```

O `while` é útil quando o número de iterações não é conhecido antecipadamente.

## **Loop `do-while`**

O `do-while` é semelhante ao `while`, mas garante que o bloco de código seja executado **pelo menos uma vez**, pois a condição é verificada **após** a primeira execução.

```kotlin
var i = 6
do {
    println("Este bloco executa pelo menos uma vez.")
    println("i = $i")
    i++
} while (i <= 5)

// Saída:
// Este bloco executa pelo menos uma vez.
// i = 6
```

## **Controle de Fluxo em Loops**

É possível controlar o fluxo de execução dentro de um loop com `break` e `continue`.

### **`break`**

A palavra-chave `break` **interrompe** o loop imediatamente e continua a execução do programa após o loop.

```kotlin
for (i in 1..10) {
    if (i == 5) {
        break // Para o loop quando i for 5
    }
    print("$i ")
}
// Saída: 1 2 3 4
```

### **`continue`**

A palavra-chave `continue` **pula a iteração atual** e avança para a próxima.

```kotlin
for (i in 1..5) {
    if (i == 3) {
        continue // Pula a impressão do número 3
    }
    print("$i ")
}
// Saída: 1 2 4 5
```
