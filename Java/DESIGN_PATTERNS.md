# 🏗️ Design Patterns em Java – **guia prático com código**

> Padrões **mais usados no dia-a-dia** para **criar, estruturar e comportar** objetos **de forma limpa e escalável**.

---

## 🔤 **Categorias**  

**Criação** → como criar objetos  
**Estrutural** → como montar/combinar objetos  
**Comportamental** → como se comunicam

---

## ✅ **CRIAÇÃO**

### **Factory Method** – **cria sem expor lógica**

```java
public interface Frete {
    double calcular(Pedido p);
}

public class SedexFrete implements Frete {
    public double calcular(Pedido p) { return p.getPeso() * 1.5; }
}

public class PacFrete implements Frete {
    public double calcular(Pedido p) { return p.getPeso() * 1.0; }
}

@Component
public class FreteFactory {
    public Frete criar(String tipo) {
        return switch (tipo) {
            case "SEDEX" -> new SedexFrete();
            case "PAC"   -> new PacFrete();
            default      -> throw new IllegalArgumentException("Tipo inválido");
        };
    }
}
```

---

### **Abstract Factory** – **família de objetos**

```java
public interface GUIFactory {
    Botao criarBotao();
    Checkbox criarCheckbox();
}

public class WindowsFactory implements GUIFactory {
    public Botao criarBotao() { return new WindowsBotao(); }
    public Checkbox criarCheckbox() { return new WindowsCheckbox(); }
}
```

---

### **Builder** – **objeto complexo com parâmetros opcionais**

```java
public class User {
    private final String nome;
    private final String email;
    private final LocalDate nascimento;

    private User(Builder b) {
        this.nome = b.nome;
        this.email = b.email;
        this.nascimento = b.nascimento;
    }

    public static class Builder {
        private String nome;
        private String email;
        private LocalDate nascimento;

        public Builder nome(String nome) { this.nome = nome; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder nascimento(LocalDate nascimento) { this.nascimento = nascimento; return this; }
        public User build() { return new User(this); }
    }
}

// uso
User u = new User.Builder()
        .nome("Ana")
        .email("ana@mail.com")
        .nascimento(LocalDate.of(1990, 5, 15))
        .build();
```

**Lombok**: `@Builder` gera código acima.

---

### **Singleton** – **1 instância (use com cuidado)**

```java
public class ConfigHolder {
    private static final ConfigHolder INSTANCE = new ConfigHolder();
    private ConfigHolder() { }
    public static ConfigHolder getInstance() { return INSTANCE; }
}
```

**Preferência**: **injeto via Spring** (bean único) → **sem Singleton manual**.

---

## ✅ **ESTRUTURAL**

### **Adapter** – **interface incompatível**

```java
public interface PaymentGateway {
    void pay(BigDecimal amount);
}

// Adaptee (biblioteca externa)
public class PayPalSDK {
    public void makePayment(double value) { ... }
}

// Adapter
public class PayPalAdapter implements PaymentGateway {
    private final PayPalSDK sdk = new PayPalSDK();
    public void pay(BigDecimal amount) {
        sdk.makePayment(amount.doubleValue());
    }
}
```

---

### **Facade** – **simplifica subsistema complexo**

```java
public class ShopFacade {
    private final EstoqueService estoque;
    private final PagamentoService pagamento;
    private final FreteService frete;

    public void finalizarPedido(Pedido p) {
        estoque.reservar(p);
        pagamento.processar(p);
        frete.entregar(p);
    }
}
```

---

### **Composite** – **trata folha e galho igualmente**

```java
public interface Item {
    BigDecimal getPreco();
}

public class Produto implements Item {
    private BigDecimal preco;
    public BigDecimal getPreco() { return preco; }
}

public class Combo implements Item {
    private List<Item> itens = new ArrayList<>();
    public void add(Item i) { itens.add(i); }
    public BigDecimal getPreco() {
        return itens.stream().map(Item::getPreco).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
```

