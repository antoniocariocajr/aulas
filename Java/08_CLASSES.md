# Introdução

Em Java, uma classe é o "molde" ou "planta" que define os atributos (características) e métodos (comportamentos) de um objeto. Em 2025, o conceito de classes continua sendo a base da Programação Orientada a Objetos (POO), mas com simplificações significativas introduzidas nas versões mais recentes, como o Java 25 (LTS).

## Estrutura de uma Classe Tradicional

Uma classe comum é composta por **modificadores**, a palavra-chave class, nome, **atributos**, **construtores** e **métodos**.

```java
public class Pessoa {
    /* 1. ATRIBUTOS */
    private String nome;
    private int idade;

    /* 2. CONSTRUTORES */
    public Pessoa() { }                         // vazio
    public Pessoa(String nome, int idade) {     // cheio
        this.nome = nome;
        this.idade = idade;
    }

    /* 3. MÉTODOS */
    // getters & setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    // comportamento
    public void fazerAniversario() {
        idade++;
        System.out.println(nome + " agora tem " + idade + " anos.");
    }
}
```

## **Modificadores de Acesso**

São palavras chaves que vão definir o nivel de acesso a uma Classe, Atributos, construtores ou Métodos.

| tipo | descrição |
| :--- | :--- |
| public | Acesso total por qualquer outra classe. |
| private | Acesso restrito apenas à própria classe. |
| protected | Acesso pela mesma classe, pelo mesmo pacote ou por subclasses. |
| default (sem modificador) | Acesso apenas por classes do mesmo pacote. |

---

## **Atributos**

São as **variáveis de instância ou de classe** que representam o **estado** (dados) de um objeto – *“o que a classe sabe / guarda”*.

| Tipo | Explicação | Exemplo |
| ------ | ------------ | --------- |
| **De instância** | Cada objeto tem seu próprio valor | `String nome;` |
| **De classe (static)** | Um único valor compartilhado por todos os objetos | `static int quantidade;` |
| **Constante** | Valor fixo | `final double PI = 3.1416;` |

```java
public class Produto {
    // atributos de instância
    private String descricao;
    private double preco;
    private int estoque;

    // atributo de classe (compartilhado)
    private static int contadorProdutos = 0;
}
```

---

## **Construtores**

Bloco especial **executado uma única vez** quando usamos `new` – *“como nasce um objeto”*.  
Responsável por **inicializar os atributos** e **garantir que o objeto comece válido**.

| Regra | Detalhe |
| ------- | --------- |
| Nome | **Igual ao nome da classe** |
| Retorno | **Não tem retorno** (nem `void`) |
| Polimorfismo | Podem existir **vários** (sobrecarga) |
| Padrão | Se você **não escrever nenhum**, o Java cria o **construtor padrão vazio** |

```java
public class Produto {
    private String descricao;
    private double preco;

    /* ---- Construtores ---- */
    // 1. padrão (sem argumentos)
    public Produto() {
        this("Sem descrição", 0.0);
    }

    // 2. com argumentos
    public Produto(String descricao, double preco) {
        this.descricao = descricao;
        this.preco = preco;
    }
}
```

---

## **Métodos**

São as **funções** que representam **comportamentos** ou **serviços** oferecidos pelo objeto, – *“o que a classe faz / comporta-se”*.

| Tipo | Exemplo | Objetivo |
| ------ | --------- | ---------- |
| **Getter/Setter** | `getPreco()` / `setPreco(double p)` | acessar/modificar atributos privados |
| **Regra de negócio** | `double calcularDesconto(double pct)` | implementar lógica |
| **Sobrescrita** | `@Override public String toString()` | mudar comportamento herdado |
| **Classe (static)** | `static double converterMoeda(...)` | utilitário, não precisa de objeto |

```java
public class Produto {
    private String descricao;
    private double preco;

    /* ---- Métodos ---- */
    // getter
    public double getPreco() {
        return preco;
    }

    // setter com validação
    public void setPreco(double novoPreco) {
        if (novoPreco >= 0) preco = novoPreco;
    }

    // regra de negócio
    public double calcularDesconto(int percentual) {
        return preco * (100 - percentual) / 100;
    }

    // sobrescrita de Object.toString()
    @Override
    public String toString() {
        return descricao + " – R$ " + preco;
    }
}
```

## **Instância**

**Instância** = **objeto concreto** criado a partir de um **modelo** (a classe).  
Pense na classe como o **molde** e na instância como o **bolo pronto**.
> **Instância de classe** é o **objeto real** que foi **construído na memória** a partir da **classe-definição**.

---

### **Analogia rápida**

| Classe (molde)              | Instância (objeto real)          |
|-----------------------------|----------------------------------|
|`class Carro { ... }`        |`meuCarro = new Carro();`         |
| descreve **como** é um carro|**um** carro específico na memória|

---

### **Na prática – passo a passo**

```java
// 1. molde (classe)
public class Carro {
    String modelo;
    void ligar() { ... }
}

// 2. criando uma instância
Carro meuCarro = new Carro();  // ← objeto alocado na memória heap
meuCarro.modelo = "Fusca";
meuCarro.ligar();
```

- `meuCarro` **não** é a classe; é uma **referência** para o objeto recém-criado.  
- Você pode ter **quantas instâncias quiser** a partir da mesma classe:

```java
Carro carro1 = new Carro();
Carro carro2 = new Carro();
// carro1 e carro2 são instâncias DISTINTAS (objetos diferentes)
```
