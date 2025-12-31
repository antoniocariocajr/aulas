# 🔍 Reflection API – Inspecionar e manipular classes **em tempo de execução** (Java)

> **Objetivo**: obter **metadados** de classes, campos, métodos, construtores **sem saber os nomes em tempo de compilação** e **criar/invocar dinamicamente**.

---

## O que é Reflection?

- **API** em `java.lang.reflect` + `java.lang.Class`  
- **Descobre** estrutura de **objetos desconhecidos** → **frameworks** (Spring, Hibernate, Jackson)  
- **Custo**: **mais lento**, **quebra encapsulamento** → **use com moderação**

---

## Obtendo o objeto `Class` – **porta de entrada**

```java
// 1. literal
Class<?> clazz = String.class;

// 2. instância
Class<?> clazz2 = "hello".getClass();

// 3. Class.forName
Class<?> clazz3 = Class.forName("java.util.ArrayList");
```

---

## Inspecionando membros

### 🔹 Campos (Fields)

```java
Field[] fields = clazz.getDeclaredFields();        // todos (private também)
Field f = clazz.getDeclaredField("nome");

f.setAccessible(true);         // quebra private
String valor = (String) f.get(obj);   // lê valor
f.set(obj, "Novo");                   // altera
```

### 🔹 Construtores

```java
Constructor<?> cons = clazz.getConstructor(String.class, int.class);
Object instancia = cons.newInstance("Ana", 25);
```

### 🔹 Métodos

```java
Method m = clazz.getMethod("apresentar");   // público
m.invoke(instancia);                        // chama método

// método com retorno
Method soma = clazz.getMethod("soma", int.class, int.class);
int resultado = (Integer) soma.invoke(null, 3, 4);  // static
```

---

## Acessando **campos privados** – **quebra encapsulamento**

```java
public class Pessoa {
    private String nome;
    private int idade;
}

Pessoa p = new Pessoa("Maria", 30);

Field fNome = Pessoa.class.getDeclaredField("nome");
fNome.setAccessible(true);        // **private**
String nome = (String) fNome.get(p);
System.out.println(nome); // Maria
```

---

## Anotações – **descobrir em runtime**

```java
@Retention(RetentionPolicy.RUNTIME)
@interface Tabela { String value(); }

@Tabela("clientes")
class Cliente { }

// ----
Tabela anot = Cliente.class.getAnnotation(Tabela.class);
System.out.println(anot.value()); // clientes
```

**Descobrir campos anotados**:

```java
Field[] campos = clazz.getDeclaredFields();
for (Field f : campos) {
    if (f.isAnnotationPresent(Column.class)) {
        Column col = f.getAnnotation(Column.class);
        System.out.println(f.getName() + " -> " + col.name());
    }
}
```

---

## Criando **array dinâmico**

```java
int[] arr = (int[]) Array.newInstance(int.class, 5);
Array.set(arr, 0, 42);
int valor = Array.getInt(arr, 0);
```

---

## Proxy dinâmico – **implementar interface em runtime**

```java
public interface Servico {
    void executar();
}

Servico proxy = (Servico) Proxy.newProxyInstance(
        Servico.class.getClassLoader(),
        new Class<?>[]{Servico.class},
        (p, m, args) -> {
            System.out.println("Antes");
            Object ret = null;
            System.out.println("Depois");
            return ret;
        });

proxy.executar(); // código do handler é executado
```

---

## Exemplo prático – **serializador JSON simples**

```java
public static String toJson(Object obj) throws Exception {
    Class<?> clazz = obj.getClass();
    StringBuilder sb = new StringBuilder("{");
    for (Field f : clazz.getDeclaredFields()) {
        f.setAccessible(true);
        sb.append("\"").append(f.getName()).append("\":");
        sb.append("\"").append(f.get(obj)).append("\",");
    }
    if (sb.charAt(sb.length() - 1) == ',') sb.setLength(sb.length() - 1);
    sb.append("}");
    return sb.toString();
}
```

Uso:

```java
Pessoa p = new Pessoa("Ana", 25);
String json = toJson(p);
// {"nome":"Ana","idade":"25"}
```

---

## **Record** com Reflection (Java 16+)

```java
public record Pessoa(String nome, int idade) { }

Pessoa p = new Pessoa("Lucas", 30);
Class<?> clazz = p.getClass();

// campos (componentes)
for (Field f : clazz.getDeclaredFields()) {
    f.setAccessible(true);
    System.out.println(f.getName() + " = " + f.get(p));
}
```

---

## **Custo & boas práticas**

✅ **Use quando**:

- Frameworks (Spring, Hibernate, JAXB)  
- Serializadores customizados  
- Plugins/Extensões (anotações em tempo de execução)  
- Proxy dinâmico (AOP simples)  

❌ **Evite**:

- **Caminho crítico de performance** (loops milionários)  
- **Quebrar encapsulamento** sem necessidade  
- **Substituir** **polimorfismo ou strategy**  

**Dicas**:

1. **Cache** `Class`, `Method`, `Field` – **evite pesquisa repetida**.  
2. **setAccessible(true)** → **quebra segurança** – **use com cuidado**.  
3. **Prefira** **anotações com `RetentionPolicy.RUNTIME`** **se precisar ler**.  
4. **Trate** `InvocationTargetException` – **causa real está dentro**.  
5. **Em JDK 17+** **modules** podem **negar acesso** – **abra módulo** (`--add-opens`).

---

## **Resumo de 1 frase**

> **Reflection** **descobre e manipula** classes, campos, métodos e anotações **em tempo de execução** – **essencial para frameworks**, mas **lento e quebra encapsulamento**, **use com moderação e cache os metadados**.
