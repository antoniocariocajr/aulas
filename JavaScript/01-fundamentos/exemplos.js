/**
 * JAVASCRIPT FUNDAMENTALS - EXEMPLOS PRÁTICOS
 * Rode este arquivo com: node 01-fundamentos/exemplos.js
 */

// --- 1. HOISTING E ESCOPO ---
console.log("--- 1. Hoisting ---");
console.log("varAntes:", varNome); // undefined
var varNome = "Antônio";

try {
  console.log(letNome); // Erro!
} catch (e) {
  console.log("letAntes: Erro de inicialização (TDZ)");
}
let letNome = "Antônio";


// --- 2. CÓPIA POR VALOR VS REFERÊNCIA ---
console.log("\n--- 2. Valor vs Referência ---");
let a = 10;
let b = a;
b = 20;
console.log(`Primitivo: a=${a}, b=${b} (Cópia independente)`);

let obj1 = { valor: 10 };
let obj2 = obj1;
obj2.valor = 20;
console.log(`Objeto: obj1=${obj1.valor}, obj2=${obj2.valor} (Mesma referência!)`);

// Como copiar de verdade?
let obj3 = { ...obj1 };
obj3.valor = 30;
console.log(`Objeto (Spread): obj1=${obj1.valor}, obj3=${obj3.valor} (Cópia independente)`);


// --- 3. COERÇÃO E IGUALDADE ---
console.log("\n--- 3. Coerção ---");
console.log("5 == '5':", 5 == '5');  // true
console.log("5 === '5':", 5 === '5'); // false
console.log("'' == 0:", '' == 0);    // true (perigoso!)


// --- 4. O MISTÉRIO DO 'THIS' ---
console.log("\n--- 4. This em Arrow vs Normal ---");
const testeThis = {
  nome: "ScopeTest",
  normal: function () {
    console.log("Normal this:", this.nome);
  },
  arrow: () => {
    // Arrow herda do escopo global/pai aqui
    console.log("Arrow this:", this ? this.nome : "undefined (global)");
  }
};
testeThis.normal();
testeThis.arrow();


// --- 5. CURTO-CIRCUITO ---
console.log("\n--- 5. Curto-Circuito ---");
const usuario = "Antônio";
const saudacao = usuario || "Anônimo";
console.log("Saudação:", saudacao);

let logado = true;
logado && console.log("Usuário está logado e viu esta mensagem!");