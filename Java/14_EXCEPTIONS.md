# 🚨 Exceptions e Tratamento em Java – do básico ao `try-with-resources`

> **Conceito**: **Exception** é um **objeto** que interrompe o fluxo normal quando algo **inesperado** acontece (erro de I/O, divisão por zero, valor inválido...).  
> Java **obriga** ou **permite** tratar esse objeto para **evitar travamentos** e **dar feedback claro**.

---

## **Hierarquia rápida**

```bash
Throwable
 ├─ Error          (StackOverflowError, OutOfMemoryError)  → NÃO trate
 └─ Exception
     ├─ **Checked** (obrigatório tratar/compilar falha)
     │    └─ IOException, SQLException, ParseException...
     └─ **Unchecked** (RuntimeException) → opcional
          ├─ NullPointerException
          ├─ ArrayIndexOutOfBoundsException
          ├─ IllegalArgumentException
          └─ NumberFormatException ...
```

---

## **Bloco `try-catch-finally`**

```java
try {
    // código que PODE lançar exceção
    int n = Integer.parseInt("abc");
} catch (NumberFormatException e) {  // captura específica
    System.out.println("Digite apenas números!");
} catch (Exception e) {              // genérica (DEPOIS das específicas)
    System.out.println("Erro geral: " + e.getMessage());
} finally {                          // sempre executa (mesmo com return)
    System.out.println("Fim do bloco");
}
```

---

## **Multi-catch (Java 7+)**

```java
try {
    // pode lançar IOException ou NumberFormatException
    Path p = Paths.get("dados.txt");
    List<String> linhas = Files.readAllLines(p);
    int v = Integer.parseInt(linhas.get(0));
} catch (IOException | NumberFormatException e) {
    System.out.println("Problema: " + e.getMessage());
}
```

---

## **Checked vs Unchecked – exemplo prático**

```java
// Checked → OBRIGA tratar ou declarar
public static void leArquivo(String path) throws IOException {
    Files.readAllLines(Paths.get(path)); // compila só com throws ou try-catch
}

// Unchecked → não obriga
public static int dividir(int a, int b) {
    if (b == 0) throw new IllegalArgumentException("Divisor zero");
    return a / b;
}
```

---

## **Lançando sua própria exceção**

```java
public class SaldoInsuficienteException extends Exception {
    public SaldoInsuficienteException(String msg) {
        super(msg);
    }
}

// uso
if (valor > saldo) {
    throw new SaldoInsuficienteException("Saldo: " + saldo);
}
```

---

## **Try-with-resources – auto-fecha streams (Java 7+)**

Sintaxe:

```java
try (Recurso r1 = ...; Recurso r2 = ...) {
    // usa recursos
} catch (Exception e) {
    // trata
}
```

Exemplo copiando arquivo:

```java
try (FileInputStream in = new FileInputStream("origem.zip");
     FileOutputStream out = new FileOutputStream("destino.zip")) {
    byte[] buffer = new byte[1024];
    int bytes;
    while ((bytes = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytes);
    }
} catch (IOException e) {
    System.out.println("Erro de cópia: " + e.getMessage());
}
// **in** e **out** são fechados automaticamente aqui
```

---

## **Criando recurso próprio – implemente `AutoCloseable`**

```java
class Conexao implements AutoCloseable {
    public Conexao() { System.out.println("Abriu conexão"); }
    public void ler() { System.out.println("Lendo dados"); }
    @Override public void close() {
        System.out.println("Fechou conexão");
    }
}

// uso
try (Conexao c = new Conexao()) {
    c.ler();
} // close() é chamado automaticamente
```

**Saída**:

```bash
Abriu conexão
Lendo dados
Fechou conexão
```

---

## **Pilha de exceção – `printStackTrace()`**

```java
try {
    int[] v = new int[5];
    v[10] = 9;
} catch (ArrayIndexOutOfBoundsException e) {
    e.printStackTrace();  // imprime rastro completo
}
```

---

## **Boas práticas**

1. **Capture exceções específicas** antes de genéricas.  
2. **Nunca capture `Throwable`/`Error`** – só `Exception`.  
3. **Nunca deixe catch vazio** (`catch (E e) {}`) – **esconde erro**.  
4. **Use `finally` ou try-with-resources** para **liberar recursos**.  
5. **Documente com `@throws`** o que seu método **propaga**.  
6. **Não use exceções para fluxo normal** (ex.: fim de arquivo).  
7. **Wrappers checked → unchecked** quando **invável tratar**:

   ```java
   throw new RuntimeException("Problema de IO", e);
   ```

---

## **Resumo**

> Em Java **tudo que pode falhar** vira **objeto Exception**; **trate checked com `try-catch` ou `throws`**, **use try-with-resources para fechar automaticamente** e **nunca esconda erros com catch vazio**.
