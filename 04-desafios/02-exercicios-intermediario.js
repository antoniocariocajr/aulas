/**
 * DESAFIO 02: INTERMEDIÁRIO
 * 
 * Objetivo: Praticar Métodos de Array, Destructuring e Assincronismo.
 */

const usuarios = [
    { id: 1, nome: "Alice", idade: 25, ativo: true },
    { id: 2, nome: "Bob", idade: 30, ativo: false },
    { id: 3, nome: "Charlie", idade: 35, ativo: true },
];

// 1. Use o método .filter() para pegar apenas os usuários ATIVOS.
// TODO: const ativos = ...

// 2. Use o método .map() para criar um array contendo apenas os NOMES dos usuários ativos.
// TODO: const nomesAtivos = ...

// 3. Use destructuring para extrair o nome do primeiro usuário do array 'usuarios'.
// TODO: Seu código aqui

// 4. Crie uma função assíncrona que simule a busca de um usuário pelo ID usando Promise e setTimeout.
async function buscarUsuario(id) {
    // TODO: Implemente uma Promise que resolve após 1 segundo
}

// TESTES (não mexa aqui)
// buscarUsuario(1).then(console.log);
