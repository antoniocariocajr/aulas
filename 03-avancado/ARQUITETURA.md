# Arquitetura e Design Patterns

Design Patterns são soluções comprovadas para problemas comuns de software. Usá-los torna seu código mais escalável, sustentável e fácil de entender para outros desenvolvedores.

---

## 1. Module Pattern (Módulos)

O JavaScript moderno (`import/export`) já implementa o padrão de módulos nativamente, garantindo encapsulamento e separação de responsabilidades.

---

## 2. Singleton Pattern

Garante que uma classe tenha apenas **uma única instância** em todo o sistema. Útil para gerenciadores de estado, caches ou conexões de banco de dados.

```javascript
class Database {
    constructor() {
        if (Database.instance) return Database.instance;
        Database.instance = this;
    }
}
```

---

## 3. Factory Pattern (Fábrica)

Diferente do `new`, a Factory é uma função que decide qual objeto criar e retornar baseado em condições dinâmicas.

```javascript
function criarNotificacao(tipo) {
    if (tipo === 'email') return new EmailService();
    if (tipo === 'sms') return new SMSService();
}
```

---

## 4. Observer Pattern (Observador)

Permite que um objeto notifique vários outros objetos quando algo acontece (ex: Cliques, mudanças de estado no Redux, eventos do sistema).

---

## 5. MVC e Arquiteturas Modernas

- **MVC (Model-View-Controller):** Separa os dados (Model), a interface (View) e a lógica de controle (Controller).
- **Component Based:** Abordagem moderna usada pelo React/Vue, onde a UI é dividida em pequenas peças independentes que gerenciam seu próprio estado.

---

## 6. Boas Práticas

1. **Não sobrecarregue com padrões:** Só use um design pattern se ele realmente resolver um problema de complexidade. Não torne o simples complicado.
2. **Desacoplamento:** Tente fazer com que uma parte do código não dependa excessivamente de detalhes internos de outra.
3. **KISS (Keep It Simple, Stupid):** A melhor arquitetura é aquela que qualquer pessoa da equipe consegue entender rapidamente.
4. **Princípio da Responsabilidade Única (SRP):** Um arquivo ou classe deve ter apenas um motivo para mudar.
