# 🏗️ SOLID + Design Patterns – **código limpo, manutenível e escalável** em Java

> **SOLID** = **5 princípios** para **classes coesas e desacopladas**  
> **Design Patterns** = **soluções testadas** para **problemas comuns** de **design**

---

## SOLID – **resumo rápido**

| Princípio | Sigla | O que evita? | Aplicação prática |
| ----------- | ------- | -------------- | ------------------- |
| **S**ingle Responsibility | **SRP** | classe faz **tudo** | **1 motivo para mudar** – **UserService** ≠ **EmailService** |
| **O**pen/Closed | **OCP** | **edita** código antigo | **extensão** via **herança/interface** – **nova regra** ≠ **alterar if** |
| **L**iskov Substitution | **LSP** | **quebra** ao substituir | **subclasse** **deve comportar-se** como **pai** – **não jogue exceção inesperada** |
| **I**nterface Segregation | **ISP** | **interface gorda** | **interfaces pequenas** – **Printable** ≠ **Scannable** |
| **D**ependency Inversion | **DIP** | **depende de concreto** | **dependa de abstrações** – **Repository interface** ≠ **MySQLRepository** |

---

## **Exemplo SOLID** – **calculadora de frete**

**Antes** – **viola SRP, OCP, DIP**:

```java
public class PedidoService {
    public double calcularFrete(Pedido p) {
        switch (p.getTipo()) {          // **viola OCP** – adicionar novo = editar
            case "Sedex":   return p.getPeso() * 1.5;
            case "PAC":     return p.getPeso() * 1.0;
            default: throw new IllegalArgumentException();
        }
    }
}
```

**Depois** – **SOLID**:

```java
public interface FreteStrategy {
    double calcular(Pedido pedido);
}

@Component
public class SedexFrete implements FreteStrategy {
    public double calcular(Pedido p) { return p.getPeso() * 1.5; }
}

@Component
public class PacFrete implements FreteStrategy {
    public double calcular(Pedido p) { return p.getPeso() * 1.0; }
}

@Service
public class PedidoService {
    private final Map<String, FreteStrategy> strategies;   // **DIP** – depende de abstração

    public PedidoService(List<FreteStrategy> list) {
        this.strategies = list.stream()
                              .collect(Collectors.toMap(s -> s.getClass().getSimpleName(),
                                                        Function.identity()));
    }

    public double calcularFrete(Pedido p) {
        return strategies.get(p.getTipo()).calcular(p);   // **OCP** – adicionar nova = criar classe
    }
}
```

---

## **Design Patterns** – **mais usados no dia-a-dia**

| Categoria | Pattern | Quando usar? | Exemplo rápido |
| ----------- | --------- | -------------- | ---------------- |
| **Criação** | **Factory** | **criar objeto** sem expor lógica | `FreteFactory.criar("Sedex")` |
| **Criação** | **Singleton** | **1 instância** global (cuidado!) | `ConfigHolder.INSTANCE` |
| **Criação** | **Builder** | **objeto complexo** com **parâmetros opcionais** | `Usuario.builder().nome("Ana").email("ana@mail.com").build()` |
| **Estrutural** | **Adapter** | **adapta interface** incompatível | `PaymentAdapter` → **PayPal SDK** |
| **Estrutural** | **Facade** | **simplifica** subsistema complexo | `ShopFacade.checkout()` → **estoque + pagamento + frete** |
| **Comportamental** | **Strategy** | **família de algoritmos** intercambiáveis | **FreteStrategy** – **Sedex/PAC/Retirada** |
| **Comportamental** | **Observer** | **notifica** vários objetos **sem acoplamento** | **EventListener** – **pedido pago → estoque + e-mail** |
| **Comportamental** | **Command** | **encapsula solicitação** como objeto | **CancelarPedidoCommand** – **desfaz passos** |
| **Comportamental** | **Chain of Responsibility** | **passa solicitação** pela **cadeia** até **tratamento** | **ValidadorCPF → ValidadorEmail → SalvarUsuario** |

---

## **Exemplo prático – Chain of Responsibility + Strategy**

**Problema**: **validar cadastro** **sem if gigante**.

**Chain** – **validações**:

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
```

**Chain Builder**:

```java
@Component
public class ValidacaoChainBuilder {

    private final List<Validador> validadores;

    public ValidacaoChainBuilder(List<Validador> list) {
        this.validadores = list;
    }

    public Validador build() {
        for (int i = 0; i < validadores.size() - 1; i++) {
            validadores.get(i).setProximo(validadores.get(i + 1));
        }
        return validadores.get(0);
    }
}
```

**Uso**:

```java
Validador chain = chainBuilder.build();
chain.validar(usuario);   // **executa todas as validações em sequência**
```

---

## **Arquitetura limpa** – **camadas + SOLID**

```BASH
📦 domain
  └─ entities, value objects, exceptions (sem dependências externas)
📦 application
  └─ use-cases, interfaces (inbound/outbound)
📦 infrastructure
  └─ controllers, repositories, config (Spring, JPA, REST)
```

**Dependency Rule**: **camadas internas NÃO dependem de externas** – **use interfaces (DIP)**.

**Exemplo**:  
**UseCase** → **UserRepository interface** ← **JpaUserRepositoryImpl**

---

## **Dicas práticas** – **dia-a-dia**

✅ **SRP** – **classe/método com 1 motivo para mudar**.  
✅ **OCP** – **extenda com novas classes**, **não edite if/else**.  
✅ **DIP** – **dependa de interfaces** – **facilita testes e mocks**.  
✅ **Use** **Builder** para **DTOs/Entidades** complexas.  
✅ **Aplique Strategy** para **regras/frete/cálculos**.  
✅ **Use** **Observer/Event** para **notificações/desacoplamento**.  

❌ **Evite** **Singleton com estado** – **prefira injeção de dependência**.  
❌ **Não use** **herança** para **reutilizar comportamento** – **prefira composição/composite**.  
❌ **Não deixe** **validações espalhadas** – **centralize com Chain ou Strategy**.

---

## **Resumo de 1 frase**

> **Aplique SOLID** para **classes coesas e desacopladas** e **use Design Patterns** (**Factory, Strategy, Builder, Chain, Observer**) para **resolver problemas recorrentes** – **resultado: código limpo, testável e pronto para crescer**.
