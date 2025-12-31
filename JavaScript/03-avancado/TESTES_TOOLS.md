# Testes e Ferramentas Modernas de Desenvolvimento

No desenvolvimento profissional, o código deve ser confiável e o ambiente de trabalho deve ser eficiente. Aqui exploramos como garantir a qualidade através de testes e como usar ferramentas de build modernas.
**[Voltar para o teoria de avançado](./teoria.md)**

---

## 1. Pirâmide de Testes

1. **Testes Unitários:** Testam a menor unidade possível (uma função pura). São rápidos e baratos.
2. **Testes de Integração:** Verificam se diferentes módulos funcionam bem juntos (ex: serviço + banco de dados).
3. **Testes E2E (End-to-End):** Simulam o comportamento do usuário no navegador (ex: Cypress, Playwright).

---

## 2. Conceitos de Teste (Mock, Stub, Spy)

- **Mock:** Um objeto falso que simula o comportamento de um real para isolar o teste.
- **Stub:** Uma versão simplificada que retorna um valor fixo.
- **Spy:** Observa se uma função foi chamada, com quais argumentos e quantas vezes.

---

## 3. TDD (Test Driven Development)

É a prática de escrever o teste **antes** do código da funcionalidade.

- **Ciclo:** Falha (Vermelho) -> Passa (Verde) -> Refatora (Azul).

---

## 4. Ferramentas de Build (Bundlers)

Transformam seu código moderno, módulos e ativos em arquivos otimizados para o navegador.

- **Vite:** A ferramenta mais rápida e moderna atualmente.
- **Webpack:** O padrão da indústria para projetos legados e complexos.
- **Babel:** Transpila código novo (ES6+) para versões antigas compatíveis com navegadores obsoletos.

---

## 5. Boas Práticas

1. **Não teste detalhes de implementação:** Foque em testar o **resultado** esperado para o usuário. Se você mudar a lógica interna mas o resultado for o mesmo, o teste não deve quebrar.
2. **Automação:** Rode seus testes automaticamente em cada *Pull Request* (CI/CD).
3. **Linting e Formatação:** Use **ESLint** e **Prettier** para garantir que todo o time siga o mesmo padrão de código.
4. **Minimalismo nas Dependências:** Só instale bibliotecas se elas realmente agregarem valor. Cada pacote a mais é um risco de segurança e peso no bundle.
