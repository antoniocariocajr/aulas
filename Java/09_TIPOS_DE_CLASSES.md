# Introdução

- É um **modelo/blueprint** que define as características (atributos) e comportamentos (métodos) de um objeto.

## **Classe Abstrata**

- **Definição**: Classe que **não pode ser instanciada** diretamente. Serve como modelo para outras classes.
- **Regras**:
  - Pode conter métodos abstratos (sem corpo) e métodos concretos (com corpo).
  - Uma classe que herda uma classe abstrata **deve implementar todos os métodos abstratos**.
- **Exemplo**:

  ```java
  abstract class Animal {
      abstract void fazerSom(); // Método abstrato
      void dormir() {          // Método concreto
          System.out.println("Dormindo...");
      }
  }

  class Cachorro extends Animal {
      void fazerSom() {        // Implementação obrigatória
          System.out.println("Au au!");
      }
  }
  ```

---

## **Classe Final**

- **Definição**: Classe que **não pode ser herdada**.
- **Uso**: Previne que outras classes estendam seu comportamento.
- **Exemplo**:

  ```java
  final class Constantes {
      static final double PI = 3.1416;
  }

  // class Erro extends Constantes { } // ❌ ERRO: Não pode herdar de classe final
  ```

---

## **Classe Interna (Inner Class)**

- **Definição**: Classe definida **dentro de outra classe**.
- **Tipos**:
  - **Membro interna**: Definida no nível da classe externa.
  - **Estática (nested)**: Pertence à classe externa, não à instância.
  - **Local**: Definida dentro de um método.
  - **Anônima**: Sem nome, usada para implementar interfaces ou estender classes rapidamente.
- **Exemplo (classe interna anônima)**:

  ```java
  interface Clique {
      void clicar();
  }

  public class Botao {
      public void adicionarClique(Clique c) {
          c.clicar();
      }

      public static void main(String[] args) {
          Botao b = new Botao();
          b.adicionarClique(new Clique() { // Classe anônima
              public void clicar() {
                  System.out.println("Botão clicado!");
              }
          });
      }
  }
  ```

---

## **Classe Enum**

- **Definição**: Tipo especial de classe que representa **um conjunto fixo de constantes**.
- **Uso**: Ideal para representar dias da semana, estados, níveis, etc.
- **Exemplo**:

  ```java
  enum DiaDaSemana {
      SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO, DOMINGO
  }

  public class TesteEnum {
      public static void main(String[] args) {
          DiaDaSemana hoje = DiaDaSemana.SEXTA;
          System.out.println("Hoje é: " + hoje);
      }
  }
  ```

---

## **Classe de Registro (Record)**

- **Definição**: Introduzida no Java 14, é uma **classe imutável** que automaticamente gera construtores, getters, `equals()`, `hashCode()` e `toString()`.
- **Uso**: Ideal para **dados simples e imutáveis**.
- **Exemplo**:

  ```java
  record Pessoa(String nome, int idade) {}

  public class TesteRecord {
      public static void main(String[] args) {
          Pessoa p = new Pessoa("Ana", 30);
          System.out.println(p.nome()); // Ana
      }
  }
  ```

---

## **Classe Singleton**

- **Padrão de projeto**: Garante que **uma classe tenha apenas uma única instância** em toda a aplicação.
- **Implementação comum**:

  ```java
  public class Configuracao {
      private static Configuracao instancia;

      private Configuracao() {} // Construtor privado

      public static Configuracao getInstancia() {
          if (instancia == null) {
              instancia = new Configuracao();
          }
          return instancia;
      }
  }
  ```

---

## Resumo Visual

| Tipo         | Principal Característica                             |
|--------------|------------------------------------------------------|
| Abstrata     | Não pode ser instanciada, pode ter métodos abstratos |
| Final        | Não pode ser herdada                                 |
| Interna      | Definida dentro de outra classe                      |
| Enum         | Conjunto fixo de constantes                          |
| Record       | Classe imutável com menos código                     |
| Singleton    | Apenas uma instância permitida                       |
