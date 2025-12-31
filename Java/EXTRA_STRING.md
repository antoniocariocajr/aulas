# 🔤 String, StringBuilder e StringBuffer em Java

- **Imutabilidade × Mutabilidade × Performance × Thread-Safety**

---

## String

> imutável e mais rápida para literais

- **Imutável**: qualquer operação (`+`, `substring`, `replace`...) **cria NOVO objeto**.  
- **Pool de Strings**: literais são **reutilizados** na memória.  
- **Ideal para**: chaves de Map, constantes, comparativos frequentes.

```java
String s1 = "abc";          // vai para o pool
String s2 = "abc";          // mesma referência → s1 == s2 é true
String s3 = new String("abc"); // objeto fora do pool
boolean ok = s1.equals(s3);    // true (conteúdo)
```

**Custo de concatenação em laço**:

```java
String texto = "";
for (int i = 0; i < 10000; i++) {
    texto += i;               // O(n²) – cria 10 mil objetos
}
```

---

## Métodos

### **Introspecção**

| Método | Descrição | Exemplo |
| -------- | ----------- | --------- |
| `int length()` | quantidade de `char`s | `"Java".length()` → 4 |
| `boolean isEmpty()` | `length == 0` | `"".isEmpty()` → true |
| `boolean isBlank()` | só whitespaces ou vazio (Java 11) | `"  \t  ".isBlank()` → true |
| `char charAt(int i)` | caractere no índice | `"abc".charAt(1)` → 'b' |
| `int codePointAt(int i)` | código Unicode | `"😀".codePointAt(0)` → 128512 |

---

### **Comparação & ordenação**

| Método | Descrição | Exemplo |
| -------- | ----------- | --------- |
| `boolean equals(Object o)` | compara conteúdo | `"A".equals("A")` → true |
| `boolean equalsIgnoreCase(String s)` | ignora case | `"Java".equalsIgnoreCase("java")` → true |
| `int compareTo(String s)` | <0, 0, >0 | `"apple".compareTo("banana")` → negativo |
| `int compareToIgnoreCase(String s)` | case-insensitive | |
| `boolean contentEquals(CharSequence cs)` | igual a `StringBuilder`, `StringBuffer`, etc. | |

---

### **Busca**

| Método | Descrição | Exemplo |
| -------- | ----------- | --------- |
| `boolean contains(CharSequence s)` | tem substring? | `"porta".contains("or")` → true |
| `int indexOf(String str)` | 1ª posição (−1 se não) | `"abacate".indexOf("a")` → 0 |
| `int indexOf(String str, int fromIndex)` | a partir de offset | |
| `int lastIndexOf(String str)` | última ocorrência | |
| `boolean startsWith(String prefix)` | prefixo | `"www.java.com".startsWith("www")` → true |
| `boolean endsWith(String suffix)` | sufixo | `"Test.java".endsWith(".java")` → true |

---

### **Extração / fatiamento**

| Método | Descrição | Exemplo |
| -------- | ----------- | ----------- |
| `String substring(int begin)` | do índice até fim | `"abcdef".substring(2)` → "cdef" |
| `String substring(int begin, int end)` | `[begin, end)` | `"abcdef".substring(1,4)` → "bcd" |

---

### **Transformações**

| Método | Descrição | Exemplo |
| -------- | ----------- | --------- |
| `String toLowerCase()` | minúsculas | `"JAVA".toLowerCase()` → "java" |
| `String toUpperCase()` | maiúsculas | |
| `String trim()` | remove espaços **início/fim** | `"  abc  ".trim()` → "abc" |
| `String strip()` | Unicode aware (Java 11) | `" \u2001abc ".strip()` → "abc" |
| `String stripLeading()` / `stripTrailing()` | só começo/fim | |
| `String replace(char old, char new)` | caracteres | `"bola".replace('o', 'a')` → "bala" |
| `String replace(CharSequence tgt, CharSequence repl)` | strings | `"Java".replace("va", "vu")` → "Javu" |
| `String replaceAll(String regex, String repl)` | regex | `"A1B2C3".replaceAll("\\d", "-")` → "A-B-C-" |
| `String replaceFirst(String regex, String repl)` | só 1ª ocorrência | |

---

### **Validações & testes**

| Método | Descrição | Exemplo |
| -------- | ----------- | --------- |
| `boolean matches(String regex)` | bate regex inteira? | `"123".matches("\\d+")` → true |
| `boolean isEmpty()` | `length == 0` | |
| `boolean isBlank()` | só brancos (Java 11) | |

---

### **split & join – arrays**

| Método | Descrição | Exemplo |
| -------- | ----------- | --------- |
| `String[] split(String regex)` | quebra em regex | `"a,b,c".split(",")` → `["a", "b", "c"]` |
| `String[] split(String regex, int limit)` | limita pedaços | |
| **Java 8+** | | |
| `static String join(CharSequence delimiter, CharSequence... elements)` | concatena | `String.join(";", "A", "B", "C")` → "A;B;C" |
| `static String join(CharSequence delimiter, Iterable<? extends CharSequence> iterable)` | lista / set | |

---

