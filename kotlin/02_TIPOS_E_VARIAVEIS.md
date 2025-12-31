# **Tipos e Variáveis em Kotlin**

Kotlin é uma linguagem **tipada estaticamente**, o que significa que o tipo de cada variável é conhecido em tempo de compilação. No entanto, ela possui **inferência de tipo**, o que torna a declaração de variáveis mais concisa.

## **Variáveis: `val` vs `var`**

Existem duas palavras-chave para declarar variáveis em Kotlin:

* **`val` (value)**: Para variáveis **imutáveis** (read-only). Uma vez atribuído um valor, ele não pode ser alterado. É a forma preferida de declaração, incentivando a imutabilidade.
* **`var` (variable)**: Para variáveis **mutáveis**. O valor pode ser reatribuído.

```kotlin
val nome = "Kotlin" // Imutável, tipo inferido como String
var idade = 8       // Mutável, tipo inferido como Int

// nome = "Java" // Erro de compilação: val cannot be reassigned
idade = 9       // OK
```

### **Declaração Explícita de Tipo**

É possível declarar o tipo explicitamente, se necessário:

```kotlin
val linguagem: String = "Kotlin"
var versao: Int = 1
```

## **Tipos Básicos**

Todos os tipos em Kotlin são objetos. Não há tipos primitivos como em Java, mas o compilador os otimiza para tipos primitivos da JVM sempre que possível.

### **Números**

| Tipo | Tamanho (bits) | Valor Mínimo | Valor Máximo |
|---|---|---|---|
| **`Byte`** | 8 | -128 | 127 |
| **`Short`** | 16 | -32768 | 32767 |
| **`Int`** | 32 | -2.147.483.648 | 2.147.483.647 |
| **`Long`** | 64 | -9.223.372.036.854.775.808 | 9.223.372.036.854.775.807 |
| **`Float`** | 32 | (precisão de 6-7 dígitos) | |
| **`Double`**| 64 | (precisão de 15-16 dígitos) | |

**Literais Numéricos:**
* **`Long`**: `123L`
* **`Float`**: `12.3f` ou `12.3F`
* **`Hexadecimal`**: `0x0F`
* **`Binário`**: `0b00001011`

### **Booleanos (`Boolean`)**

Representa valores lógicos: `true` ou `false`.

```kotlin
val isKotlinFun: Boolean = true
val isJavaFun = false
```

### **Caracteres (`Char`)**

Representa um único caractere. Literais de `Char` são definidos com aspas simples.

```kotlin
val letra: Char = 'K'
// val letraErrada: Char = 'Kotlin' // Erro de compilação
```

### **Strings (`String`)**

Representa uma sequência de caracteres. São imutáveis.

```kotlin
val saudacao = "Olá, Mundo!"
```

**String Templates (Interpolação):**

Permitem incluir variáveis diretamente em uma string usando o cifrão (`$`).

```kotlin
val nome = "Kotlin"
println("Olá, $nome!") // Olá, Kotlin!

val a = 10
val b = 20
println("A soma de $a + $b é ${a + b}") // A soma de 10 + 20 é 30
```

**Strings de Múltiplas Linhas (Raw Strings):**

Usando três aspas duplas (`"""`), é possível criar strings que se estendem por várias linhas e contêm caracteres especiais sem a necessidade de escape.

```kotlin
val json = """
{
  "nome": "Kotlin",
  "versao": "1.9"
}
"""
```

## **Segurança contra Nulos (Null Safety)**

Uma das características mais importantes de Kotlin é a segurança contra nulos. O sistema de tipos distingue entre tipos que podem conter `null` (nuláveis) e tipos que não podem.

* **Tipos Não-Nuláveis**: Por padrão, as variáveis não podem conter `null`.

```kotlin
var nome: String = "Kotlin"
// nome = null // Erro de compilação
```

* **Tipos Nuláveis**: Para permitir que uma variável contenha `null`, adicione `?` ao final do tipo.

```kotlin
var nomeNulavel: String? = "Kotlin"
nomeNulavel = null // OK
```

### **Operadores para Lidar com Nulos**

* **Safe Call (`?.`)**: Executa uma ação apenas se o valor não for `null`. Caso contrário, retorna `null`.

```kotlin
val nome: String? = "Kotlin"
val tamanho = nome?.length // Retorna o tamanho de nome, ou null se nome for null
```

* **Elvis Operator (`?:`)**: Fornece um valor padrão se a expressão à esquerda for `null`.

```kotlin
val nome: String? = null
val nomeValido = nome ?: "Padrão" // Se nome for null, usa "Padrão"
println(nomeValido) // Padrão
```

* **Non-null Assertion (`!!`)**: Converte um tipo nulável em não-nulável, lançando um `NullPointerException` se o valor for `null`. **Deve ser usado com cuidado.**

```kotlin
val nome: String? = "Kotlin"
val tamanho = nome!!.length // Lança NPE se nome for null
```

## **Type Casting (Conversão de Tipos)**

Kotlin realiza a conversão de tipos de forma segura.

* **Smart Casts**: O compilador é inteligente o suficiente para saber o tipo de uma variável após uma verificação com `is`.

```kotlin
fun imprimirTamanho(obj: Any) {
  if (obj is String) {
    // obj é automaticamente convertido para String neste bloco
    println("Tamanho da String: ${obj.length}")
  }
}
```

* **Casting Explícito (`as`)**: Para conversões explícitas, use o operador `as`.

```kotlin
val obj: Any = "Kotlin"
val nome = obj as String // Conversão insegura, pode lançar ClassCastException
```

* **Casting Seguro (`as?`)**: Retorna `null` se a conversão não for possível, em vez de lançar uma exceção.

```kotlin
val numero: Any = 123
val nome = numero as? String // Retorna null
```
