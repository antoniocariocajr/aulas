# **Entrada e Saída de Dados em Kotlin**

A interação com o usuário através da entrada e saída de dados no console é uma parte fundamental de muitas aplicações. Kotlin simplifica essas operações com funções da sua biblioteca padrão.

## **Saída Padrão (Output)**

Para imprimir dados no console, Kotlin oferece duas funções principais:

* **`println()`**: Imprime o argumento passado e adiciona uma quebra de linha ao final.
* **`print()`**: Imprime o argumento sem adicionar uma quebra de linha.

```kotlin
fun main() {
    println("Olá, Kotlin!") // Imprime e pula para a próxima linha
    print("Estou na mesma") // Imprime na mesma linha
    print(" linha.")
    println() // Apenas para pular a linha no final
}
// Saída:
// Olá, Kotlin!
// Estou na mesma linha.
```

É comum usar *string templates* (`$`) para formatar a saída com variáveis:

```kotlin
val linguagem = "Kotlin"
val versao = 1.9
println("Linguagem: $linguagem, Versão: $versao")
// Saída: Linguagem: Kotlin, Versão: 1.9
```

## **Entrada Padrão (Input)**

Para ler dados do console, Kotlin utiliza a função `readLine()`.

> **`readLine()`** lê uma linha de texto da entrada padrão e a retorna como uma `String`. Se não houver mais linhas para ler (fim da entrada), ela retorna `null`.

Como `readLine()` pode retornar `null`, é preciso tratar a nulidade.

### **Leitura de Strings**

A forma mais segura de ler uma string é tratando o caso de `null` com o operador Elvis (`?:`).

```kotlin
fun main() {
    print("Digite seu nome: ")
    val nome = readLine() ?: "usuário" // Fornece um valor padrão caso a entrada seja nula
    println("Olá, $nome!")
}
```

### **Leitura de Outros Tipos (Números, etc.)**

`readLine()` sempre retorna uma `String?`. Para converter a entrada para outros tipos, como `Int` ou `Double`, é necessário fazer a conversão explícita.

A forma mais segura de fazer isso é usando `toIntOrNull()`, `toDoubleOrNull()`, etc. Essas funções retornam o valor convertido ou `null` se a conversão falhar.

```kotlin
fun main() {
    print("Digite sua idade: ")
    val input = readLine()
    val idade = input?.toIntOrNull() ?: 0 // Converte para Int ou usa 0 se for nulo ou inválido

    println("Você tem $idade anos.")
}
```

**Exemplo completo com validação:**

```kotlin
fun main() {
    print("Digite um número: ")
    val input = readLine()
    val numero = input?.toIntOrNull()

    if (numero != null) {
        println("O dobro de $numero é ${numero * 2}")
    } else {
        println("Entrada inválida. Por favor, digite um número.")
    }
}
```

## **Alternativa: Classe `Scanner` (Java)**

Por ser 100% interoperável com Java, Kotlin também pode usar a classe `java.util.Scanner`, que é mais robusta para ler tipos específicos diretamente, sem a necessidade de conversão manual.

```kotlin
import java.util.Scanner

fun main() {
    val scanner = Scanner(System.`in`)

    print("Digite seu nome: ")
    val nome = scanner.next() // Lê a próxima palavra

    print("Digite sua idade: ")
    val idade = scanner.nextInt() // Lê um inteiro diretamente

    print("Digite seu peso: ")
    val peso = scanner.nextDouble() // Lê um double

    println("\nResumo:")
    println("Nome: $nome, Idade: $idade, Peso: $peso")
}
```

### **`readLine()` vs `Scanner`**

| Característica | `readLine()` (Kotlin) | `Scanner` (Java) |
|---|---|---|
| **Simplicidade** | Mais simples para leitura de linhas completas. | Mais verboso. |
| **Segurança de Nulo** | Requer tratamento explícito de nulos. | Lança exceções se a entrada não corresponder ao tipo esperado. |
| **Conversão de Tipo** | Manual (`toIntOrNull()`, etc.). | Direta (`nextInt()`, `nextDouble()`, etc.). |
| **Uso Típico** | Ideal para aplicações simples e scripts. | Útil em cenários mais complexos, como programação competitiva. |

Para a maioria dos casos em Kotlin idiomático, `readLine()` combinado com as funções de conversão segura (`toIntOrNull()`) é a abordagem preferida.
