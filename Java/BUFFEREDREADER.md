# 📖 BufferedReader – leitura **eficiente** e **linha a linha**

> **Objetivo**: ler **texto** (arquivo, teclado, rede) **com buffer** → **menos acessos físicos** e **métodos úteis** como **`readLine()`**.

---

## O que é `BufferedReader`?

- **Envolve** um `Reader` (ex: `FileReader`, `InputStreamReader`)  
- **Armazena dados em buffer** (padrão 8 KB) – **leitura em bloco**  
- **Métodos úteis**:  
  - `String readLine()` – **linha inteira** até `\n` ou `\r`  
  - `int read()` – **1 caractere**  
  - `long skip(n)` – pula caracteres  
  - `boolean ready()` – **tem dados no buffer?**  
  - `void close()` – **libera recursos**

---

## Estrutura básica – **try-with-resources**

```java
Path path = Paths.get("poema.txt");

try (BufferedReader br = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    String linha;
    while ((linha = br.readLine()) != null) {   // null = fim do arquivo
        System.out.println(linha);
    }
} catch (IOException e) {
    System.err.println("Erro ao ler: " + e.getMessage());
}
```

---

## Lendo do **teclado** (System.in)

```java
try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
    System.out.print("Nome: ");
    String nome = br.readLine();

    System.out.print("Idade: ");
    int idade = Integer.parseInt(br.readLine()); // pode lançar NumberFormatException

    System.out.printf("Olá %s, você tem %d anos%n", nome, idade);
} catch (IOException e) {
    e.printStackTrace();
}
```

> **Dica**: para **entrada simples** Java 6+ use `java.util.Scanner`; para **leitura rápida** (maratona) use `BufferedReader`.

---

## Comparativo de performance – **maratona de programação**

| Leitor | Tempo (ex: 1 Mi linhas) | Uso |
| -------- | ------------------------- | ----- |
| `Scanner` | lento | fácil, mas **dividir/tokenizar** |
| `BufferedReader` | **rápido** | **leitura bruta**, **split** manual |
| `BufferedReader + StringTokenizer` | **mais rápido** | **split eficiente** |

Exemplo **rápido** (competições):

```java
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
StringTokenizer st = new StringTokenizer(br.readLine());
int a = Integer.parseInt(st.nextToken());
int b = Integer.parseInt(st.nextToken());
```

---

## **Ler arquivo inteiro** – Java 8+ **lines()**

```java
Path path = Paths.get("dados.csv");
try (Stream<String> linhas = Files.lines(path)) {
    linhas.filter(l -> !l.isBlank())
          .forEach(System.out::println);
}
```

**Por baixo** usa `BufferedReader`.

---

## **skip(n)** – pular linhas/cabeçalho

```java
try (BufferedReader br = Files.newBufferedReader(path)) {
    br.skip(1); // pula cabeçalho
    String linha;
    while ((linha = br.readLine()) != null) {
        processar(linha);
    }
}
```

---

## **ready()** – verificar se há dados (evita bloqueio)

```java
if (br.ready()) {          // true = há bytes no buffer
    String linha = br.readLine();
}
```

> **Útil** em **leitura de socket** ou **interativo**.

---

## **Decoração** – quem pode envolver?

```java
BufferedReader br1 = new BufferedReader(new FileReader("file.txt"));           // arquivo
BufferedReader br2 = new BufferedReader(new InputStreamReader(System.in));     // teclado
BufferedReader br3 = new BufferedReader(new StringReader("uma\nstring\n"));    // string
```

---

## **Buffer size customizado**

```java
BufferedReader br = new BufferedReader(new FileReader("f"), 16 * 1024); // 16 KB
```

---

## **Exemplo completo** – **CSV simples**

```java
Path path = Paths.get("produtos.csv");
try (BufferedReader br = Files.newBufferedReader(path)) {
    String linha;
    while ((linha = br.readLine()) != null) {
        String[] partes = linha.split(";");
        String nome = partes[0];
        BigDecimal preco = new BigDecimal(partes[1]);
        System.out.printf("Produto: %s - R$ %s%n", nome, preco);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

---

## **Dicas & boas práticas**

1. **Sempre** use **try-with-resources** → **fecha automático**.  
2. **Especifique charset** (`UTF-8`, `ISO-8859-1`) → evita **?** em acentos.  
3. **Para arquivos grandes** use **linha a linha** – **não carregue tudo na memória**.  
4. **Competições** – `BufferedReader + StringTokenizer` **é o mais rápido**.  
5. **Nunca** **modifique a fonte** (arquivo) **lendo** – **leitura é só leitura**.

---

## **Resumo**

> `BufferedReader` **envolve qualquer Reader** e **lê texto em bloco**, **fornecendo `readLine()`** para **linha completa** – **use com try-with-resources** e **especifique charset** para **leitura eficiente e segura** de arquivos ou entrada do usuário.
