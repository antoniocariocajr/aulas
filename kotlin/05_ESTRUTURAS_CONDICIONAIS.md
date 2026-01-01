# **Estruturas Condicionais em Kotlin**

Estruturas condicionais permitem que um programa execute diferentes blocos de código com base em certas condições. Em Kotlin, as principais estruturas para isso são `if`/`else` e `when`.

## **`if` e `else`**

A estrutura `if`/`else` funciona de forma semelhante a outras linguagens.

```kotlin
val idade = 18

if (idade >= 18) {
    println("Maior de idade")
} else {
    println("Menor de idade")
}
```

### **`if`/`else` como Expressão**

Uma das características mais poderosas de Kotlin é que `if`/`else` pode ser usado como uma **expressão**, o que significa que ele pode **retornar um valor**. Isso permite um código mais conciso e funcional.

```kotlin
val idade = 18
val status = if (idade >= 18) "Maior de idade" else "Menor de idade"
println(status)
```

Neste caso, o bloco `if` ou `else` que for executado terá seu valor atribuído à variável `status`. O uso de `if` como expressão torna o código mais legível e elimina a necessidade de uma variável temporária.

### **`else if` para Múltiplas Condições**

Para checar múltiplas condições, pode-se usar `else if`.

```kotlin
val nota = 7.5

val resultado = if (nota >= 7.0) {
    "Aprovado"
} else if (nota >= 5.0) {
    "Recuperação"
} else {
    "Reprovado"
}
println(resultado)
```

## **`when` (o "switch" do Kotlin)**

A estrutura `when` é a versão mais poderosa e flexível do `switch` de outras linguagens. Ela pode ser usada tanto como uma declaração quanto como uma expressão.

### **Uso Básico**

`when` compara um valor com uma série de casos (`case`).

```kotlin
val diaDaSemana = 3

when (diaDaSemana) {
    1 -> println("Domingo")
    2 -> println("Segunda")
    3 -> println("Terça")
    4 -> println("Quarta")
    5 -> println("Quinta")
    6 -> println("Sexta")
    7 -> println("Sábado")
    else -> println("Dia inválido") // Equivalente ao 'default'
}
```

### **Combinando Múltiplos Casos**

É possível combinar múltiplos casos em uma única linha, separados por vírgula.

```kotlin
val dia = "Sábado"

when (dia) {
    "Sábado", "Domingo" -> println("Fim de semana")
    else -> println("Dia de semana")
}
```

### **Usando Intervalos (`in`)**

`when` pode usar o operador `in` para checar se um valor está dentro de um intervalo.

```kotlin
val nota = 8

when (nota) {
    in 9..10 -> println("Excelente")
    in 7..8 -> println("Bom")
    in 5..6 -> println("Regular")
    else -> println("Insuficiente")
}
```

### **Usando `is` para Checar Tipos**

É possível usar `when` para verificar o tipo de uma variável, aproveitando os *smart casts* de Kotlin.

```kotlin
fun verificarTipo(obj: Any) {
    when (obj) {
        is String -> println("É uma String de tamanho ${obj.length}")
        is Int -> println("É um Inteiro com valor $obj")
        is Boolean -> println("É um Booleano")
        else -> println("Tipo desconhecido")
    }
}

verificarTipo("Kotlin")
verificarTipo(123)
```

### **`when` sem Argumento**

`when` pode ser usado sem um argumento, funcionando como uma cadeia de `if`/`else if` mais legível.

```kotlin
val a = 10
val b = 20

when {
    a > b -> println("a é maior")
    a < b -> println("b é maior")
    else -> println("a e b são iguais")
}
```

### **`when` como Expressão**

Assim como `if`, `when` também pode ser usado como uma expressão que retorna um valor. O compilador exige que, neste caso, todos os caminhos possíveis sejam cobertos (geralmente com um `else`).

```kotlin
val dia = 1
val tipoDia = when (dia) {
    1, 7 -> "Fim de semana"
    else -> "Dia de semana"
}
println(tipoDia)
```

Essa abordagem é preferível por ser mais segura e expressiva, garantindo que a variável `tipoDia` seja sempre inicializada.
