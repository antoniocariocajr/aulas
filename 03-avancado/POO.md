# Programação Orientada a Objetos (POO) no JavaScript

A POO é um paradigma que organiza o código em "Objetos" que combinam dados (propriedades) e comportamentos (métodos). No JavaScript moderno, usamos a sintaxe de `class`, que é uma forma mais amigável de trabalhar com protótipos.
**[Voltar para o teoria de avançado](./teoria.md)**

---

## 1. Classes e Construtores

A classe funciona como uma "planta" para criar objetos. O `constructor` é o método automático que roda ao criar uma nova instância com `new`.

```javascript
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    saudar() {
        console.log(`Olá, meu nome é ${this.nome}`);
    }
}
const p1 = new Pessoa("Antônio", 25);
```

---

## 2. Herança (`extends` e `super`)

Permite que uma classe herde características de outra, promovendo o reuso de código.

- **`super()`:** Deve ser chamado para executar o construtor da classe pai.

```javascript
class Desenvolvedor extends Pessoa {
    constructor(nome, idade, linguagem) {
        super(nome, idade);
        this.linguagem = linguagem;
    }
}
```

---

## 3. Encapsulamento (Campos Privados)

Protege dados internos para que não sejam alterados de fora da classe. No JS moderno, usamos o prefixo `#`.

```javascript
class ContaBancaria {
    #saldo = 0; // Privado

    depositar(valor) {
        this.#saldo += valor;
    }
    get saldo() {
        return this.#saldo;
    }
}
```

---

## 4. Protótipos (A Base de Tudo)

Diferente de Java ou C++, o JS é baseado em **Protótipos**. Toda função/classe tem um objeto `prototype` onde os métodos ficam guardados para economizar memória (todas as instâncias compartilham o mesmo método).

---

## 5. Boas Práticas

1. **Use `#` para dados sensíveis:** Se um valor não deve ser alterado diretamente, torne-o privado.
2. **Favor Composition over Inheritance:** Não crie heranças muito profundas (vô -> pai -> filho -> neto). As vezes é melhor ter objetos que contêm outros objetos.
3. **Getters e Setters:** Use para validar dados antes de atribuir valores às propriedades.
4. **Uma classe por arquivo:** Mantenha suas classes organizadas em módulos separados.
    `import { Usuario } from './models/Usuario.js'`
5. **Classes vs Objetos Literais:** Use classes quando precisar de múltiplas instâncias com lógica complexa. Para configurações simples, use objetos literais `{}`.
