# 📚 Conceitos Fundamentais da POO

## **Classe e Objeto**

- **Classe**: É um **modelo/blueprint** que define as características (atributos) e comportamentos (métodos) de um objeto.
- **Objeto**: É uma **instância concreta** de uma classe, com valores reais nos atributos.

```java
// Classe (modelo)
public class Carro {
    // Atributos (estado)
    String marca;
    String modelo;
    int ano;
    
    // Métodos (comportamento)
    void ligar() {
        System.out.println("Carro ligado!");
    }
    
    void acelerar() {
        System.out.println("Acelerando...");
    }
}

// Criando objetos
public class Main {
    public static void main(String[] args) {
        Carro meuCarro = new Carro(); // Instância
        meuCarro.marca = "Toyota";
        meuCarro.modelo = "Corolla";
        meuCarro.ano = 2022;
        
        meuCarro.ligar(); // Chamando método
    }
}
```

## **Encapsulamento**

- **Definição**: Ocultar os detalhes internos da classe, expondo apenas o necessário.
- **Benefícios**: Segurança, controle de acesso, facilidade de manutenção.
- **Implementação**: Usar modificadores de acesso (`private`, `public`, `protected`) e métodos getters/setters.

```java
public class ContaBancaria {
    // Atributos private - não acessíveis diretamente
    private String numeroConta;
    private double saldo;
    private String senha;
    
    // Construtor
    public ContaBancaria(String numeroConta, double saldoInicial, String senha) {
        this.numeroConta = numeroConta;
        this.saldo = saldoInicial;
        this.senha = senha;
    }
    
    // Getter público para saldo (apenas leitura)
    public double getSaldo() {
        return saldo;
    }
    
    // Setter com validação
    public void setSenha(String novaSenha) {
        if (novaSenha.length() >= 6) {
            this.senha = novaSenha;
        }
    }
    
    // Método público para sacar (controle de acesso)
    public boolean sacar(double valor, String senhaDigitada) {
        if (senhaDigitada.equals(this.senha) && valor <= saldo && valor > 0) {
            saldo -= valor;
            return true;
        }
        return false;
    }
}
```

## **Herança**

- **Definição**: Mecanismo onde uma classe (filha) herda atributos e métodos de outra classe (pai).
- **Benefícios**: Reutilização de código, polimorfismo, organização hierárquica.
- **Sintaxe**: Usa a palavra-chave `extends`.

```java
// Classe pai (superclasse)
public class Animal {
    protected String nome;
    protected int idade;
    
    public Animal(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }
    
    public void comer() {
        System.out.println(nome + " está comendo.");
    }
    
    public void dormir() {
        System.out.println(nome + " está dormindo.");
    }
}

// Classe filha (subclasse)
public class Cachorro extends Animal {
    private String raca;
    
    public Cachorro(String nome, int idade, String raca) {
        super(nome, idade); // Chama construtor da classe pai
        this.raca = raca;
    }
    
    // Método específico da subclasse
    public void latir() {
        System.out.println(nome + " está latindo: Au au!");
    }
    
    // Sobrescrevendo método da classe pai (polimorfismo)
    @Override
    public void comer() {
        System.out.println(nome + " está comendo ração de cachorro.");
    }
}

// Múltiplas subclasses
public class Gato extends Animal {
    public Gato(String nome, int idade) {
        super(nome, idade);
    }
    
    @Override
    public void comer() {
        System.out.println(nome + " está comendo peixe.");
    }
    
    public void miar() {
        System.out.println(nome + " está miando: Miau!");
    }
}
```

## **Polimorfismo**

- **Definição**: Capacidade de um objeto ser tratado como instâncias de diferentes tipos.
- **Tipos**:
  - **Polimorfismo de sobrescrita (override)**: Subclasse fornece implementação específica de método da superclasse.
  - **Polimorfismo de sobrecarga (overload)**: Múltiplos métodos com mesmo nome, mas parâmetros diferentes.