---

## ✅ **COMPORTAMENTAL**

### **Strategy** – **família de algoritmos intercambiáveis**

```java
public interface FreteStrategy {
    BigDecimal calcular(Pedido p);
}

@Component
public class SedexStrategy implements FreteStrategy {
    public BigDecimal calcular(Pedido p) { return p.getPeso().multiply(new BigDecimal("1.5")); }
}

@Service
public class FreteService {
    private final Map<String, FreteStrategy> strategies;

    public FreteService(List<FreteStrategy> list) {
        strategies = list.stream().collect(Collectors.toMap(s -> s.getClass().getSimpleName(), s -> s));
    }
    public BigDecimal calcular(String tipo, Pedido p) {
        return strategies.get(tipo).calcular(p);
    }
}
```

---

### **Observer** – **notificações desacopladas**

```java
public interface PedidoListener {
    void onPedidoFinalizado(Pedido p);
}

@Component
public class EstoqueListener implements PedidoListener {
    public void onPedidoFinalizado(Pedido p) { baixarEstoque(p); }
}

@Service
public class PedidoService {
    private final List<PedidoListener> listeners;

    public void finalizar(Pedido p) {
        // lógica
        listeners.forEach(l -> l.onPedidoFinalizado(p));
    }
}
```

**Spring Events** – **mesma ideia**:

```java
@EventListener
public void handle(PedidoFinalizadoEvent event) { ... }
```

---

### 🔟 **Chain of Responsibility** – **passa pela cadeia até tratamento**

```java
public interface Validador {
    void setProximo(Validador v);
    void validar(User u);
}

@Component
public class CpfValidador implements Validador {
    private Validador proximo;
    public void setProximo(Validador v) { this.proximo = v; }
    public void validar(User u) {
        if (!CPF.isValid(u.getCpf())) throw new DadosInvalidosException("CPF inválido");
        if (proximo != null) proximo.validar(u);
    }
}

// Builder da cadeia
@Component
public class ValidadorChainBuilder {
    private final List<Validador> validadores;
    public Validador build() {
        for (int i = 0; i < validadores.size() - 1; i++) {
            validadores.get(i).setProximo(validadores.get(i + 1));
        }
        return validadores.get(0);
    }
}
```

---

## **Builder + Singleton (Spring)** – **uso moderno**

**Spring já entrega**:

- **@Component / @Service** – **singleton gerenciado**  
- **@Configuration + @Bean** – **factory method**  
- **@Builder (Lombok)** – **builder pattern**  
- **@EventListener** – **observer**

**Exemplo**:

```java
@Configuration
public class AppConfig {

    @Bean
    public FreteStrategy sedexStrategy() {
        return new SedexStrategy();
    }

    @Bean
    public FreteService freteService(List<FreteStrategy> list) {
        return new FreteService(list);
    }
}
```

---

## **Dicas rápidas**

✅ **Prefira** **injeção de dependência** (Spring) **a Singleton manual**.  
✅ **Use** **Strategy** para **regras/cálculos** que **mudam frequente**.  
✅ **Use** **Builder** para **objetos complexos** (DTOs, entidades).  
✅ **Use** **Observer / Event** para **notificações desacopladas**.  
✅ **Chain of Responsibility** – **validações, filtros, middlewares**.  

❌ **Evite** **Singleton com estado** – **prefira @Component**.  
❌ **Não use** **Adapter** **sem necessidade** – **prefira biblioteca compatível**.  
❌ **Não exagere** – **padrão é ferramenta**, **não objetivo**.

---

## **Resumo**

> **Aplique padrões de criação (Factory, Builder), estruturais (Adapter, Facade, Composite) e comportamentais (Strategy, Observer, Chain)** para **resolver problemas recorrentes**, **desacoplar código** e **facilitar manutenção** – **use com moderação e preferência pelos que o framework (Spring) já entrega**.
