# 🔢 BigDecimal em Java – dinheiro, precisão & performance

> **Por que usar?** `float`/`double` usam **ponto flutuante binário** → **não representam decimais exatos** (0.1 vira 0.100000000000000005...).  
> `BigDecimal` armazena **número sem erro de arredondamento** – ideal para **dinheiro, impostos, juros, cálculos científicos**.

---

## Criando instâncias (use **String** ou **int**, **nunca double**)

```java
BigDecimal v1 = new BigDecimal("123.45");   // ✅ exato
BigDecimal v2 = BigDecimal.valueOf(123.45); // ✅ converte via String interna
BigDecimal v3 = new BigDecimal(123.45);     // ❌ já vem impreciso do double
BigDecimal v4 = BigDecimal.valueOf(123);    // int → sem problema
```

---

## Operações aritméticas (mudam escala só se necessário)

| Operação | Método | Exemplo |
| ---------- | -------- | --------- |
| **Soma** | `add(BigDecimal)` | `a.add(b)` |
| **Subtração** | `subtract(BigDecimal)` | `a.subtract(b)` |
| **Multiplicação** | `multiply(BigDecimal)` | `a.multiply(b)` |
| **Divisão** | `divide(BigDecimal, escala, modo)` | `a.divide(b, 4, RoundingMode.HALF_UP)` |
| **Resto** | `remainder(BigDecimal)` | `a.remainder(b)` |
| **Potência** | `pow(int n)` | `a.pow(2)` → a² |

**Divisão sem parâmetros** só funciona se **resultado for exato**; senão:

```java
BigDecimal a = new BigDecimal("10");
BigDecimal b = new BigDecimal("3");
BigDecimal c = a.divide(b, 4, RoundingMode.HALF_UP); // 3.3333
```

---

## Modos de arredondamento (enum `RoundingMode`)

| Modo | Significado |
| ------ | ------------- |
| `UP` | sempre para cima |
| `DOWN` | sempre para baixo (trunca) |
| `HALF_UP` | ≥ 0.5 sobe (modo **escolar**) |
| `HALF_DOWN` | > 0.5 sobe |
| `HALF_EVEN` | paridade par (bancário – **"round half to even"**) |
| `CEILING` | positivo sobe, negativo desce |
| `FLOOR` | positivo desce, negativo sobe |
| `UNNECESSARY` | **lança exceção** se houver dígito descartado |

---

## Comparando valores (nunca use `==`)

```java
BigDecimal x = new BigDecimal("1.20");
BigDecimal y = new BigDecimal("1.2");

x.equals(y)           // false – ESCALAS diferentes (1.20 vs 1.2)
x.compareTo(y) == 0   // true – valores iguais
x.compareTo(y) > 0    // x maior que y
```

---

## Escalas & arredondamento separado

```java
BigDecimal val = new BigDecimal("123.456789");

val.setScale(2, RoundingMode.HALF_UP);        // 123.46
val.setScale(0, RoundingMode.DOWN);           // 123
val.setScale(4, RoundingMode.HALF_EVEN);      // 123.4568
```

**Mudar escala sem arredondar** (se possível):

```java
val.setScale(4); // mesmo valor → devolve val
// senão: ArithmeticException
```

---

## Conversões

| Para tipo | Método |
| ----------- | -------- |
| `int` | `intValue()` (ou `intValueExact()` – checa perda) |
| `long` | `longValue()` / `longValueExact()` |
| `double` | `doubleValue()` (pode perder precisão) |
| `String` | `toPlainString()` (sem notação) ou `toString()` |
| `BigInteger` | `toBigInteger()` / `toBigIntegerExact()` |

```java
BigDecimal bd = new BigDecimal("123.456");
int i = bd.intValue();           // 123
double d = bd.doubleValue();     // 123.456
String s = bd.toPlainString();   // "123.456"
```

---

## Constantes úteis

```java
BigDecimal.ZERO      // 0
BigDecimal.ONE       // 1
BigDecimal.TEN       // 10
BigDecimal.valueOf(123, 2) // 1.23 (escala 2)
```

---

## Exemplo completo – **conta bancária com juros**

```java
BigDecimal saldo = new BigDecimal("1000.00");
BigDecimal taxa  = new BigDecimal("0.05");   // 5 % ao mês
int meses = 6;

// juros compostos: M = C * (1+i)^n
BigDecimal fator = BigDecimal.ONE.add(taxa).pow(meses);
BigDecimal montante = saldo.multiply(fator)
                            .setScale(2, RoundingMode.HALF_UP);

System.out.println("Montante: R$ " + montante); // R$ 1340.10
```

---

## Performance – quando **NÃO** usar

- **Cálculos científicos massivos** que **podem tolerar** erro de **1e-15** → `double` é **10× mais rápido**.  
- **Laços milionários** sem necessidade de precisão monetária → `double` ou `long` (centavos).  
- **Use BigDecimal** para **dinheiro, impostos, balanços, juros, KPIs financeiros**.

---

## Dicas & boas práticas

1. **Crie a partir de `String`** ou `int`/`long` – **nunca de `double`**.  
2. **Defina escala e modo** em toda **divisão ou setScale**.  
3. **Compare valores** com `compareTo()` – **nunca `equals()` para igualdade numérica**.  
4. **Reutilize** constantes (`ZERO`, `ONE`, `TEN`).  
5. **Armazene no BD** como `DECIMAL(p,s)` ou `NUMERIC` – **nunca `FLOAT`/`DOUBLE`**.  
6. **Use `BigInteger`** quando **não houver casas decimais** e os números forem **muito grandes**.

---

## Resumo de 1 frase

> `BigDecimal` é a **classe Java para números decimais exatos**: **crie com String**, **divida com escala+modo**, **compare com `compareTo()`** e **use para dinheiro** – **nunca use `double` quando o centavo importa**.