```java
// Polimorfismo de sobrescrita
public class TestePolimorfismo {
    public static void main(String[] args) {
        // Array de animais (polimorfismo)
        Animal[] animais = new Animal[3];
        animais[0] = new Cachorro("Rex", 3, "Golden");
        animais[1] = new Gato("Mimi", 2);
        animais[2] = new Animal("Generico", 1);
        
        // Chamando métodos polimórficos
        for (Animal animal : animais) {
            animal.comer(); // Cada um executa seu próprio método
            animal.dormir(); // Método da classe pai
        }
    }
}

// Polimorfismo de sobrecarga
public class Calculadora {
    // Métodos com mesmo nome, mas parâmetros diferentes
    public int somar(int a, int b) {
        return a + b;
    }
    
    public double somar(double a, double b) {
        return a + b;
    }
    
    public int somar(int a, int b, int c) {
        return a + b + c;
    }
}
```

## **Abstração**

- **Definição**: Processo de ocultar detalhes complexos e mostrar apenas a funcionalidade essencial.
- **Implementação**: Classes e métodos abstratos, interfaces.

```java
// Classe abstrata
public abstract class FormaGeometrica {
    protected String cor;
    
    public FormaGeometrica(String cor) {
        this.cor = cor;
    }
    
    // Método abstrato - deve ser implementado pelas subclasses
    public abstract double calcularArea();
    
    public abstract double calcularPerimetro();
    
    // Método concreto
    public void exibirInfo() {
        System.out.println("Cor: " + cor);
        System.out.println("Área: " + calcularArea());
        System.out.println("Perímetro: " + calcularPerimetro());
    }
}

// Subclasses concretas
public class Circulo extends FormaGeometrica {
    private double raio;
    
    public Circulo(String cor, double raio) {
        super(cor);
        this.raio = raio;
    }
    
    @Override
    public double calcularArea() {
        return Math.PI * raio * raio;
    }
    
    @Override
    public double calcularPerimetro() {
        return 2 * Math.PI * raio;
    }
}

public class Retangulo extends FormaGeometrica {
    private double largura;
    private double altura;
    
    public Retangulo(String cor, double largura, double altura) {
        super(cor);
        this.largura = largura;
        this.altura = altura;
    }
    
    @Override
    public double calcularArea() {
        return largura * altura;
    }
    
    @Override
    public double calcularPerimetro() {
        return 2 * (largura + altura);
    }
}
```

## 🏗️ **Composição vs Herança**

### **Composição**

- **Definição**: Uma classe contém uma referência a outra classe (relacionamento "tem-um").
- **Vantagem**: Maior flexibilidade, menos acoplamento que herança.

```java
// Exemplo de composição
public class Motor {
    private int potencia;
    private boolean ligado;
    
    public Motor(int potencia) {
        this.potencia = potencia;
        this.ligado = false;
    }
    
    public void ligar() {
        ligado = true;
        System.out.println("Motor ligado! Potência: " + potencia + " CV");
    }
    
    public void desligar() {
        ligado = false;
        System.out.println("Motor desligado!");
    }
}

public class CarroComposicao {
    private String marca;
    private String modelo;
    private Motor motor; // Composição: Carro TEM-UM Motor
    
    public CarroComposicao(String marca, String modelo, Motor motor) {
        this.marca = marca;
        this.modelo = modelo;
        this.motor = motor;
    }
    
    public void ligarCarro() {
        System.out.println("Ligando o carro " + marca + " " + modelo);
        motor.ligar(); // Delegando para o motor
    }
}

// Uso
public class TesteComposicao {
    public static void main(String[] args) {
        Motor motorV8 = new Motor(450);
        CarroComposicao meuCarro = new CarroComposicao("Ford", "Mustang", motorV8);
        meuCarro.ligarCarro();
    }
}
```

## 🧪 **Exemplo Prático Completo: Sistema de Funcionários**

