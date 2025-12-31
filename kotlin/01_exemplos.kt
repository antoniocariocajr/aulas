fun main() {
    // 01_INTRODUÇÃO
    println("Olá, Mundo a partir de um arquivo de exemplos!")
    println("---")

    // 02_TIPOS_E_VARIAVEIS
    println("### 02. Tipos e Variáveis ###")
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
    println("---")

    // 03_OPERADORES
    println("### 03. Operadores ###")
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
    val numero = 7
    if (numero in 1..10) {
        println("$numero está no intervalo de 1 a 10.")
    }
    println("---")

    // 04_ENTRADA_E_SAIDA
    println("### 04. Entrada e Saída ###")
    // Para testar a entrada de dados, descomente as linhas abaixo
    // print("Digite seu nome: ")
    // val nomeUsuario = readLine() ?: "usuário"
    // println("Olá, $nomeUsuario!")
    println("Exemplos de entrada de dados estão comentados para evitar bloqueio.")
    println("---")


    // 05_ESTRUTURAS_CONDICIONAIS
    println("### 05. Estruturas Condicionais ###")
    // if como expressão
    val userAge = 20
    val status = if (userAge >= 18) "Maior de idade" else "Menor de idade"
    println("Status: $status")

    // when como expressão
    val dia = 4
    val tipoDia = when (dia) {
        1, 7 -> "Fim de semana"
        in 2..6 -> "Dia de semana"
        else -> "Dia inválido"
    }
    println("Tipo do dia $dia: $tipoDia")
    println("---")


    // 06_ESTRUTURAS_DE_REPETIÇÃO
    println("### 06. Estruturas de Repetição ###")
    // for com range
    print("Loop 'for' com range: ")
    for (i in 1..5) {
        print("$i ")
    }
    println()

    // for com lista e index
    val frutas = listOf("Maçã", "Banana", "Morango")
    for ((index, fruta) in frutas.withIndex()) {
        println("Índice $index: $fruta")
    }

    // while
    var contador = 0
    print("Loop 'while': ")
    while (contador < 3) {
        print("$contador ")
        contador++
    }
    println()
    println("---")
}
