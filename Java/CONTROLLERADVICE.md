# 🚨 Tratamento de Exceções em API REST (Java)

- **padronize respostas** e **evite stack-trace para o cliente**

> **Objetivo**: **capturar** qualquer erro, **logar** internamente e **devolver JSON amigável** com **código HTTP correto**.

---

## Estrutura de resposta de erro (DTO)

```java
public record ErroResponse(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path
) {}
```

**Exemplo JSON devolvido**:

```json
{
  "timestamp": "2024-07-15T14:30:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Cliente id=999 não encontrado",
  "path": "/api/clientes/999"
}
```

---

## **Exceções de negócio** – **crie as suas**

```java
public class RecursoNaoEncontradoException extends RuntimeException {
    public RecursoNaoEncontradoException(String msg) { super(msg); }
}

public class DadosInvalidosException extends RuntimeException {
    public DadosInvalidosException(String msg) { super(msg); }
}
```

---

## **Controller Advice** – **tratamento global** (Spring)

```java
@RestControllerAdvice   // captura de TODOS os controllers
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ErroResponse> handleNaoEncontrado(
            RecursoNaoEncontradoException ex,
            HttpServletRequest request) {

        log.warn("Recurso não encontrado: {}", ex.getMessage());

        ErroResponse erro = new ErroResponse(
                Instant.now(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
    }

    @ExceptionHandler(DadosInvalidosException.class)
    public ResponseEntity<ErroResponse> handleInvalido(
            DadosInvalidosException ex,
            HttpServletRequest request) {

        ErroResponse erro = new ErroResponse(
                Instant.now(),
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.badRequest().body(erro);
    }
}
```

---

## **Validação de bean** – **devolver erros de formulário**

```java
public record ClienteRequest(
    @NotBlank String nome,
    @Email String email,
    @Past LocalDate dataNascimento
) {}
```

**No controller**:

```java
@PostMapping
public ResponseEntity<ClienteResponse> criar(
        @Valid @RequestBody ClienteRequest dto) { ... }
```

**Tratamento**:

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ErroValidacaoResponse> handleValidacao(
        MethodArgumentNotValidException ex,
        HttpServletRequest req) {

    List<CampoError> campos = ex.getBindingResult().getFieldErrors()
        .stream()
        .map(fe -> new CampoError(fe.getField(), fe.getDefaultMessage()))
        .toList();

    ErroValidacaoResponse erro = new ErroValidacaoResponse(
            Instant.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Validação falhou",
            req.getRequestURI(),
            campos
    );
    return ResponseEntity.badRequest().body(erro);
}
```

**DTOs**:

```java
public record CampoError(String campo, String mensagem) {}
public record ErroValidacaoResponse(
        Instant timestamp,
        int status,
        String message,
        String path,
        List<CampoError> campos) {}
```

**Resultado**:

```json
{
  "timestamp": "2024-07-15T14:35:00Z",
  "status": 400,
  "message": "Validação falhou",
  "path": "/api/clientes",
  "campos": [
    { "campo": "email", "mensagem": "deve ser um endereço de e-mail bem formado" },
    { "campo": "dataNascimento", "mensagem": "deve estar no passado" }
  ]
}
```

---

## **Exceções do sistema** – **HTTP 500**

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<ErroResponse> handleTudo(
        Exception ex,
        HttpServletRequest request) {

    log.error("Erro inesperado", ex);  // **stack-trace interno**

    ErroResponse erro = new ErroResponse(
            Instant.now(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Erro interno",
            "Ocorreu um erro inesperado. Tente novamente mais tarde.",
            request.getRequestURI()
    );
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
}
```

**NUNCA** exponha `ex.getMessage()` **se for técnico** (ex: `NullPointerException`).

---

## **Spring Boot** – **configurações úteis**

```properties
# application.properties
server.error.include-message=always
server.error.include-binding-errors=always
server.error.include-stacktrace=on-param  # ou never
```

**Log pattern**:

```properties
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
logging.level.root=WARN
logging.level.br.com.empresa=DEBUG
```

---

## **Códigos HTTP mais usados**

| Código | Quando usar |
| -------- | ------------- |
| **400** | dados inválidos (bean validation) |
| **401** | não autenticado |
| **403** | autenticado, mas sem permissão |
| **404** | recurso não encontrado |
| **409** | conflito (ex: e-mail duplicado) |
| **422** | entidade processável, mas lógica inválida |
| **500** | erro inesperado do servidor |

---

## **Exemplo completo** – **fluxo de criação**

**Controller**:

```java
@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService service;

    @GetMapping("/{id}")
    public ClienteResponse buscar(@PathVariable Long id) {
        return service.buscar(id); // lança RecursoNaoEncontradoException se não existir
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> criar(@Valid @RequestBody ClienteRequest dto) {
        ClienteResponse salvo = service.criar(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvo.id())
                .toUri();
        return ResponseEntity.created(uri).body(salvo);
    }
}
```

**Service**:

```java
@Service
public class ClienteService {

    private final ClienteRepository repo;

    public ClienteResponse buscar(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente id=" + id + " não encontrado"));
    }
}
```

---

## **Dicas finais & boas práticas**

✅ **Sempre** **logue** **exceções** do servidor (com **stack-trace**) – **nunca exponha para o cliente**.  
✅ **Use** **códigos HTTP corretos** – **não devolva 200 com erro dentro do body**.  
✅ **Crie exceções de negócio** **específicas** – **facilita manutenção**.  
✅ **Documente** **respostas de erro** no **OpenAPI/Swagger**:

```yaml
components:
  schemas:
    ErroResponse:
      type: object
      properties:
        timestamp: { type: string, format: date-time }
        status: { type: integer }
        error: { type: string }
        message: { type: string }
        path: { type: string }
```

✅ **Valide** **tudo** – **use Bean Validation** (`@NotBlank`, `@Email`, etc.).  

---

## **Resumo de 1 frase**

> **Capture exceções com `@ControllerAdvice`**, **devolva JSON padronizado** com **código HTTP correto**, **logue stack-trace internamente** e **use Bean Validation** para **transformar violações em respostas amigáveis** – **assim sua API REST** **nunca expõe erros técnicos ao cliente**.
