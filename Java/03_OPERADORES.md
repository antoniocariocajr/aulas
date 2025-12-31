# 🔧 **Operadores em Java**

> **Definição rápida**:  
> **Operadores** são **símbolos especiais** que aplicam **cálculos, comparações, decisões ou mudanças de bits** sobre **variáveis ou valores**.

---

## **Tabela Geral (ordem de precedência simplificada)**

| Categoria | Operadores | Prioridade (mais alto → mais baixo) |
| ----------- | ------------ | --------------------------------------- |
| 1. Pós-fixo | `expr++` `expr--` | 12 |
| 2. Pré-fixo / unário | `++expr` `--expr` `+expr` `-expr` `~` `!` | 11 |
| 3. Multiplicativos | `*` `/` `%` | 10 |
| 4. Aditivos | `+` `-` | 9 |
| 5. Shift | `<<` `>>` `>>>` | 8 |
| 6. Relacionais | `<` `>` `<=` `>=` `instanceof` | 7 |
| 7. Igualdade | `==` `!=` | 6 |
| 8. AND bit | `&` | 5 |
| 9. XOR bit | `^` | 4 |
| 10. OR bit | `\|` | 3 |
| 11. AND lógico | `&&` | 2 |
| 12. OR lógico | `\|\|` | 1 |
| 13. Ternário | `?:` | 0 |
| 14. Atribuição | `=` `+=` `-=` `*=` `/=` `%=` `&=` `^=` `\|=` `<<=` `>>=` `>>>=` | menor |

---

## **Aritméticos**

```java
int a = 7 + 3;   // 10
int b = a - 4;   // 6
int c = b * 2;   // 12
int d = c / 5;   // 2  (divisão inteira)
int e = c % 5;   // 2  (resto)
double f = 5.0 / 2; // 2.5
```

---

## **Unários**

```java
int x = +5;      // +
int y = -x;      // -
boolean ok = !true; // false
int bits = ~0b1010; // ~10 = -11 (complemento bit a bit)
x++;             // pós-incremento
++x;             // pré-incremento
```

---

## **Relacionais & instanceof**

```java
boolean b1 = 10 > 5;        // true
boolean b2 = 3.5 <= 3.5;    // true
boolean b3 = "abc" == "abc";// true (pool de strings)
boolean b4 = obj instanceof String; // verifica tipo
```

---

## **Igualdade**

```java
a == b     // mesmo valor (primitivos) ou mesma referência (objetos)
obj1 != obj2 // referências diferentes
```

> Para **conteúdo** use `.equals()`:

```java
boolean mesmo = s1.equals(s2);
```

---

## **Lógicos (short-circuit)**

```java
boolean r = (5 > 3) && (2 < 4); // true
boolean r2 = (5 > 3) || (2 > 4); // true
boolean r3 = (2 > 4) && (++x > 0); // x NÃO incrementa (curto-circuito)
```

---

## **Ternário – operador `?:`**

```java
int maior = (a > b) ? a : b;
String status = (idade >= 18) ? "Adulto" : "Menor";
```

---

## **Bitwise & Shift**

```java
int mask = 0b1111_0000;
int val  = 0b1010_1010;
int and  = val & mask; // 0b1010_0000
int or   = val | mask; // 0b1111_1010
int xor  = val ^ mask; // 0b0101_1010
int left = val << 2;   // desloca 2 bits p/ esquerda
int right= val >> 2;   // com sinal
int unsig= val >>> 2;  // sem sinal (preenche 0)
```

---

## **Atribuição com operador**

```java
x += 5;   // x = x + 5
y *= 2;   // y = y * 2
p &= mask;// p = p & mask
```

---

## **Operador de concatenação String**

```java
String s = "Olá" + " " + "Mundo"; // "Olá Mundo"
int a = 5, b = 3;
String r = "Resultado: " + (a + b); // "Resultado: 8"
```

---

## **Promoção (widening) vs. Cast (narrowing)**

```java
int x = 5;
double d = x;       // widening automático
int y = (int) d;    // narrowing manual (cast)
```

---

## **Exemplo completo – calculadora rápida**

```java
public class OperadoresDemo {
    public static void main(String[] args) {
        int a = 10, b = 4;
        System.out.println("a + b = " + (a + b));
        System.out.println("a / b = " + (a / b));       // 2  (inteiro)
        System.out.println("a % b = " + (a % b));       // 2
        System.out.println("a >> 1 = " + (a >> 1));     // 5
        System.out.println("(a > b) ? a : b = " + ((a > b) ? a : b)); // 10
    }
}
```

---

## **Dicas & armadilhas**

1. **Divisão inteira** trunca: `5/2 → 2`  
   Para decimal: `5.0/2` ou `(double)a/b`
2. `==` em **objetos** compara **referências**, não conteúdo → use `.equals()`
3. `&&` vs `&`: `&&` **não avalia** o segundo se o primeiro for `false` (mais rápido)
4. **Overflow** não gera exceção – apenas “vira” o bit de sinal:

   ```java
   int x = Integer.MAX_VALUE + 1; // x vira -2147483648
   ```

---

## **Resumo**

> **Operadores** são os **símbolos que mandam o compilador fazer contas, comparações, desvios ou mudanças de bits** – **aprenda a precedência** e **use parênteses** para **clareza**.
