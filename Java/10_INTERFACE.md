# **Conceito de Interface**

- **Definição**: Contrato que define um conjunto de métodos que uma classe deve implementar.
- **Diferenças da classe abstrata**:
  - Interface só pode ter métodos abstratos (até Java 8)
  - Uma classe pode implementar múltiplas interfaces
  - Interface não pode ter construtores
  - Todos os métodos são public por padrão

```java
// Definindo interface
public interface Veiculo {
    void ligar();
    void desligar();
    void acelerar(int velocidade);
    void frear();
    
    // Método default (a partir do Java 8)
    default void exibirInfo() {
        System.out.println("Este é um veículo.");
    }
}

// Interface com métodos estáticos
public interface Calculavel {
    double calcularPrecoFinal();
    
    // Método estático na interface
    static double aplicarDesconto(double preco, double desconto) {
        return preco * (1 - desconto);
    }
}

// Implementando interface
public class Carro implements Veiculo, Calculavel {
    private boolean ligado;
    private int velocidadeAtual;
    private double precoBase;
    
    public Carro(double precoBase) {
        this.precoBase = precoBase;
        this.ligado = false;
        this.velocidadeAtual = 0;
    }
    
    // Implementação dos métodos da interface Veiculo
    @Override
    public void ligar() {
        if (!ligado) {
            ligado = true;
            System.out.println("Carro ligado!");
        }
    }
    
    @Override
    public void desligar() {
        if (ligado) {
            ligado = false;
            velocidadeAtual = 0;
            System.out.println("Carro desligado!");
        }
    }
    
    @Override
    public void acelerar(int velocidade) {
        if (ligado) {
            velocidadeAtual += velocidade;
            System.out.println("Acelerando para " + velocidadeAtual + " km/h");
        }
    }
    
    @Override
    public void frear() {
        if (velocidadeAtual > 0) {
            velocidadeAtual -= 10;
            if (velocidadeAtual < 0) velocidadeAtual = 0;
            System.out.println("Freando... Velocidade atual: " + velocidadeAtual + " km/h");
        }
    }
    
    // Implementação do método da interface Calculavel
    @Override
    public double calcularPrecoFinal() {
        return Calculavel.aplicarDesconto(precoBase, 0.1); // 10% de desconto
    }
}

// Múltiplas interfaces
public interface Eletrico {
    void carregarBateria();
    double getNivelBateria();
}

public class CarroEletrico implements Veiculo, Eletrico {
    private boolean ligado;
    private int velocidadeAtual;
    private double nivelBateria;
    
    @Override
    public void ligar() {
        if (nivelBateria > 0) {
            ligado = true;
            System.out.println("Carro elétrico ligado!");
        } else {
            System.out.println("Bateria descarregada!");
        }
    }
    
    @Override
    public void desligar() {
        ligado = false;
        velocidadeAtual = 0;
        System.out.println("Carro elétrico desligado!");
    }
    
    @Override
    public void acelerar(int velocidade) {
        if (ligado && nivelBateria > 0) {
            velocidadeAtual += velocidade;
            nivelBateria -= 0.1;
            System.out.println("Acelerando para " + velocidadeAtual + " km/h");
        }
    }
    
    @Override
    public void frear() {
        if (velocidadeAtual > 0) {
            velocidadeAtual -= 10;
            if (velocidadeAtual < 0) velocidadeAtual = 0;
            System.out.println("Freando... Velocidade atual: " + velocidadeAtual + " km/h");
        }
    }
    
    @Override
    public void carregarBateria() {
        nivelBateria = 100;
        System.out.println("Bateria carregada completamente!");
    }
    
    @Override
    public double getNivelBateria() {
        return nivelBateria;
    }
}
```