```java
// Interface para pagamento
public interface Pagavel {
    double calcularSalario();
}

// Classe abstrata base
public abstract class Funcionario implements Pagavel {
    protected String nome;
    protected String cpf;
    protected int matricula;
    
    public Funcionario(String nome, String cpf, int matricula) {
        this.nome = nome;
        this.cpf = cpf;
        this.matricula = matricula;
    }
    
    // Método concreto comum
    public void exibirInfo() {
        System.out.println("Nome: " + nome);
        System.out.println("CPF: " + cpf);
        System.out.println("Matrícula: " + matricula);
    }
    
    // Método abstrato - deve ser implementado pelas subclasses
    public abstract double getBonificacao();
}

// Subclasse concreta
public class FuncionarioHorista extends Funcionario {
    private double valorHora;
    private int horasTrabalhadas;
    
    public FuncionarioHorista(String nome, String cpf, int matricula, 
                             double valorHora, int horasTrabalhadas) {
        super(nome, cpf, matricula);
        this.valorHora = valorHora;
        this.horasTrabalhadas = horasTrabalhadas;
    }
    
    @Override
    public double calcularSalario() {
        return valorHora * horasTrabalhadas;
    }
    
    @Override
    public double getBonificacao() {
        return calcularSalario() * 0.1; // 10% de bonificação
    }
}

// Outra subclasse
public class FuncionarioMensalista extends Funcionario {
    private double salarioMensal;
    
    public FuncionarioMensalista(String nome, String cpf, int matricula, 
                                double salarioMensal) {
        super(nome, cpf, matricula);
        this.salarioMensal = salarioMensal;
    }
    
    @Override
    public double calcularSalario() {
        return salarioMensal;
    }
    
    @Override
    public double getBonificacao() {
        return salarioMensal * 0.15; // 15% de bonificação
    }
}

// Sistema de gerenciamento
public class SistemaFuncionarios {
    private List<Funcionario> funcionarios;
    
    public SistemaFuncionarios() {
        funcionarios = new ArrayList<>();
    }
    
    public void adicionarFuncionario(Funcionario f) {
        funcionarios.add(f);
    }
    
    public void processarFolhaPagamento() {
        System.out.println("=== FOLHA DE PAGAMENTO ===");
        for (Funcionario f : funcionarios) {
            f.exibirInfo();
            System.out.println("Salário: R$ " + f.calcularSalario());
            System.out.println("Bonificação: R$ " + f.getBonificacao());
            System.out.println("Total a receber: R$ " + 
                             (f.calcularSalario() + f.getBonificacao()));
            System.out.println("----------------------");
        }
    }
    
    public static void main(String[] args) {
        SistemaFuncionarios sistema = new SistemaFuncionarios();
        
        // Adicionando funcionários de diferentes tipos
        sistema.adicionarFuncionario(
            new FuncionarioHorista("João", "123.456.789-00", 1001, 50.0, 160)
        );
        
        sistema.adicionarFuncionario(
            new FuncionarioMensalista("Maria", "987.654.321-00", 1002, 5000.0)
        );
        
        sistema.adicionarFuncionario(
            new FuncionarioHorista("Pedro", "111.222.333-44", 1003, 60.0, 140)
        );
        
        // Processando pagamento
        sistema.processarFolhaPagamento();
    }
}
```

## 📋 **Resumo dos 4 Pilares da POO**

| Pilar | Definição | Exemplo Java |
| ------- | ----------- | -------------- |
| **Abstração** | Mostrar apenas o essencial, ocultar complexidade | Classes abstratas e interfaces |
| **Encapsulamento** | Proteger dados com modificadores de acesso | `private` + getters/setters |
| **Herança** | Reutilizar código de classe pai | `extends` e `implements` |
| **Polimorfismo** | Mesmo método comportar-se de formas diferentes | Sobrescrita (@Override) e sobrecarga |
