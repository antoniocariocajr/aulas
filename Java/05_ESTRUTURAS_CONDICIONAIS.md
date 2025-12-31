# 🔀 Estruturas Condicionais em Java – do `if` ao `switch` moderno

> **Definição**: comandos que **desviam o fluxo** do programa **dependendo de uma expressão booleana**.

---

## `if` / `if-else` / `else if` – forma mais comum

```java
int nota = 87;

if (nota >= 90) {
    System.out.println("A");
} else if (nota >= 80) {          // pode ter quantos quiser
    System.out.println("B");
} else if (nota >= 70) {
    System.out.println("C");
} else {
    System.out.println("Reprovado");
}
```

**Sem chaves** (só para 1 instrução – **não recomendado**):

```java
if (x > 0)
    System.out.println("Positivo");
else
    System.out.println("Negativo ou zero");
```

---

## **Operador ternário – `?:` (if-else compacto)**

```java
// sintaxe: condição ? valor_se_verdade : valor_se_falso
int maior = (a > b) ? a : b;

String status = (idade >= 18) ? "Maior" : "Menor";
System.out.println("Situação: " + status);
```

**Encadeado** (use com moderação):

```java
String grau = (nota >= 90) ? "A" :
              (nota >= 80) ? "B" :
              (nota >= 70) ? "C" : "D";
```

---

## `switch` clássico (Java ≤ 7)

```java
int dia = 3;
switch (dia) {
    case 1:
        System.out.println("Domingo");
        break;          // **sem break → fall-through**
    case 2:
        System.out.println("Segunda");
        break;
    case 3:
        System.out.println("Terça");
        break;
    default:
        System.out.println("Dia inválido");
}
```

**Com fall-through útil**:

```java
switch (mes) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        dias = 31;
        break;
    case 4: case 6: case 9: case 11:
        dias = 30;
        break;
    case 2:
        dias = bissexto ? 29 : 28;
        break;
}
```

---

## `switch` moderno (Java 14+) – **expressão** com `->` **sem break**

```java
String nome = switch (num) {
    case 1 -> "Domingo";
    case 2 -> "Segunda";
    case 3 -> "Terça";
    default -> "Inválido";
};
System.out.println(nome);
```

**Com bloco múltiplo**:

```java
switch (nota) {
    case 10, 9 -> {
        System.out.println("Excelente");
        System.out.println("Parabéns");
    }
    case 8, 7 -> System.out.println("Bom");
    default -> System.out.println("Precisa melhorar");
}
```

**Retornando valor com `yield`** (Java 13 preview → 14+):

```java
String categoria = switch (pontos) {
    case 0 -> "Sem pontos";
    case 1, 2 -> "Pequeno";
    default -> {
        if (pontos > 100) yield "Alto";
        yield "Médio";
    }
};
```

---

## **Tipos permitidos no switch**

- Java ≤ 7: `int`, `byte`, `short`, `char` **+ suas wrappers** (`Integer`, `Character`...) e `enum`.  
- Java 7+: **`String`** também.  
- Java 14+: **expressões** com `->` aceitam os mesmos tipos.

---

### **Exemplo completo – menu textual**

```java
public class Menu {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Escolha (1-Comer 2-Beber 3-Sair): ");
        int op = sc.nextInt();

        switch (op) {
            case 1 -> System.out.println("🍔 Comendo...");
            case 2 -> System.out.println("🥤 Bebendo...");
            case 3 -> System.out.println("👋 Até logo!");
            default -> System.out.println("Opção inválida");
        }
        sc.close();
    }
}
```

---

## 7️⃣ **Boas práticas**

1. **Sempre use chaves** `{}` – evita erros quando acrescentar linhas.  
2. **Evite aninhar** muitos `if-else` – prefira `switch` ou **polimorfismo**.  
3. **Expressão switch** só disponível a partir do **Java 14**; configure **language level** na IDE.  
4. **Nunca esqueça `break` no switch tradicional** se não quiser fall-through.  
5. **Ordem das condições**: mais restritiva / específica primeiro.

---

## **Resumo**

> Condicionais em Java são **`if`/`else`**, **ternário `?:`** e **`switch`** (clássico ou moderno com `->`) – **escolha a legibilidade** e **lembre do `break` no switch antigo**.
