# 🔧 **Entrada de dados com `Scanner` e saída com `print` / `println` / `printf`**

> **Objetivo**: ler do **teclado** e exibir **no console** de forma **simples e segura**.

---

## **Importando e criando o Scanner**

```java
import java.util.Scanner; // 1ª linha do arquivo ou logo após package

public class EntradaSaida {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in); // System.in = teclado
        // ... leituras ...
        sc.close(); // BOM HÁBITO: libera o stream
    }
}
```

---

## **Métodos mais usados do Scanner**

| Método | O que faz | Exemplo de uso |
| -------- | ----------- | ---------------- |
| `next()` | lê **uma palavra** (atém espaço) | `String nome = sc.next();` |
| `nextLine()` | lê **toda a linha** (atém `\n`) | `String frase = sc.nextLine();` |
| `nextInt()` | lê **int** | `int idade = sc.nextInt();` |
| `nextLong()` | lê **long** | `long cpf = sc.nextLong();` |
| `nextDouble()` | lê **double** (vírgula ou ponto depende locale) | `double peso = sc.nextDouble();` |
| `nextFloat()` | lê **float** | `float temp = sc.nextFloat();` |
| `nextBoolean()` | lê **true/false** | `boolean ativo = sc.nextBoolean();` |
| `hasNextInt()` | verifica se existe **int** no buffer | `while (sc.hasNextInt()) { ... }` |

---

## **Cuidado com `nextLine()` após `nextInt()`**

Problema clássico: o `nextInt()` **não consome** a quebra de linha.

```java
System.out.print("Idade: ");
int idade = sc.nextInt();        // deixa \n no buffer
sc.nextLine();                   // <-- consome o "\n" sobrando
System.out.print("Nome: ");
String nome = sc.nextLine();     // agora lê corretamente
```

---

## **Exemplo completo – cadastro rápido**

```java
import java.util.Scanner;

public class Cadastro {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Digite seu nome: ");
        String nome = sc.nextLine();

        System.out.print("Digite sua idade: ");
        int idade = sc.nextInt();

        System.out.print("Digite seu peso (kg): ");
        double peso = sc.nextDouble();

        sc.nextLine(); // limpa buffer
        System.out.print("Digite sua cidade: ");
        String cidade = sc.nextLine();

        // saída
        System.out.println("\n=== Dados cadastrados ===");
        System.out.println("Nome  : " + nome);
        System.out.println("Idade : " + idade + " anos");
        System.out.println("Peso  : " + peso + " kg");
        System.out.println("Cidade: " + cidade);

        sc.close();
    }
}
```

**Execução possível**:

```bash
Digite seu nome: Maria Silva
Digite sua idade: 28
Digite seu peso (kg): 61.5
Digite sua cidade: São Paulo

=== Dados cadastrados ===
Nome  : Maria Silva
Idade : 28 anos
Peso  : 61.5 kg
Cidade: São Paulo
```

---

## **Saída formatada – `System.out.printf`**

Mesma sintaxe do **C** / **Formatter**.

```java
double pi = Math.PI;
int casas = 3;
System.out.printf("π = %.%df%n", casas, pi); // π = 3.142
```

Códigos mais usados:

| Código | Significado |
| ------ | ------------- |
| `%d` | inteiro decimal |
| `%f` | ponto flutuante (padrão 6 decimais) |
| `%.2f` | 2 casas decimais |
| `%s` | string |
| `%c` | caractere |
| `%n` | quebra de linha **independente de SO** |
| `%%` | imprime % literal |

Alinhamento & largura:

```java
System.out.printf("%-10s %04d %10.2f%n", "Item", 5, 19.9);
// saída: Item       0005      19.90
```

---

## **Boas práticas & dicas**

1. **Sempre** `sc.close()` ao terminar (libera entrada).  
2. **Trate exceções** para entrada inválida:

   ```java
   if (sc.hasNextInt()) {
       int x = sc.nextInt();
   } else {
       System.out.println("Número inválido!");
       sc.next(); // descarta token errado
   }
   ```

3. **Locale** influencia separador decimal:  
   `Scanner sc = new Scanner(System.in).useLocale(Locale.US);` // força ponto
4. **Não re-utilize** Scanner fechado – crie outro ou reinicie o stream.

---

## **Resumo**

> Use **`Scanner`** para **ler** do teclado (`nextInt()`, `nextLine()`...) e **`print`/`println`/`printf`** para **exibir** – **não esqueça de fechar** o scanner e **limpar o buffer** antes de `nextLine()` após números.
