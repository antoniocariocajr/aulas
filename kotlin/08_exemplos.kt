// 08_exemplos.kt

// Exemplo 1: Classe básica com construtor primário e métodos
class Pessoa(val nome: String, var idade: Int) {
    // Bloco de inicialização, executado quando um objeto é criado
    init {
        println("Novo objeto Pessoa criado: $nome, $idade anos.")
    }

    // Método da classe
    fun fazerAniversario() {
        idade++
        println("Feliz aniversário! $nome agora tem $idade anos.")
    }

    // Construtor secundário que delega ao construtor primário
    constructor(nome: String) : this(nome, 0) {
        println("Construtor secundário usado: idade inicializada para 0.")
    }
}


// Exemplo 2: Propriedades, companion object e getters/setters customizados
class Carro(val modelo: String) {
    var velocidadeAtual: Int = 0
        private set // O setter é privado, só pode ser alterado dentro da classe

    // Getter customizado para a propriedade 'status'
    val status: String
        get() {
            return if (velocidadeAtual > 0) "Em movimento" else "Parado"
        }

    fun acelerar(incremento: Int) {
        if (velocidadeAtual + incremento <= VELOCIDADE_MAXIMA) {
            velocidadeAtual += incremento
            println("$modelo acelerando para $velocidadeAtual km/h.")
        } else {
            velocidadeAtual = VELOCIDADE_MAXIMA
            println("$modelo atingiu a velocidade máxima de $VELOCIDADE_MAXIMA km/h.")
        }
    }

    fun frear() {
        velocidadeAtual = 0
        println("$modelo freou e está parado.")
    }

    // Companion object para membros "estáticos"
    companion object {
        const val VELOCIDADE_MAXIMA = 220
        var totalDeCarrosCriados = 0
            private set

        fun incrementarContador() {
            totalDeCarrosCriados++
        }
    }

    init {
        incrementarContador()
    }
}


// Exemplo 3: Data class para simplicidade e utilidades
data class Usuario(val id: Int, val email: String, var ativo: Boolean = true)


fun main() {
    println("--- Classe Pessoa ---")
    val pessoa1 = Pessoa("Ana", 30)
    pessoa1.fazerAniversario()

    val pessoa2 = Pessoa("Carlos") // Usa o construtor secundário
    println("Idade de ${pessoa2.nome}: ${pessoa2.idade}")


    println("\n--- Classe Carro ---")
    val carro1 = Carro("Fusca")
    val carro2 = Carro("Tesla")

    carro1.acelerar(50)
    println("Status do ${carro1.modelo}: ${carro1.status}")
    // carro1.velocidadeAtual = 100 // Erro! Setter é privado.

    carro2.acelerar(100)
    carro2.frear()

    println("Total de carros criados: ${Carro.totalDeCarrosCriados}")


    println("\n--- Data Class Usuario ---")
    val usuario1 = Usuario(1, "alice@example.com")
    val usuario2 = Usuario(1, "alice@example.com")

    // toString() gerado automaticamente
    println(usuario1)

    // equals() gerado automaticamente (compara conteúdo)
    println("usuario1 == usuario2? ${usuario1 == usuario2}") // true

    // copy() para criar uma nova instância com valores modificados
    val usuarioInativo = usuario1.copy(ativo = false)
    println("Usuário inativo: $usuarioInativo")

    // Desestruturação (componentN() gerado automaticamente)
    val (id, email, status) = usuario1
    println("ID: $id, Email: $email, Status: $status")
}
