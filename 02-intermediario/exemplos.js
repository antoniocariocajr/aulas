// ==========================================
// JavaScript Intermediário – Exemplos Completos
// ==========================================

// 1. ARRAYS & OBJETOS
const nums = [1, 2, 3, 4];

// map, filter, reduce, find, forEach
const dobro = nums.map(n => n * 2);
const pares = nums.filter(n => n % 2 === 0);
const soma = nums.reduce((acc, n) => acc + n, 0);
const maiorQue2 = nums.find(n => n > 2);
nums.forEach(n => console.log("Número:", n));

// destructuring
const [a, b] = [10, 20];
const { nome, idade } = { nome: "Ana", idade: 25 };

// spread / rest
const nums2 = [...nums, 5, 6];
function somarTodos(...numeros) {
  return numeros.reduce((a, b) => a + b, 0);
}

// Object.keys / values / entries
const user = { nome: "Ana", idade: 25 };
console.log("keys:", Object.keys(user));
console.log("values:", Object.values(user));
console.log("entries:", Object.entries(user));

// JSON
const json = JSON.stringify(user);
const obj = JSON.parse(json);

// 2. FUNÇÕES AVANÇADAS
// arrow function
const multiplicar = (a, b) => a * b;

// callback
function executar(fn, valor) {
  return fn(valor);
}
console.log("Callback:", executar(n => n * 2, 5));

// higher-order function
function criarMultiplicador(fator) {
  return numero => numero * fator;
}
const triplo = criarMultiplicador(3);
console.log("Triplo:", triplo(4));

// closure
function contador() {
  let c = 0;
  return () => ++c;
}
const conta = contador();
console.log("Conta:", conta());
console.log("Conta:", conta());

// recursion
function fatorial(n) {
  return n <= 1 ? 1 : n * fatorial(n - 1);
}
console.log("Fatorial 5:", fatorial(5));

// 3. ASSINCRONISMO
// promise
const promessa = new Promise((resolve, reject) => {
  const sucesso = true;
  sucesso ? resolve("OK") : reject("Erro");
});
promessa
  .then(res => console.log("Promise:", res))
  .catch(err => console.error(err));

// async/await + fetch
async function buscarDados() {
  try {
    const res = await fetch("https://api.github.com/users/octocat");
    const data = await res.json();
    console.log("GitHub user:", data.login);
  } catch (err) {
    console.error(err);
  }
}
buscarDados();

// 4. DOM (exemplo simulado em Node não roda, mas pronto para browser)
// const btn = document.querySelector('.botao');
// btn.addEventListener('click', () => alert('Clicado!'));

// 5. ES6+ Features
// template literals
const nome2 = "Ana";
console.log(`Olá, ${nome2}!`);

// modules (exemplo sintático)
// export const soma = (a, b) => a + b;
// import { soma } from './utils.js';

// classes
class Pessoa {
  constructor(nome) {
    this.nome = nome;
  }
  saudar() {
    console.log(`Olá, ${this.nome}`);
  }
}
const p = new Pessoa("Ana");
p.saudar();

// default parameters
function saudar(nome = "Visitante") {
  console.log(`Olá, ${nome}`);
}
saudar();

// enhanced object literals
const nome3 = "Ana";
const idade2 = 25;
const user2 = { nome3, idade2 };
console.log("Enhanced object:", user2);