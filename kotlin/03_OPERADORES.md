# **Operadores em Kotlin**

Kotlin suporta um conjunto de operadores padrão para realizar operações aritméticas, de atribuição, comparação e lógicas. Muitos desses operadores podem ser sobrecarregados (overloaded) para classes personalizadas.

## **Operadores Aritméticos**

São usados para realizar operações matemáticas básicas.

| Operador | Descrição | Exemplo |
|---|---|---|
| **`+`** | Adição | `a + b` |
| **`-`** | Subtração | `a - b` |
| **`*`** | Multiplicação | `a * b` |
| **`/`** | Divisão | `a / b` |
| **`%`** | Módulo (resto da divisão) | `a % b` |

```kotlin
val a = 10
val b = 3

println("Soma: ${a + b}")           // 13
println("Subtração: ${a - b}")      // 7
println("Multiplicação: ${a * b}")   // 30
println("Divisão: ${a / b}")         // 3 (divisão de inteiros)
println("Módulo: ${a % b}")          // 1
```

## **Operadores de Atribuição**

São usados para atribuir ou reatribuir valores a variáveis.

| Operador | Equivalente a |
|---|---|
| **`=`** | `a = b` |
| **`+=`** | `a = a + b` |
| **`-=`** | `a = a - b` |
| **`*=`** | `a = a * b` |
| **`/=`** | `a = a / b` |
| **`%=`** | `a = a % b` |

```kotlin
var numero = 10
numero += 5 // numero agora é 15
numero *= 2 // numero agora é 30
```

## **Operadores Unários**

Operam em um único operando.

| Operador | Descrição | Exemplo |
|---|---|---|
| **`+`** | Unário positivo | `+a` |
| **`-`** | Unário negativo (inverte o sinal) | `-a` |
| **`++`** | Incremento (adiciona 1) | `a++` (pós), `++a` (pré) |
| **`--`** | Decremento (subtrai 1) | `a--` (pós), `--a` (pré) |
| **`!`** | Negação lógica | `!isValid` |

**Diferença entre pré e pós-incremento:**
* **`++a` (pré-incremento)**: Incrementa o valor de `a` e **depois** retorna o novo valor.
* **`a++` (pós-incremento)**: Retorna o valor original de `a` e **depois** incrementa.

```kotlin
var a = 5
println(++a) // 6 (incrementa e depois imprime)

var b = 5
println(b++) // 5 (imprime e depois incrementa)
println(b)   // 6
```

## **Operadores de Comparação e Igualdade**

São usados para comparar dois valores e retornam um `Boolean`.

| Operador | Descrição |
|---|---|
| **`==`** | Igual a |
| **`!=`** | Diferente de |
| **`<`** | Menor que |
| **`>`** | Maior que |
| **`<=`** | Menor ou igual a |
| **`>=`** | Maior ou igual a |

```kotlin
val a = 5
val b = 10

println(a == b) // false
println(a < b)  // true
```

### **Igualdade Estrutural (`==`) vs Referencial (`===`)**

* **`a == b` (Igualdade Estrutural)**: Verifica se os **valores** dos objetos são iguais. Em objetos, isso chama o método `equals()`.
* **`a === b` (Igualdade Referencial)**: Verifica se `a` e `b` apontam para o **mesmo objeto na memória**.

```kotlin
val str1 = "Kotlin"
val str2 = "Kotlin"
val str3 = String("Kotlin".toCharArray())

println(str1 == str2) // true (valores iguais)
println(str1 === str2) // true (o compilador otimiza e usa a mesma referência)

println(str1 == str3) // true (valores iguais)
println(str1 === str3) // false (objetos diferentes na memória)
```

## **Operadores Lógicos**

São usados para combinar expressões booleanas.

| Operador | Descrição |
|---|---|
| **`&&`** | E lógico (AND) |
| **`||`** | OU lógico (OR) |
| **`!`** | NÃO lógico (NOT) |

```kotlin
val temSol = true
val temChuva = false

println("Vamos à praia? ${temSol && !temChuva}") // true
```

## **Operadores de Intervalo (`..`, `until`, `downTo`)**

São usados para criar intervalos (ranges).

| Operador | Descrição |
|---|---|
| **`..`** | Intervalo inclusivo |
| **`until`** | Intervalo exclusivo (não inclui o último valor) |
| **`downTo`** | Intervalo decrescente |
| **`step`** | Define o passo do intervalo |

```kotlin
// Imprime de 1 a 5
for (i in 1..5) {
    print("$i ")
}
println()

// Imprime de 1 a 4
for (i in 1 until 5) {
    print("$i ")
}
println()

// Imprime de 5 a 1, de 2 em 2
for (i in 5 downTo 1 step 2) {
    print("$i ")
}
println()
```

## **Operador `in`**

Verifica se um valor pertence a um intervalo, coleção ou string.

```kotlin
val numero = 5
if (numero in 1..10) {
    println("O número está no intervalo.")
}

val letra = 'k'
if (letra in 'a'..'z') {
    println("É uma letra minúscula.")
}
```
