# 🐘 Gradle em Java – **build moderno, rápido e flexível**

> **Gradle** é uma **ferramenta de automação de build** baseada em **tasks** e **scripts Groovy/Kotlin**, que **substitui Maven** em muitos projetos por ser **mais rápida**, **incremental** e **extensível**.

---

## 1️⃣ Instalação rápida

1.**SDKMAN** (recomendado)

```bash
sdk install gradle 8.7
```

2.**Manual** – [gradle.org](https://gradle.org) → descompacte + adicione `GRADLE_HOME/bin` ao `PATH`

**Teste**:

```bash
gradle --version
```

---

## Estrutura de um projeto Gradle (convenção)

```bash
meu-app/
├── build.gradle(.kts)      # script de build (Groovy ou Kotlin)
├── settings.gradle(.kts)   # nome do projeto + módulos
├── gradle/
│   └── wrapper/            # garante mesma versão em todo lugar
├── gradlew & gradlew.bat   # scripts wrapper (Linux/Windows)
└── src/
    ├── main/java/          # código
    ├── main/resources/     # arquivos do classpath
    ├── test/java/          # testes
    └── test/resources/
build/                      # saída (classes, jars, reports)
```

---

## **build.gradle** (Groovy DSL) – **exemplo mínimo Java**

```groovy
plugins {
    id 'java'
    id 'application'        // opcional: gera startScripts
}

group = 'br.com.empresa'
version = '1.0.0'

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.apache.commons:commons-lang3:3.14.0'
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.2'
}

application {
    mainClass = 'br.com.empresa.Main'
}

test {
    useJUnitPlatform()
}
```

**Mesma coisa em Kotlin DSL** (`build.gradle.kts`):

```kotlin
plugins {
    java
    application
}

group = "br.com.empresa"
version = "1.0.0"

java.toolchain.languageVersion.set(JavaLanguageVersion.of(21)))

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.apache.commons:commons-lang3:3.14.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.2")
}

application {
    mainClass.set("br.com.empresa.Main")
}

tasks.test {
    useJUnitPlatform()
}
```

---

## Comandos do dia-a-dia

| Tarefa | Comando |
| -------- | --------- |
| compilar | `gradle build` |
| compilar **sem testes** | `gradle assemble` |
| rodar testes | `gradle test` |
| executar app | `gradle run` |
| limpar | `gradle clean` |
| gerar scripts/start | `gradle installDist` |
| ver dependências | `gradle dependencies` |
| árvore de dependências | `gradle dependencyInsight --dependency gson` |
| **build rápido** (paralelo) | `gradle build --parallel` |

**Execução**:

```bash
./gradlew build        # Linux/Mac
gradlew.bat build      # Windows
```

---

## **Wrapper Gradle** – **sem instalar Gradle**

```bash
# gera /gradlew (1×)
gradle wrapper --gradle-version 8.7

# use sempre
./gradlew build
```

**Vantagem**: **garante mesma versão** para **toda equipe / CI**.

---

## Dependências – **escopos**

| Escopo | Significado |
| -------- | ------------- |
| `implementation` | **runtime + compilação** (não expõe para consumidores) |
| `api` | **igual implementation**, mas **exporta para quem depende deste módulo** (use em **bibliotecas**) |
| `compileOnly` | **só compila** (ex: APIs fornecidas por container) |
| `runtimeOnly` | **só em execução** |
| `testImplementation` | **testes** (JUnit, Mockito) |

Exemplo **biblioteca**:

```groovy
dependencies {
    api 'org.example:core:2.0'        // transitivo
    implementation 'org.slf4j:slf4j-api:2.0.12'
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.2'
}
```

---

## **Multi-módulo** (mono-repo)

**settings.gradle**:

```groovy
rootProject.name = 'app-grad'
include 'core', 'web'
```

**build.gradle** do **root** (opcional config comum):

```groovy
subprojects {
    apply plugin: 'java'
    repositories { mavenCentral() }
}
```

**Módulo `core/build.gradle`**:

```groovy
dependencies {
    implementation 'org.apache.commons:commons-lang3:3.14.0'
}
```

**Compilar tudo**:

```bash
./gradlew build   # root + filhos na ordem correta
```

---

## **Tasks customizadas**

```groovy
tasks.register('hello') {
    group = 'custom'
    description = 'Imprime saudação'
    doLast {
        println "Olá, Gradle!"
    }
}
```

**Executar**:

```bash
./gradlew hello
```

**Copiar artefato após build**:

```groovy
tasks.register('copiarJar', Copy) {
    from buildDir
    include "*.jar"
    into "$buildDir/outputs"
}
build.finalizedBy(copiarJar)
```

---

## **Publishing** – publicar no repositório

```groovy
plugins {
    `maven-publish`
}

publishing {
    publications {
        maven(MavenPublication) {
            from components.java
        }
    }
    repositories {
        maven {
            name = "company"
            url = uri("https://nexus.empresa.com/repository/maven-releases/")
            credentials(PasswordCredentials)
        }
    }
}
```

**Publicar**:

```bash
./gradlew publish
```

---

## **Gradle vs Maven** – **comparação rápida**

| Característica | Gradle | Maven |
| ---------------- | -------- | ------- |
| **Script** | Groovy/Kotlin (DSL) | XML |
| **Performance** | **incremental, cache de build** | **repete tudo** |
| **Convenção** | flexível | rígida |
| **Integração IDE** | Excelente (IntelliJ, Eclipse, VS Code) | Excelente |
| **Ecossistema** | Android, Kotlin, Spring Boot, Micronaut | tradicional corporativo |

**Ambos** gerenciam **dependências** e **lifecycles**.

---

## **Spring Boot + Gradle** – **start.spring.io**

**Escolha**:  

- **Project**: Gradle  
- **Language**: Java/Kotlin  
- **Dependencies**: Web, JPA, Lombok...

**Gerado `build.gradle`**:

```groovy
plugins {
    id 'org.springframework.boot' version '3.2.5'
    id 'io.spring.dependency-management' version '1.1.4'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

**Rodar**:

```bash
./gradlew bootRun
```

---

## **Boas práticas & dicas**

1. **Sempre** commite **gradlew + gradle/wrapper** – **build reprodutível**.  
2. **Defina** **toolchain Java** → **build funciona em qualquer máquina**.  
3. **Use** `implementation` **a menos que** precise **exportar** (aí `api`).  
4. **Versões** em **gradle.properties** ou **catalog (TOML)** – **centralize**.  
5. **Cache** `--build-cache` ou **Gradle Build Cache** → **CI mais rápido**.  
6. **Scan** `./gradlew build --scan`** → **relatório online** (tempos, erros).  
7. **Evite** **scripts gigantes** – **crie plugins/conventions separados**.  
8. **Documente** **comandos principais** no `README.md`.

---

## **Resumo de 1 frase**

> **Gradle** **baixa dependências, compila, testa, empacota e publica** seu projeto **via scripts Groovy/Kotlin** (`build.gradle`) **mais rápido e flexível que Maven** – **use `./gradlew build` `e`**aproveite **cache, tasks e multi-módulos** para **builds profissionais**.
