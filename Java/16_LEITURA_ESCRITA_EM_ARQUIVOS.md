# 📂 Leitura e Escrita de Arquivos em Java – **do básico ao moderno** (Java 8+)

> **Objetivo**: ler (**texto/binário**) e escrever (**texto/binário**) **com performance** e **sem vazamento de recurso**.

---

## Fluxos (Streams) – visão geral

| Tipo | Leitura | Escrita |
| ------ | --------- | --------- |
| **Texto** | `Reader` → `FileReader`, `BufferedReader` | `Writer` → `FileWriter`, `BufferedWriter` |
| **Binário** | `InputStream` → `FileInputStream`, `BufferedInputStream` | `OutputStream` → `FileOutputStream`, `BufferedOutputStream` |
| **Moderno** | `Files.newBufferedReader/Writer` | `Files.write/read`, `FileChannel`, `Path` |

---

## Leitura de **texto** – forma clássica

```java
Path path = Paths.get("poema.txt");

try (BufferedReader br = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
    String linha;
    while ((linha = br.readLine()) != null) {
        System.out.println(linha);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

**Lendo tudo de uma vez** (só se arquivo **caber na memória**):

```java
List<String> linhas = Files.readAllLines(path, StandardCharsets.UTF_8);
linhas.forEach(System.out::println);
```

---

## Escrita de **texto** – forma clássica

```java
Path saida = Paths.get("saida.txt");

try (BufferedWriter bw = Files.newBufferedWriter(saida,
        StandardCharsets.UTF_8,
        StandardOpenOption.CREATE,      // cria se não existir
        StandardOpenOption.APPEND)) {   // adiciona ao fim
    bw.write("Linha 1");
    bw.newLine();                       // insere \n adequado ao SO
    bw.write("Linha 2");
    bw.flush();                         // opcional – close faz flush
} catch (IOException e) {
    e.printStackTrace();
}
```

**Escrita rápida (Java 8+)**:

```java
List<String> texto = List.of("A", "B", "C");
Files.write(saida, texto, StandardCharsets.UTF_8,
        StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
```

---

## Leitura & escrita **binária** (imagens, PDF, zip)

```java
Path origem  = Paths.get("foto.jpg");
Path destino = Paths.get("copia.jpg");

try (InputStream  in  = Files.newInputStream(origem);
     OutputStream out = Files.newOutputStream(destino)) {

    byte[] buffer = new byte[8 * 1024]; // 8 KB
    int bytesLidos;
    while ((bytesLidos = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesLidos);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

**Copia de 1 linha** (Java 9+):

```java
Files.copy(origem, destino, StandardCopyOption.REPLACE_EXISTING);
```

---

## Scanner vs BufferedReader – **entrada console**

```java
// ---- forma 1: Scanner ----
try (Scanner sc = new Scanner(System.in, StandardCharsets.UTF_8)) {
    System.out.print("Nome: ");
    String nome = sc.nextLine();
    System.out.print("Idade: ");
    int idade = sc.nextInt();
}

// ---- forma 2: BufferedReader (mais rápida) ----
try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8))) {
    System.out.print("Nome: ");
    String nome = br.readLine();
}
```

---

## Escrita **formatada** (sem `System.out`)

```java
try (PrintWriter pw = new PrintWriter(Files.newBufferedWriter(path))) {
    pw.printf("Produto: %s – R$ %.2f%n", "Mouse", 39.90);
    pw.println("Quantidade: 5");
}
```

---

## **Append** (adicionar ao fim) vs **sobrescrever**

| Opção | Significado |
| -------- | ------------- |
| `StandardOpenOption.CREATE` | cria se **não existir** |
| `StandardOpenOption.TRUNCATE_EXISTING` | **zera** arquivo se existir |
| `StandardOpenOption.APPEND` | **adiciona** ao final |
| `StandardOpenOption.WRITE` | **abre para escrita** (padrão) |

Exemplo **append**:

```java
Files.write(path, List.of("nova linha"), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
```

---

## **Memory-mapped** (rápido para grandes arquivos)

```java
try (RandomAccessFile file = new RandomAccessFile("grande.dat", "rw");
     FileChannel channel = file.getChannel()) {

    MappedByteBuffer buffer = channel.map(FileChannel.MapMode.READ_WRITE, 0, channel.size());
    buffer.put(0, (byte) 'X');
}
```

---

## **Exemplo completo** – **CSV → Objeto → Novo CSV**

```java
record Produto(String nome, BigDecimal preco) { }

Path entrada  = Paths.get("produtos-in.csv");
Path saida    = Paths.get("produtos-out.csv");

List<Produto> produtos = new ArrayList<>();

// ---- LEITURA ----
try (BufferedReader br = Files.newBufferedReader(entrada)) {
    String linha;
    while ((linha = br.readLine()) != null) {
        String[] partes = linha.split(";");
        produtos.add(new Produto(partes[0], new BigDecimal(partes[1])));
    }
}

// ---- PROCESSAMENTO (ex: +10 %) ----
List<Produto> ajustados = produtos.stream()
        .map(p -> new Produto(p.nome(), p.preco().multiply(BigDecimal.valueOf(1.10))))
        .toList();

// ---- ESCRITA ----
try (BufferedWriter bw = Files.newBufferedWriter(saida)) {
    for (Produto p : ajustados) {
        bw.write(p.nome() + ";" + p.preco());
        bw.newLine();
    }
}
```

---

## Boas práticas & dicas finais

1. **Sempre** use **try-with-resources** → **fecha automático**.  
2. **Especifique charset** (`UTF-8`, `ISO-8859-1`) → **evita ? em acentos**.  
3. **Para arquivos grandes** processe **linha a linha** – **não carregue tudo**.  
4. **Escolha**:
   - **Texto simples** → `BufferedReader/Writer`  
   - **Objetos** → **serialização** ou **JSON/CSV** (`Jackson`, `OpenCSV`)  
   - **Binário grande** → `BufferedInputStream/OutputStream` ou `Files.copy`  
5. **Nunca** **delete/renomeie** **enquanto lê** – **use locks** ou **copia temporária**.  
6. **Diretório** – **verifique** com `Files.exists / notExists / isDirectory`.

---

## Resumo de 1 frase

> Use `BufferedReader/Writer` (texto) ou `BufferedInputStream/OutputStream` (binário) **dentro de try-with-resources**, **especifique charset** e **aproveite `Files.readAllLines`, `Files.write` ou `Files.copy`** para **ler e escrever arquivos de forma eficiente e segura** em Java.
