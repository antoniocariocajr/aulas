# 🔍 Tipos de Dados

## **Tipos Primitivos**

- São **tipos básicos** definidos pela linguagem.  
- **Não são objetos** – armazenam o **valor direto**.  
- Possuem **tamanho fixo** e **desempenho máximo**.

| Tipo | Tamanho | Valor padrão | Exemplo |
| ------ | --------- | -------------- | --------- |
| `byte` | 1 byte | 0 | `byte b = 127;` |
| `short` | 2 bytes | 0 | `short s = 32_767;` |
| `int` | 4 bytes | 0 | `int x = 1_000_000;` |
| `long` | 8 bytes | 0L | `long l = 9_000_000_000L;` |
| `float` | 4 bytes | 0.0f | `float f = 3.14f;` |
| `double` | 8 bytes | 0.0 | `double d = 2.718281828;` |
| `char` | 2 bytes (UTF-16) | `\u0000` | `char c = 'A';` |
| `boolean` | 1 bit * | `false` | `boolean ok = true;` |

> A JVM **não define** tamanho exato para `boolean`, mas na prática usa **1 byte** (ou 1 bit em arrays compactados).

---

## 2️⃣ **Wrappers (Tipos Envoltórios)**

- **Classes** que **empacotam** (wrap) os primitivos em **objetos**.  
- Localizadas em `java.lang` e **herdam de Object**.  
- Permitem uso em **coleções genéricas** e **null**.

| Wrapper | Primitivo correspondente |
| ------- | ------------------------ |
| `Byte` | `byte` |
| `Short` | `short` |
| `Integer` | `int` |
| `Long` | `long` |
| `Float` | `float` |
| `Double` | `double` |
| `Character` | `char` |
| `Boolean` | `boolean` |

Exemplos:

```java
Integer idade = 25;      // autoboxing int → Integer
Double preco = 19.90;
Character letra = 'A';
Boolean ativo = true;
```

---

## **Diferença de alocação de memória**

### 🟢 **Primitivo**

- **Armazenado direto** onde a variável está:
  - **variável local** → **stack**  
  - **campo de objeto** → **dentro do objeto (heap)**  
  - **campo estático** → **method area (heap)**

### 🔵 **Wrapper**

- A **variável guarda apenas um endereço** (referência).  
- **Objeto real fica no heap**; **endereço fica na variável** (stack ou heap, conforme escopo).

---

### **Visual rápido**

```java
public class Memoria {
    int a = 10;          // primitivo → dentro do objeto (heap)
    Integer b = 20;      // wrapper → variável tem ponteiro;
                         // objeto Integer alocado no heap
    static double c = 3.14; // primitivo estático → method area
    static Double d = 9.81; // wrapper estático → method area aponta para objeto
}
```

```bach
Stack (método main)
  ├─ variável 'mem' : endereço do objeto Memoria

Heap
  ├─ objeto Memoria
  │   ├─ campo a : 10  (primitivo dentro do objeto)
  │   └─ campo b : endereço → Integer@123
  ├─ Integer@123  (objeto Integer com valor 20)
  └─ Double@456   (objeto Double com valor 9.81)

Method Area
  ├─ classe Memoria
  ├─ c : 3.14
  └─ d : endereço → Double@456
```

---

### **Custo de memória – objeto vs. primitivo (HotSpot 64 bits, compressed oops)**

- **int** → **4 bytes**  
- **Integer** → **cabeçalho 12 bytes + 4 bytes valor + 4 bytes padding** = **16 bytes**  
  *(sem contar a própria referência: + 4/8 bytes na variável)*

> **Fator 4×~5×** mais memória para um `Integer` que para `int`.

---

### **Tabela resumo – Primitivo vs. Wrapper**

| Característica | Primitivo | Wrapper |
| -------------- | ----------- | --------- |
| **É objeto?** | ❌ | ✅ |
| **Armazena** | valor direto | endereço (referência) |
| **Local** | stack (variável local) ou dentro do objeto/estático | objeto sempre no heap |
| **Valor padrão** | 0, false, '\u0000' | null |
| **Tamanho** | fixo (bit/byte) | depende da JVM + cabeçalho objeto |
| **Métodos** | nenhum | herda de Object |
| **Coleções genéricas** | não pode | List&lt;Integer&gt; ✅ |
| **Autoboxing/Unboxing** | — | automático desde Java 5 |

---

### **Resumo**

> **Tipos primitivos** guardam **valores diretos** e **custam poucos bytes**, enquanto **wrappers** guardam **referências** para **objetos alocados no heap**, consumindo **mais memória** e oferecendo **métodos + null**.
