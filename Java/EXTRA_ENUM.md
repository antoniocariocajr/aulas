# 🔶 Enum (enumeração)

> Um `enum` é uma **classe especial** que representa **conjunto fixo de constantes** (dias, status, moedas, etc.).  
> **Imutável**, **thread-safe**, **pode ter campos, construtores, métodos e interfaces**.

---

## Criando enum simples

```java
public enum DiaDaSemana {
    SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO, DOMINGO
}
```

Uso:

```java
DiaDaSemana hoje = DiaDaSemana.SEGUNDA;
if (hoje == DiaDaSemana.SABADO || hoje == DiaDaSemana.DOMINGO) {
    System.out.println("Fim de semana");
}
```

**Comparação** usa `==` (seguro) ou `equals()`.

---

## Métodos herdados de `java.lang.Enum`

| Método | Descrição |
| -------- | ----------- |
| `String name()` | nome exato declarado (`"SEGUNDA"`) |
| `int ordinal()` | posição (0-based) |
| `static values()` | array com **todos** os valores |
| `static valueOf(String)` | converte string → enum |
| `toString()` | igual a `name()` (pode ser sobrescrito) |

Exemplo:

```java
for (DiaDaSemana d : DiaDaSemana.values()) {
    System.out.printf("%d - %s%n", d.ordinal(), d.name());
}
```

---

## Enum com **campos e construtor**

```java
public enum StatusPedido {
    NOVO(1, "Pedido realizado"),
    PAGO(2, "Pagamento confirmado"),
    ENVIADO(3, "Mercadoria enviada"),
    ENTREGUE(4, "Recebido pelo cliente"),
    CANCELADO(5, "Operação cancelada");

    private final int codigo;
    private final String descricao;

    StatusPedido(int codigo, String descricao) {
        this.codigo = codigo;
        this.descricao = descricao;
    }

    public int getCodigo() { return codigo; }
    public String getDescricao() { return descricao; }
}
```

Uso:

```java
StatusPedido s = StatusPedido.PAGO;
System.out.println(s.getCodigo() + " = " + s.getDescricao());
```

---

## Métodos e lógica dentro do enum

```java
public enum Operacao {
    SOMA {
        @Override
        public double aplicar(double x, double y) { return x + y; }
    },
    SUBTRACAO {
        @Override
        public double aplicar(double x, double y) { return x - y; }
    },
    MULTIPLICACAO {
        @Override
        public double aplicar(double x, double y) { return x * y; }
    },
    DIVISAO {
        @Override
        public double aplicar(double x, double y) { return x / y; }
    };

    public abstract double aplicar(double x, double y);
}
```

Exemplo:

```java
double resultado = Operacao.SOMA.aplicar(10, 5); // 15.0
```

---

## Busca por código/atributo (padrão comum)

```java
public enum StatusPedido {
    ...
    private static final Map<Integer, StatusPedido> map =
            Arrays.stream(values())
                  .collect(Collectors.toUnMap(s -> s.codigo, s -> s));

    public static StatusPedido porCodigo(int cod) {
        return map.get(cod); // null se não encontrar
    }
}
```

Uso:

```java
StatusPedido s = StatusPedido.porCodigo(3); // ENVIADO
```

---

## Implementando **interfaces**

```java
public interface Descritivel {
    String resumo();
}

public enum Prioridade implements Descritivel {
    ALTA {
        public String resumo() { return "Prioridade alta - urgente"; }
    },
    MEDIA {
        public String resumo() { return "Prioridade média - normal"; }
    },
    BAIXA {
        public String resumo() { return "Prioridade baixa - pode esperar"; }
    };
}
```

---

## switch com enum (sem break → Java 14+)

```java
public static String mensagem(DiaDaSemana d) {
    return switch (d) {
        case SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA -> "Dia útil";
        case SABADO, DOMINGO -> "Fim de semana";
    };
}
```

---

## Serialização & JSON

- **Enum é serializável por padrão** (serializa apenas o `name()`).  
- **Jackson/Gson** convertem **automaticamente** pela **constante** ou **@JsonProperty**.

---

## Comparando enums

```java
Prioridade p1 = Prioridade.ALTA;
Prioridade p2 = Prioridade.MEDIA;
p1.compareTo(p2); // < 0 (ordem declarada)
p1.equals(Prioridade.ALTA); // true
p1 == Prioridade.ALTA;      // true (singleton)
```

---

## Resumo de 1 frase

> `enum` é uma **classe imutável de constantes** que **possui nome, ordinal, valores próprios, construtor, métodos e até lógica** – **use-o sempre que o conjunto de valores for **fechado e conhecido** em tempo de compilação**.
