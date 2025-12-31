# **Introdução**

Java é uma linguagem **Orientada a objetos**, **Fortemente tipada**, Muito utilizada no mercado **Multiplataforma** “escreva uma vez, execute em qualquer lugar”.

## 📦 **SDK do Java (JDK)**

Como desenvolvedor Java, você terá à sua disposição um conjunto
de ferramentas poderosas capazes de abranger várias tarefas envolvidas
no processo de desenvolvimento de software dentro do seu ciclo de
vida.
> **SDK** (Software Development Kit) é o **conjunto completo de ferramentas, bibliotecas, documentação e exemplos** necessários para **criar, compilar, testar e executar** aplicações em uma plataforma específica — no caso, **aplicações Java**.

Dentre as principais ferramentas disponíveis, podemos citar:

* o compilador (javac);
* o interpretador (java);
* o gerador de documentação (javadoc);
* a ferramenta de compactação de arquivos (jar);
* diversas outras ferramentas instaladas no diretório bin da distribuição.

> **Java SDK (JDK)** é o **kit completo de ferramentas e bibliotecas** que permite **compilar, depurar, documentar e executar** programas Java em qualquer plataforma.
---

### **Componentes principais do Java SDK**

| Componente | Função | Arquivos / Pastas típicas |
| ---------- | -------- | --------------------------- |
| **javac** | Compilador – transforma `.java` → `.class` (bytecode) | `bin/javac.exe` (Windows) ou `bin/javac` (Unix) |
| **java** | JVM / Launcher – executa o bytecode | `bin/java` |
| **javadoc** | Gera documentação HTML a partir de comentários `@param`, `@return`... | `bin/javadoc` |
| **jar** | Empacota `.class`, recursos e metadados em arquivo `.jar` | `bin/jar` |
| **jdb** | Debugger – depuração em linha de comando | `bin/jdb` |
| **jdeps** | Analisador de dependências | `bin/jdeps` |
| **jlink** | Cria runtime personalizado (módulos, Java 9+) | `bin/jlink` |
| **src.zip** | Código-fonte das bibliotecas padrão (aprendizado, debug “step-in”) | `lib/src.zip` |
| **jrt-fs.jar** | Sistema de arquivos de tempo de execução (Java 9+) | `lib/jrt-fs.jar` |
| **include/** | Headers C/C++ para JNI (Java Native Interface) | `include/jni.h` ... |
| **release** | Metadados da versão (vendor, version, modules) | `release` |

---

### **Diferenças entre SDK × JDK × JRE**

| Termo | Escopo | O que leva |
| ----- | -------- | ------------ |
| **JRE** (Java Runtime Environment) | Só **executa** Java | JVM + bibliotecas + arquivos de suporte |
| **JDK** (Java Development Kit) | **Desenvolve** e executa | JRE **completo** + ferramentas de desenvolvimento (javac, javadoc, jdb...) |
| **SDK** (sentido amplo) | Mesma coisa que JDK na prática | JDK + documentação + exemplos + licença |

> ➜ Hoje os termos **“Java SDK”** e **“JDK”** são usados como sinônimos.

---

### **Instalação típica – estrutura de pastas (Windows/Linux/macOS)**

```bash
C:\Program Files\Java\jdk-21\
 ├─ bin/          ← executáveis (javac, java, jar...)
 ├─ lib/          ← bibliotecas (tools.jar, src.zip, jrt-fs.jar...)
 ├─ include/      ← headers JNI
 ├─ jmods/        ← módulos (a partir do Java 9)
 ├─ conf/         ← arquivos de configuração (ex.: security/policy)
 └─ release       ← metadados da build
```

---

### **Exemplo de uso – linha de comando**

```bash
# 1. compilar
javac OlaMundo.java          # gera OlaMundo.class

# 2. executar
java OlaMundo                # JVM carrega e roda o bytecode

# 3. gerar doc
javadoc -d doc OlaMundo.java # HTML da documentação

# 4. empacotar
jar cf OlaMundo.jar OlaMundo.class
```

---

### **SDKs especializados (ecossistema Java)**

| Nome | Descrição |
| ------ | ----------- |
| **Java SE SDK (Standard Edition)** | Desktop, console, base para tudo (é o JDK comum). |
| **Java EE SDK / Jakarta EE** | Servlets, EJB, JPA, JAX-RS... – **servidores corporativos**. |
| **Java ME SDK (Micro Edition)** | Dispositivos embarcados / antigos celulares. |
| **Android SDK** | **Não usa Java bytecode**, mas linguagem Java/Kotlin → Dalvik/ART; traz ferramentas próprias (adb, dx, aapt...). |

---

## **IDE**

IDE (Integrated Development Environment) é um ambiente de desenvolvimento integrado:
um único programa que reúne editor de código, compilador, depurador, teste, refactor, gerenciamento de projetos, plugins, etc. – tudo para agilizar a vida do desenvolvedor Java.

### **Funcionalidades comuns das IDEs Java**

| Recurso                           | Para que serve                                                      |
| --------------------------------- | ------------------------------------------------------------------- |
| **Editor inteligente**            | Syntax-highlight, auto-complete, importações automáticas, quick-fix |
| **Compilação integrada**          | Roda `javac` ou Gradle/Maven em background                          |
| **Debugger visual**               | Breakpoints, inspeção de variáveis, step into/step over             |
| **Refatoração**                   | Rename, extract method, introduce variable, change signature        |
| **Teste**                         | JUnit/TestNG integrado, cobertura                                   |
| **Build tools**                   | Gradle, Maven, Ant – painel gráfico + terminal                      |
| **Gerenciamento de dependências** | Auto-download de bibliotecas (Maven Central)                        |
| **Plugins/Extensões**             | Suporte para Spring, Jakarta EE, Android, Kotlin, Docker, etc.      |
| **Versionamento**                 | Git, SVN, integrado com diff, commit, push, branch graph            |
| **Application servers**           | Deploy direto em Tomcat, WildFly, Payara, etc.                      |
| **Profiling**                     | Análise de memória, CPU, threads (em IDEs maiores)                  |

### **IDEs Java mais usadas**

| IDE                          | Desenvolvedor      | Gratuito?                            | Principais diferenciais                                                                     |
| ---------------------------- | ------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------- |
| **IntelliJ IDEA**            | JetBrains          | Community: **sim**    Ultimate: pago | Autocomplete mais “inteligente”, refactor avançado, excelente suporte Spring/Kotlin/Android |
| **Eclipse**                  | Eclipse Foundation | **100 % gratuito**                   | Modular (plugins), muito usado em corporações e RCP, grande comunidade                      |
| **Apache NetBeans**          | Apache             | **Gratuito**                         | Interface limpa, suporte nativo Maven/Gradle, bom para Java SE/EE, PHP, C/C++               |
| **Visual Studio Code**       | Microsoft          | **Gratuito**                         | Leve, extensão “Extension Pack for Java” (Red Hat), roda em qualquer OS, multi-linguagem    |
| **BlueJ**                    | Kent University    | **Gratuito**                         | Foco em **ensino** POO, interface gráfica simples, usada em cursos introdutórios            |
| **Greenfoot**                | King's College     | **Gratuito**                         | IDE educacional para Java + jogos/animações, ideal para iniciantes                          |
| **JDeveloper**               | Oracle             | **Gratuito**                         | Forte integração com Oracle ADF, Coherence, BPEL (mundo Oracle)                             |
| **MyEclipse**                | Genuitec           | **Pago**                             | Eclipse “turbinado” com Spring, Maven, JSF, etc., pré-empacotado                            |
| **Spring Tools Suite (STS)** | VMware             | **Gratuito**                         | Eclipse customizado para Spring Boot, com dashboard de microsserviços                       |

## **Palavras Chaves (keywords)**

Palavras-chave são **termos reservados** da linguagem:  

* **Não podem ser usados** como nomes de variáveis, classes, métodos, pacotes, constantes, etc.  
* São **minúsculas** (exceto `const` e `goto`, que estão reservadas mas **não utilizadas**).  
* Possuem **significado pré-defido** pelo compilador.

---

### **Grupos funcionais (Java 21)**

| Categoria | Keywords |
| ----------- | ---------- |
| **Controle de acesso** | `private` `protected` `public` |
| **Controle de classe / herança** | `class` `extends` `implements` `interface` `enum` `record` `abstract` `final` `sealed` `non-sealed` `permits` |
| **Pacotes** | `package` `import` `module` `requires` `exports` `opens` `provides` `uses` |
| **Tipos primitivos** | `boolean` `byte` `char` `short` `int` `long` `float` `double` |
| **Fluxo de execução** | `if` `else` `switch` `case` `default` `while` `do` `for` `break` `continue` `return` `yield` |
| **Tratamento de exceções** | `try` `catch` `finally` `throw` `throws` |
| **Memória / objeto** | `new` `this` `super` `instanceof` `null` `static` `final` `volatile` `transient` |
| **Threads** | `synchronized` `volatile` |
| **Valor & referência** | `true` `false` `null` |
| **Não utilizadas (reservadas)** | `goto` `const` |
| **Novas (Java 10+)*** | `var` (inferência de tipo local) |

\* `var` **não é** um tipo – é uma **palavra-chave contextual** (só vale dentro de métodos, não pode ser usada em campos de classe).

---

### **Exemplos práticos – cada keyword em ação**

```java
package br.com.exemplo;        // package

import java.util.List;         // import

public class PalavrasChave {   // public, class

    private int numero;        // private, int
    protected String nome;     // protected, String
    public static final double PI = 3.14; // public, static, final, double

    public PalavrasChave(int numero) { // constructor
        this.numero = numero;          // this
    }

    public void testar() {             // void
        if (numero > 0) {              // if
            switch (numero) {          // switch, case, default, break
                case 1:
                    System.out.println("um");
                    break;
                default:
                    System.out.println("outro");
            }
        } else {
            return;                    // return
        }

        try {                          // try, catch, finally
            int x = 10 / numero;
        } catch (ArithmeticException e) {
            throw new RuntimeException("Erro"); // throw, new
        } finally {
            System.out.println("fim");
        }

        for (int i = 0; i < 3; i++) {  // for, continue
            if (i == 1) continue;
            System.out.println(i);
        }
    }

    static void metodoClasse() { }     // static

    class Interna { }                  // (palavra reservada) class

    enum Dia { SEG, TER }              // enum

    record Ponto(int x, int y) { }    // record
}
```

---

## **Regras de uso**

1. **Nunca** use palavras-chave como identificadores:

   ```java
   int class = 5;   // ❌ erro de compilação
   ```

2. **true, false, null** são **literais**, não nomes de variáveis.
3. **`goto` e `const`** estão **reservadas** mas **não têm funcionalidade** – geram erro se tentar usar.
4. **`var`** só pode aparecer em **declarações locais** com inicializador:

   ```java
   var nome = "Maria";     // ✅
   var idade;              // ❌ erro: sem inicializador
   ```

---

### **Resumo**

> **Palavras-chave** são os **termos sagrados** da linguagem Java: **reservados, imutáveis e essenciais** para **definir toda a sintaxe e o comportamento** do código.
