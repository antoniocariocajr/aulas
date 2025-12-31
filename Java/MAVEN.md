# 📦 Maven em Java – **gestão de dependências, build e vida real**

> **Apache Maven** é **ferramenta de automação de build** baseada em **convenção sobre configuração** (convention over configuration) que **baixa bibliotecas**, **compila**, **empacota** e **publica** seu projeto **com 1 comando**.

---

## Instalação rápida

1. **Baixe** em [maven.apache.org](https://maven.apache.org)  
2. **Descompacte** + adicione `MAVEN_HOME/bin` ao `PATH`  
3. **Teste**:

```bash
mvn -version
```

**Saída**:

```bash
Apache Maven 3.9.6
Java version: 21
```

---

## Estrutura de diretórios (convenção)

```bash
meu-app/
├── pom.xml                 # coração do Maven
├── src/
│   ├── main/
│   │   ├── java/           # código fonte
│   │   ├── resources/      # arquivos do classpath (xml, properties)
│   │   └── webapp/         # apenas projetos web (WEB-INF, etc.)
│   └── test/
│       ├── java/           # testes (JUnit)
│       └── resources/      # recursos dos testes
└── target/                 # saída gerada (compilado, jar, war, reports)
```

---

## `pom.xml` – **Project Object Model**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- coordenada do projeto -->
    <groupId>br.com.empresa</groupId>
    <artifactId>meu-app</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging> <!-- jar (padrão), war, pom -->

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- dependências -->
    <dependencies>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
            <version>3.14.0</version>
        </dependency>

        <!-- apenas escopo de teste -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!-- plugins de build -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.12.1</version>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## Comandos essenciais (vida real)

| Comando | Descrição |
| --------- | ----------- |
| `mvn clean` | apaga pasta `target` |
| `mvn compile` | compila (`target/classes`) |
| `mvn test` | roda **todos os testes** (JUnit) |
| `mvn package` | cria **JAR/WAR** (`target/meu-app-1.0.0.jar`) |
| `mvn install` | empacota e **instala no repositório local** (`~/.m2`) |
| `mvn deploy` | publica no **repositório remoto** (Nexus/Artifactory) |
| `mvn spring-boot:run` | roda aplicação Spring (plugin) |
| `mvn dependency:tree` | **árvore de dependências** |
| `mvn dependency:analyze` | **dependências não usadas** |

**Execução rápida**:

```bash
mvn clean package           # compila + testa + empacota
java -jar target/meu-app-1.0.0.jar
```

---

## Escopos (scope)

| Escopo | Significado |
| -------- | ------------- |
| **compile** (padrão) | disponível **em tempo de compilação e runtime** |
| **test** | **só para testes** (não entra no JAR final) |
| **provided** | **fornecido pelo container** (ex: servlet-api no Tomcat) |
| **runtime** | **não usado na compilação**, mas **precisa para rodar** |
| **system** | **caminho local absoluto** (evite) |

---

## Repositórios – **onde o Maven busca**

**Padrão** → **Maven Central**  
Adicione outros:

```xml
<repositories>
    <repository>
        <id>company-nexus</id>
        <url>https://nexus.empresa.com/repository/maven-public/</url>
    </repository>
</repositories>
```

---

## **Parent POM** – herdar configurações

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.5</version>
</parent>
```

**Herda**: plugins, versões de dependências, propriedades, etc.

---

## **Módulos** (multi-project)

```bash
/pai
├── pom.xml   (packaging = pom)
├── core/
│   └── pom.xml
└── web/
    └── pom.xml
```

**Pai** declara:

```xml
<modules>
    <module>core</module>
    <module>web</module>
</modules>
```

**Compilar tudo**:

```bash
mvn clean install  # compila pai + filhos na ordem correta
```

---

## **Perfis** (profiles) – **mesmo projeto, builds diferentes**

```xml
<profiles>
    <profile>
        <id>dev</id>
        <properties>
            <ambiente>desenvolvimento</ambiente>
        </properties>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <ambiente>producao</ambiente>
        </properties>
    </profile>
</profiles>
```

**Ativar**:

```bash
mvn package -P prod
```

---

## **Wrapper** Maven (mvnw) – **sem instalar Maven**

```bash
# gera wrapper (1 vez)
mvn wrapper:wrapper

# depois use
./mvnw clean package   # Linux/Mac
mvnw.cmd clean package # Windows
```

**Benefício**: **garante versão** do Maven para **toda equipe**.

---

## **Gradle vs Maven** – **visão rápida**

| Maven | Gradle |
| ------- | -------- |
| **XML** | **Groovy/Kotlin DSL** |
| **Convenção rígida** | **flexível** |
| **plugins pré-definidos** | **task-based** |
| **muito usado em empresas** | **Android, projetos novos** |

**Ambos** gerenciam **dependências e build**.

---

## **Boas práticas & dicas**

1. **Sempre** defina **encoding UTF-8** e **java version** nas **properties**.  
2. **Nunca commite** pasta `target/` – **adicione ao .gitignore**.  
3. **Use** `dependency:analyze` para **remover libs não usadas**.  
4. **Defina versões** via **properties** – **facilita upgrade**.  
5. **Repositório privado** (Nexus/Artifactory) → **mais rápido + proxy da Central**.  
6. **mvn dependency:tree -Dincludes=groupId:artifactId** → **encontra conflitos**.  
7. **Evite** `system` scope – **prefira** repositório privado.  
8. **Documente** **comandos principais** no `README.md`.

---

## **Resumo de 1 frase**

> **Maven** **baixa dependências**, **compila**, **testa**, **empacota** e **publica** seu projeto **com 1 comando** (`mvn clean package`) **a partir de um pom.xml** que **descreve coordenadas, libs e plugins** – **use profiles, modules e wrapper** para **builds profissionais**.