### **Conversões para outros tipos**

| Método | Descrição |
| -------- | ----------- |
| `static String valueOf(primitivo ou Object)` | sobrecargas para tudo → String |
| `toCharArray()` | `char[]` com os caracteres |
| `getBytes(Charset)` | `byte[]` (codificação escolhida) |
| `format(String fmt, Object... args)` | mesmo que `String.format` |
| `static String format(String fmt, Object... args)` | estático – usa `Formatter` |

```java
int x = 42;
String s  = String.valueOf(x);      // "42"
char[] v  = "Java".toCharArray();   // ['J','a','v','a']
String f  = String.format("R$ %.2f", 19.9); // "R$ 19.90"
```

---

## **StringBuilder**

> **mutável e NÃO thread-safe**

- **Mesmos métodos** de `StringBuffer`, mas **sem sincronização**.  
- **Mais rápido** quando **uma única thread** manipula.  
- **Ideal para**: montar JSON, SQL, logs, concatenações pesadas.

```java
StringBuilder sb = new StringBuilder();   // capacidade inicial 16
sb.append("Olá, ").append("mundo!")        // cadeia de métodos
   .append(" Hoje é ")
   .append(LocalDate.now());
String resultado = sb.toString();          // converte para String
```

**Capacidade e performance**:

```java
StringBuilder sb = new StringBuilder(50_000); // evita redimensionamentos
for (int i = 0; i < 50_000; i++) {
    sb.append(i).append(';');
}
```

**Métodos úteis**:

| Método | Descrição |
| -------- | ----------- |
| `append(primitivo/Object)` | adiciona ao final |
| `insert(offset, valor)` | insere no meio |
| `delete(start, end)` | apaga faixa |
| `reverse()` | inverte caracteres |
| `setCharAt(i, c)` | altera 1 char |
| `setLength(n)` | trunca ou completa com '\0' |

---

## **StringBuffer**

> **mutável e thread-safe**

- **Todos os métodos são synchronized** → **seguro para múltiplas threads**, **mas mais lento**.  
- **Uso raro hoje** – preferir `StringBuilder` ou construir fora de laço concorrente.

```java
StringBuffer sbuf = new StringBuffer();
sbuf.append("Thread ").append(Thread.currentThread().getId());
```

---

## **Comparação rápida**

| Característica | String | StringBuilder | StringBuffer |
| ---------------- | -------- | --------------- | -------------- |
| **Mutável** | ❌ | ✅ | ✅ |
| **Thread-safe** | ✅ (imutável) | ❌ | ✅ (synchronized) |
| **Velocidade** | concatenação lenta | **mais rápida** | ~30 % mais lenta |
| **Memória** | pool + novos objetos | 1 array interno | 1 array interno |
| **Uso típico** | chaves, constantes | montar texto **dentro de laço** | **raro** (legado) |

---

## **Exemplo prático – 50 mil concatenações**

```java
// String – LENTO
long t1 = System.currentTimeMillis();
String s = "";
for (int i = 0; i < 50_000; i++) s += i;
long t2 = System.currentTimeMillis();
System.out.println("String: " + (t2 - t1) + " ms"); // ~2 000 ms

// StringBuilder – RÁPIDO
StringBuilder sb = new StringBuilder();
long t3 = System.currentTimeMillis();
for (int i = 0; i < 50_000; i++) sb.append(i);
long t4 = System.currentTimeMillis();
System.out.println("StringBuilder: " + (t4 - t3) + " ms"); // ~5 ms
```

---

## **Quando usar cada um?**

- **String**  
  – Literais, comparativos frequentes, chaves de Map, imutabilidade desejada.  
- **StringBuilder**  
  – Concatenações **em laços**, montagem de **JSON/SQL/Logs**, **performance**.  
- **StringBuffer**  
  – **Apenas se realmente houver acesso concorrente direto ao objeto** (raro).

---

## **Curiosidades & dicas**

1. **Capacidade inicial padrão** = 16 caracteres; redimensiona **dobrando** → custo O(n).  
2. **Construtor com tamanho** evita cópias:  
   `new StringBuilder(50_000)`  
3. **chain (`append().append()`)** retorna **this** – padrão **Fluent Interface**.  
4. **StringBuilder ≠ String** – **não sobrescreva equals** (compara identidade).  
5. **Converter de volta**: `sb.toString()`  
6. **Java 9+**: o compilador **otimiza concatenações constantes** (`"a" + "b"` vira `"ab"` no bytecode).  
7. **Concatenação simples fora de laço** (`"a" + b + "c"`) **não precisa** de `StringBuilder` – o **compilador já gera** um.

---

## **Resumo**

> **String** é **imutável e lenta para laços**; **StringBuilder** é **mutável e rápido** (use-o para montar textos grandes); **StringBuffer** é **thread-safe mas praticamente obsoleto** – **prefira Builder** e **proteja externamente** se precisar de concorrência.
> A classe `String` oferece **dezenas de métodos imutáveis** para **comparar, buscar, fatiar, transformar, quebrar e juntar** textos – **lembre-se de sempre guardar o resultado**, pois **nenhum método altera a String original**.
