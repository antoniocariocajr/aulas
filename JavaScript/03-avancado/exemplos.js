/******************** JavaScript Avançado – Snippets ********************/

// 1. POO
class Conta {
  #saldo;
  constructor(titular, saldo = 0) {
    this.titular = titular;
    this.#saldo = saldo;
  }
  depositar(v) { this.#saldo += v; return this; }
  getSaldo() { return this.#saldo; }
}
class ContaVIP extends Conta {
  #bonus = 1.05;
  depositar(v) { super.depositar(v * this.#bonus); return this; }
}
const c = new ContaVIP('Ana');
console.log('POO Saldo VIP:', c.depositar(100).getSaldo()); // 105

// 2. Funcional
const compose = (f, g) => x => f(g(x));
const add1 = x => x + 1, mul2 = x => x * 2;
console.log('Composição:', compose(mul2, add1)(5)); // 12
const mul = a => b => a * b;
console.log('Currying:', mul(3)(10)); // 30

// 3. Patterns
class EventHub {
  constructor() { this.events = {}; }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); }
  emit(evt, data) { (this.events[evt] || []).forEach(f => f(data)); }
}
const hub = new EventHub();
hub.on('login', u => console.log('Observer recebeu:', u));
hub.emit('login', 'Ana');

// Factory
const criarPessoa = tipo =>
  ({ tipo, calcularSalario: () => (tipo === 'aluno' ? 0 : 5000) });
console.log('Factory salário:', criarPessoa('professor').calcularSalario());

// 4. Performance
const debounce = (fn, t = 300) => {
  let id;
  return (...a) => { clearTimeout(id); id = setTimeout(() => fn(...a), t); };
};
const memoize = f => {
  const c = new Map();
  return (...a) => {
    const k = JSON.stringify(a);
    return c.has(k) ? c.get(k) : (c.set(k, f(...a)), c.get(k));
  };
};
const fib = memoize(n => (n <= 1 ? n : fib(n - 1) + fib(n - 2)));
console.log('Fib memoized(40):', fib(40)); // ~102334155 rápido

// 5. Testing (exemplo síntese – rodar com Jest)
// math.test.js  ->  expect(add(2,3)).toBe(5)

// 6. Ferramentas (comandos comentados)
// npm create vite@latest app --template vanilla-ts
// npm i axios eslint jest -D

/***************************** Fim do arquivo *****************************/