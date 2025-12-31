# 🥒 Gherkin

- **linguagem legível para cenários de teste** (Cucumber / BDD)

> **Gherkin** é **sintaxe simples** que **descreve comportamentos** em **português ou inglês** e **pode ser executada** pelo **Cucumber**.

---

## 1️⃣ Objetivo do Gherkin

- **Comunicação** entre **negócio, QA e dev**  
- **Documentação viva** dos comportamentos  
- **Base para geração automática de testes**

---

## Palavras-chave (keywords)

| Português | Inglês | Uso |
| ----------- | -------- | ----- |
| **Funcionalidade** | **Feature** | **conjunto de cenários** |
| **Cenário** | **Scenario** | **caso de teste único** |
| **Esquema do Cenário** | **Scenario Outline** | **caso com tabela de exemplos** |
| **Exemplos** | **Examples** | **tabela de dados para o esquema** |
| **Dado** | **Given** | **contexto inicial** |
| **Quando** | **When** | **ação/evento** |
| **Então** | **Then** | **resultado esperado** |
| **E** | **And** | **continuação das anteriores** |
| **Mas** | **But** | **exceção/negativação** |
| **Contexto** | **Background** | **passos comuns a todos os cenários** |

---

## Estrutura básica (português)

```gherkin
# language: pt                     ← opcional, define idioma
Funcionalidade: Soma de inteiros
  Como usuário da calculadora
  Quero somar dois números
  Para obter o resultado correto

  Cenário: Soma de números positivos
    Dado que eu informei os valores 5 e 3
    Quando eu solicitar a soma
    Então o resultado deve ser 8
```

**Arquivo**: `soma.feature` (extensão `.feature`)

---

## **Cenário comum** – **passo a passo**

1. **Dado** (Given) – **prepara o sistema**  
2. **Quando** (When) – **ação principal**  
3. **Então** (Then) – **verificação esperada**

**Exemplo completo**:

```gherkin
Funcionalidade: Login de usuário

  Cenário: Login com sucesso
    Dado que o usuário "ana@mail.com" está cadastrado
    E a senha é "123456"
    Quando ele submete o login
    Então ele é redirecionado para o dashboard
    E a mensagem "Bem-vinda, Ana!" é exibida
```

---

## **Esquema do Cenário** – **parametrização**

```gherkin
Esquema do Cenário: Login com vários idiomas
  Dado que o idioma do sistema é "<idioma>"
  Quando eu faço login com usuário "<user>" e senha "<senha>"
  Então devo ver a mensagem "<mensagem>"

  Exemplos:
    | idioma | user     | senha | mensagem          |
    | pt     | ana      | 123   | Olá, Ana!         |
    | en     | ana      | 123   | Hello, Ana!       |
    | es     | ana      | 123   | ¡Hola, Ana!       |
```

**Cucumber** **substitui** `<coluna>` **pelos valores** da tabela – **1 cenário por linha**.

---

## **Doc String** – **bloco de texto grande**

```gherkin
Cenário: Criar artigo via API
  Dado que o usuário envia o seguinte JSON:
    """
    {
      "title": "Gherkin",
      "content": "Linguagem legível..."
    }
    """
  Quando ele POST em /articles
  Então o status deve ser 201
```

---

## **Data Table** – **tabelas pequenas inline**

```gherkin
Cenário: Adicionar itens ao carrinho
  Dado que eu tenho os produtos no estoque:
    | produto | quantidade |
    | Mouse   | 50         |
    | Teclado | 30         |
  Quando eu adiciono 2 unidades de Mouse
  Então o carrinho deve conter 2 Mouse
  E o estoque de Mouse deve ser 48
```

**No step Java**:

```java
@Given("que eu tenho os produtos no estoque:")
public void produtosNoEstoque(Map<String, Integer> tabela) {
    tabela.forEach((prod, qtd) -> cadastrarEstoque(prod, qtd));
}
```

