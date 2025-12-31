# 🧮 Classe Math

> `Math` é **final** com **construtor privado** – **todos métodos/fields são static** → **use direto**: `Math.abs(x)`, `Math.PI`...

---

## Constantes mais usadas

| Constante | Valor aprox. | Uso |
| --------- | -------------- | ----- |
| `Math.PI` | 3.141592653589793 | círculos, trigonométricas |
| `Math.E` | 2.718281828459045 | exponenciais, log naturais |

---

## **Valor absoluto / arredondamento / extremes**

| Método | Retorno | Exemplo |
| -------- | --------- | --------- |
| `abs(int/double/float/long)` | valor positivo | `Math.abs(-5) → 5` |
| `ceil(double)` | **teto** (≥) | `Math.ceil(3.1) → 4.0` |
| `floor(double)` | **piso** (≤) | `Math.floor(3.9) → 3.0` |
| `round(double)` | `long` (0.5 sobe) | `Math.round(3.5) → 4` |
| `rint(double)` | `double` **sem decimais** | `Math.rint(3.7) → 4.0` |
| `max(a, b)` | **maior** | `Math.max(7, 3) → 7` |
| `min(a, b)` | **menor** | `Math.min(2.5, 8) → 2.5` |

---

## **Potência, raiz, log, exp**

| Método | Descrição | Exemplo |
| -------- | ----------- | --------- |
| `pow(a, b)` | a elevado a b | `Math.pow(2, 8) → 256.0` |
| `sqrt(double)` | raiz quadrada | `Math.sqrt(9) → 3.0` |
| `cbrt(double)` | raiz cúbica | `Math.cbrt(27) → 3.0` |
| `exp(double)` | e^x | `Math.exp(1) → 2.718...` |
| `log(double)` | **log natural** ln(x) | `Math.log(Math.E) → 1.0` |
| `log10(double)` | log base 10 | `Math.log10(100) → 2.0` |

---

## **Trigonometria (radianos!)**

| Método | Entrada / Saída | Exemplo |
| -------- | ----------------- | --------- |
| `sin(double)` | seno (rad) | `Math.sin(Math.PI/2) → 1.0` |
| `cos(double)` | cosseno | `Math.cos(0) → 1.0` |
| `tan(double)` | tangente | `Math.tan(Math.PI/4) → 1.0` |
| `asin / acos / atan(double)` | arco (radianos) | `Math.asin(1) → 1.570...` |
| `toRadians(double graus)` | converte | `Math.toRadians(180) → π` |
| `toDegrees(double rad)` | converte | `Math.toDegrees(Math.PI) → 180.0` |

---

## **Números aleatórios**

| Método | Faixa / tipo |
| -------- | -------------- |
| `Math.random()` | `double ≥ 0.0 e < 1.0` |
| `Random` classe | **mais opções** (veja exemplo abaixo) |

Exemplo **int entre 0 e 99**:

```java
int n = (int) (Math.random() * 100);          // 0-99
```

---

## **Classe Random vs ThreadLocalRandom vs SecureRandom**

| Classe | Uso / característica |
| -------- | ---------------------- |
| `Random` | **geral**, **não criptográfico** |
| `ThreadLocalRandom` | **mais rápido** em **threads** (Java 7+) |
| `SecureRandom` | **criptograficamente forte** |

Exemplo **ThreadLocalRandom**:

```java
int aleat = ThreadLocalRandom.current().nextInt(1, 101); // 1-100
double real = ThreadLocalRandom.current().nextDouble(0, 1);
```

---

## **Hypot, IEEE 754, signum, copySign**

| Método | Descrição |
| -------- | ----------- |
| `hypot(x, y)` | `sqrt(x² + y²)` sem overflow intermediário |
| `copySign(magnitude, sign)` | devolve **magnitude** com **sinal de sign** |
| `signum(x)` | **-1, 0, 1** conforme sinal |

---

## **Arredondamentos com precisão escolhida** (Java 1.8+)

| Método | Descrição |
| -------- | ----------- |
| `floorDiv(a, b)` | divisão **arredonda para baixo** (negativos corretos) |
| `floorMod(a, b)` | **módulo** com resultado **≥ 0** |
| `multiplyExact(a, b)` | **lança exceção** se **overflow** |
| `addExact / subtractExact` | mesma ideia |

Exemplo:

```java
long quociente = Math.floorDiv(-7, 3); // -3 (não -2)
long resto     = Math.floorMod(-7, 3); //  2 (sempre ≥ 0)
```

---

## **Exemplos práticos**

### a) **Distância euclidiana**

```java
double dx = x2 - x1;
double dy = y2 - y1;
double dist = Math.hypot(dx, dy); // mais preciso
```

### b) **Área do círculo**

```java
double area = Math.PI * Math.pow(raio, 2);
```

### c) **Logaritmo em qualquer base**

```java
static double logb(double a, double base) {
    return Math.log(a) / Math.log(base);
}
```

### d) **Número aleatório entre MIN e MAX**

```java
int sorteio = ThreadLocalRandom.current().nextInt(MIN, MAX + 1);
```

---

## **Dicas & curiosidades**

1. **Todos os métodos são `static`** – **não precisa criar** `Math m = new Math();` ❌  
2. **Classe é `final`** + **construtor privado** → **impede instanciação**.  
3. **Para dinheiro** use `BigDecimal` – **nunca `double/float`**.  
4. **Trigonometria usa RADIANOS** – **converta** com `toRadians()`.  
5. **Performance**: `Math.*` **usa intrinsics** da JVM – **rápido**.  
6. **Java 9+**: `StrictMath` **tem mesmo API** mas **garantia bit-a-bit** (menos rápido).

---

## **Resumo de 1 frase**

> `Math.*` **oferece funções matemáticas estáticas** – **abs, pow, sqrt, sin/cos, log, random, arredondamentos** – **use para cálculos rápidos**, **mas para valores monetários prefira `BigDecimal`**.
