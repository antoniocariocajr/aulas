fun main() {
    // 01_INTRODUÇÃO
    println("Olá, Mundo a partir de um arquivo de exemplos!")

    // 02_TIPOS_E_VARIAVEIS
    // val vs var
    val nome = "Kotlin"
    var idade = 8
    // nome = "Java" // Erro: Val cannot be reassigned
    idade = 9
    println("Nome: $nome, Idade: $idade")

    // Tipos Básicos
    val versao: Double = 1.9
    val isModerno: Boolean = true
    val inicial: Char = 'K'
    println("Versão: $versao, É Moderno: $isModerno, Inicial: $inicial")

    // Null Safety
    var nomeNulavel: String? = "Pode ser nulo"
    nomeNulavel = null

    val tamanho = nomeNulavel?.length ?: 0
    println("Tamanho do nome nulável: $tamanho")

    // 03_OPERADORES
    // Aritméticos
    val a = 15
    val b = 4
    println("Soma: ${a + b}")
    println("Resto: ${a % b}")

    // Comparação
    val str1 = "Kotlin"
    val str2 = "kotlin".replaceFirstChar { it.uppercase() }
    println("Structural equality (==): ${str1 == str2}") // true
    println("Referential equality (===): ${str1 === str2}") // false

    // Range e 'in'
    for (i in 1..3) {
        print("$i ")
    }
    println()

    val numero = 7
    if (numero in 1..10) {
        println("$numero está no intervalo de 1 a 10.")
    }
}
