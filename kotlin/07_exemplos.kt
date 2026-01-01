// 07_exemplos.kt

// Definição de uma data class simples para ser usada nos exemplos
data class Pessoa(val nome: String, val idade: Int)

fun main() {
    println("--- Arrays ---")
    // Arrays têm tamanho fixo e podem ser de tipos primitivos ou genéricos
    val numerosPrimitivos = intArrayOf(10, 20, 30, 40, 50)
    val nomes = arrayOf("Alice", "Bob", "Carlos")

    // Acesso e modificação por índice
    numerosPrimitivos[0] = 5
    println("Primeiro número: ${numerosPrimitivos[0]}") // 5
    println("Primeiro nome: ${nomes[0]}") // Alice

    // Iteração
    for (nome in nomes) {
        print("$nome ")
    }
    println()

    // Ordenação (modifica o array original)
    val numerosDesordenados = intArrayOf(3, 1, 2)
    numerosDesordenados.sort()
    println("Array ordenado: ${numerosDesordenados.joinToString()}") // 1, 2, 3


    println("\n--- Listas ---")
    // Lista imutável (somente leitura)
    val listaImutavel = listOf("Maçã", "Banana", "Laranja")
    println("Lista imutável: $listaImutavel")
    // listaImutavel.add("Uva") // Erro de compilação

    // Lista mutável
    val listaMutavel = mutableListOf("Cachorro", "Gato")
    listaMutavel.add("Pássaro") // Adiciona no final
    listaMutavel.add(0, "Peixe") // Adiciona em um índice específico
    listaMutavel.remove("Gato")
    println("Lista mutável: $listaMutavel")


    println("\n--- Sets ---")
    // Conjunto (não permite duplicatas e, por padrão, mantém a ordem de inserção)
    val setMutavel = mutableSetOf<String>()
    setMutavel.add("Vermelho")
    setMutavel.add("Verde")
    val adicionou = setMutavel.add("Vermelho") // Tenta adicionar um elemento duplicado

    println("Adicionou 'Vermelho' de novo? $adicionou") // false
    println("Conjunto: $setMutavel")
    println("O conjunto contém 'Verde'? ${"Verde" in setMutavel}") // true


    println("\n--- Maps ---")
    // Mapa (chave-valor)
    val mapaMutavel = mutableMapOf<String, String>()
    mapaMutavel["BR"] = "Brasil" // Adiciona ou atualiza
    mapaMutavel["PT"] = "Portugal"
    mapaMutavel.put("DE", "Alemanha") // Método alternativo

    println("Capital de BR: ${mapaMutavel["BR"]}")
    println("Mapa completo: $mapaMutavel")

    // Iterar sobre um mapa
    for ((chave, valor) in mapaMutavel) {
        println("Chave: $chave, Valor: $valor")
    }


    println("\n--- Pilha (Stack) com ArrayDeque ---")
    val pilha = ArrayDeque<String>()
    pilha.addLast("Primeiro livro") // Empilha
    pilha.addLast("Segundo livro")
    println("Topo da pilha: ${pilha.last()}") // Olha o topo
    val livroRemovido = pilha.removeLast() // Desempilha
    println("Livro removido: $livroRemovido")
    println("Pilha agora: $pilha")


    println("\n--- Fila (Queue) com ArrayDeque ---")
    val fila = ArrayDeque<String>()
    fila.addLast("Pessoa A") // Enfileira
    fila.addLast("Pessoa B")
    println("Primeiro da fila: ${fila.first()}")
    val pessoaAtendida = fila.removeFirst() // Desenfileira
    println("Pessoa atendida: $pessoaAtendida")
    println("Fila agora: $fila")


    println("\n--- Funções de Coleção Idiomáticas ---")
    val pessoas = listOf(
        Pessoa("Ana", 25),
        Pessoa("Bruno", 30),
        Pessoa("Carla", 25)
    )

    // filter: seleciona elementos que correspondem a um predicado
    val pessoasCom25Anos = pessoas.filter { it.idade == 25 }
    println("Pessoas com 25 anos: $pessoasCom25Anos")

    // map: transforma cada elemento da coleção
    val nomesDasPessoas = pessoas.map { it.nome }
    println("Nomes: $nomesDasPessoas")

    // groupBy: agrupa elementos por uma chave
    val pessoasPorIdade = pessoas.groupBy { it.idade }
    println("Pessoas agrupadas por idade: $pessoasPorIdade")

    // find: encontra o primeiro elemento que corresponde a um predicado
    val primeiraPessoaCom25 = pessoas.find { it.idade == 25 }
    println("Primeira pessoa com 25 anos: $primeiraPessoaCom25")
}
