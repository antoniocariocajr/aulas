# Classes em Kotlin

Em Kotlin, uma classe é a planta para criar objetos, assim como em Java, mas com uma sintaxe muito mais concisa e poderosa. Kotlin elimina o "boilerplate" (código repetitivo) e introduz conceitos modernos como propriedades de primeira classe e `data classes`.

## Estrutura de uma Classe em Kotlin

A forma mais comum de declarar uma classe em Kotlin já inclui seu **construtor primário** e **propriedades** na mesma linha.

```kotlin
// Construtor primário e propriedades declarados de forma concisa
class Pessoa(val nome: String, var idade: Int) {

    /* 1. BLOCO DE INICIALIZAÇÃO */
    init {
        println("$nome, com $idade anos, foi criado.")
    }

    /* 2. MÉTODOS (Funções de membro) */
    fun fazerAniversario() {
        idade++ // Acessa a propriedade diretamente
        println("$nome agora tem $idade anos.")
    }

    /* 3. CONSTRUTOR SECUNDÁRIO (opcional) */
    constructor(nome: String) : this(nome, 0) {
        println("Construtor secundário chamado.")
    }
}
```

## Modificadores de Visibilidade

Kotlin tem modificadores de visibilidade semelhantes aos de Java, com a adição do `internal`.

| Tipo | Descrição |
| :--- | :--- |
| `public` (padrão) | Visível em todos os lugares. |
| `private` | Visível apenas dentro da classe. |
| `protected` | Visível na classe e em suas subclasses. |
| `internal` | Visível dentro do mesmo **módulo** (ex: um projeto Gradle). |

---

## Propriedades (Atributos)

Em Kotlin, não usamos campos diretamente. Usamos **propriedades**, que encapsulam um campo (backing field) e seus métodos de acesso (getters/setters).

| Tipo | Palavra-chave | Descrição |
| :--- | :--- | :--- |
| **Somente leitura** | `val` | Gera um campo privado e um getter. Não pode ser reatribuída. |
| **Mutável** | `var` | Gera um campo privado, um getter e um setter. |
| **De classe** | `companion object` | Membros compartilhados por todas as instâncias da classe. |
| **Constante** | `const val` | Valor fixo em tempo de compilação (dentro de um `object` ou `companion object`). |

```kotlin
class Carro(val modelo: String) { // 'modelo' é uma propriedade somente leitura
    var velocidade: Int = 0 // 'velocidade' é uma propriedade mutável
        private set // O setter é privado, só a classe pode mudar a velocidade

    companion object {
        const val VELOCIDADE_MAXIMA = 200 // Constante de compilação
        var contadorCarros = 0 // Propriedade estática
    }

    init {
        contadorCarros++
    }
}
```

---

## Construtores

Kotlin distingue entre **construtor primário** (na assinatura da classe) e **secundário**.

| Tipo | Detalhe |
| :--- | :--- |
| **Primário** | Declarado na cabeça da classe. Pode ter até um por classe. |
| **Secundário** | Declarado com a palavra-chave `constructor`. Pode haver vários. |
| **Delegação** | Todo construtor secundário **deve** chamar o primário (direta ou indiretamente) usando `this()`. |
| **Inicialização** | O código do construtor primário vai no bloco `init { ... }`. |

---

## Métodos (Funções)

São declarados com a palavra-chave `fun` e definem o comportamento do objeto.

```kotlin
class Calculadora {
    fun somar(a: Int, b: Int): Int {
        return a + b
    }

    // Forma "expression body" (corpo de expressão)
    fun subtrair(a: Int, b: Int) = a - b
}
```

---

## Data Classes: O Poder da Concisão

Para classes que servem apenas para guardar dados, use `data class`. O compilador gera automaticamente:
- `.equals()` / `.hashCode()`
- `.toString()`
- `.copy()`
- `.componentN()` (para desestruturação)

```kotlin
data class Usuario(val id: Int, val email: String)

fun main() {
    val usuario1 = Usuario(1, "contato@email.com")
    val usuario2 = Usuario(1, "contato@email.com")

    println(usuario1) // Saída legível: Usuario(id=1, email=contato@email.com)
    println(usuario1 == usuario2) // true (compara o conteúdo)

    val usuario3 = usuario1.copy(id = 2) // Cria uma cópia com o id modificado
    println(usuario3) // Usuario(id=2, email=contato@email.com)
}
```

## Instância: Criando Objetos

Para criar uma instância (um objeto) em Kotlin, você chama o construtor como se fosse uma função normal, **sem a palavra-chave `new`**.

```kotlin
// 1. Molde (classe)
class Carro(val modelo: String) {
    fun ligar() {
        println("$modelo ligando...")
    }
}

// 2. Criando instâncias
val meuCarro = Carro("Fusca") // ← Objeto alocado na memória
meuCarro.ligar()

val outroCarro = Carro("Tesla")
outroCarro.ligar()

// 'meuCarro' e 'outroCarro' são duas instâncias diferentes da classe Carro.
```