---

## **Tags** – **agrupar/executar subconjuntos**

```gherkin
@smoke
@regressao
Funcionalidade: Login
  ...
```

**Rodar só smoke**:

```bash
cucumber --tags "@smoke"
```

**Maven**:

```bash
mvn test -Dcucumber.filter.tags="@smoke"
```

---

## **Background** – **passos comuns**

```gherkin
Funcionalidade: Carrinho

  Background:
    Given que estou logado como "cliente"
    And o estoque está inicializado

  Cenário: Adicionar item
    When eu adiciono 1 unidade de "Mouse"
    Then o carrinho deve conter 1 Mouse

  Cenário: Remover item
    When eu removo 1 unidade de "Mouse"
    Then o carrinho deve estar vazio
```

**Background roda antes de CADA cenário**.

---

## **Regras (Rules)** – **agrupar regras de negócio** (Cucumber 6+)

```gherkin
Funcionalidade: Cashback

  Regra: Cashback só aplica em compras > R$ 100

    Exemplo: Compra de R$ 150
      Given compra de R$ 150
      When calcula cashback
      Then cashback deve ser R$ 15

    Exemplo: Compra de R$ 50
      Given compra de R$ 50
      When calcula cashback
      Then cashback deve ser R$ 0
```

---

## **Dicas & boas práticas**

✅ **Escreva** **do ponto de vista do usuário** – **linguagem de negócio**.  
✅ **Um cenário = um comportamento único** – **não mega scripts**.  
✅ **Use** **parametrização** (`Esquema do Cenário`) **para dados variados**.  
✅ **Reutilize** **steps** – **não duplique frases**.  
✅ **Mantenha** **steps curtos** e **legíveis** – **lógica fica no Java**.  

❌ **Não coloque** **elementos de UI** (botão, campo) – **use conceito**:  
**Ruim**: `When clico no botão "Salvar"`  
**Bom**: `When eu solicitar o salvamento`

❌ **Não use** **Gherkin como linguagem de script** – **descreva comportamento**, **não automação**.

---

## **Exemplo completo** – **API REST**

```gherkin
# language: pt
@regressao
Funcionalidade: Gestão de usuários

  Cenário: Cadastrar novo usuário com sucesso
    Given que o e-mail "novo@mail.com" não está cadastrado
    When eu POST para /usuarios com:
      | nome | Ana Silva |
      | email | novo@mail.com |
    Then o status da resposta deve ser 201
    And a resposta deve conter o id do usuário criado

  Cenário: Tentar cadastrar e-mail duplicado
    Given que o e-mail "dup@mail.com" já está cadastrado
    When eu POST para /usuarios com:
      | nome | Bob |
      | email | dup@mail.com |
    Then o status da resposta deve ser 409
    And a mensagem deve ser "E-mail já existe"
```

**Steps Java** (exemplo):

```java
@Given("que o e-mail {string} não está cadastrado")
public void emailNaoCadastrado(String email) {
    // garante que não existe
}

@When("eu POST para /usuarios com:")
public void postUsuario(Map<String, String> dados) {
    String json = """
        {
          "nome": "%s",
          "email": "%s"
        }
        """.formatted(dados.get("nome"), dados.get("email"));
    response = RestAssured.given()
            .contentType(ContentType.JSON)
            .body(json)
            .post("/usuarios");
}

@Then("o status da resposta deve ser {int}")
public void validarStatus(int status) {
    response.then().statusCode(status);
}
```

---

## **Resumo de 1 frase**

> **Gherkin** é a **linguagem legível** (`.feature`) **de Cucumber** que **descreve comportamentos** com **palavras-chave** (`Dado/Quando/Então`, `Esquema do Cenário`, `Exemplos`) – **escreva do ponto de vista do usuário**, **parametrize com tabelas** e **vincule a steps Java** para **executar testes automatizados de BDD**.
