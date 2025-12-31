# 🧵 Threads em Java – visão geral, criação, ciclo de vida, sincronização e boas práticas

> Thread = **unidade leve de execução** que **permite múltiplas tarefas simultâneas** (concorrência/paralelismo).

---

## Duas formas de criar Thread

### a) Estendendo `Thread` (menos usado)

```java
class MinhaThread extends Thread {
    @Override
    public void run() {                 // código que executa em paralelo
        for (int i = 0; i < 5; i++) {
            System.out.println(getName() + " - " + i);
            try { Thread.sleep(500); } catch (InterruptedException e) { }
        }
    }
}

// uso
MinhaThread t1 = new MinhaThread();
t1.setName("T1");
t1.start();     // **nunca chame run() diretamente**
```

### b) Implementando `Runnable` (preferível)

```java
class Tarefa implements Runnable {
    @Override
    public void run() {
        System.out.println("Executando: " + Thread.currentThread().getName());
    }
}

// uso
Thread t2 = new Thread(new Tarefa(), "T2");
t2.start();
```

**Lambda** (Java 8+):

```java
Thread t3 = new Thread(() -> {
    System.out.println("Lambda thread");
}, "T3");
t3.start();
```

---

## Ciclo de vida de uma Thread

| Estado | Método/Condição |
| -------- | ----------------- |
| **NEW** | `new Thread(...)` |
| **RUNNABLE** | `start()` – pronta para executar |
| **BLOCKED** | esperando **monitor lock** |
| **WAITING** | `wait()`, `join()`, `park()` – aguardando sinal |
| **TIMED_WAITING** | `sleep(ms)`, `wait(timeout)` |
| **TERMINATED** | run() terminou |

**Obter estado**:

```java
Thread.State estado = thread.getState();
```

---

## Controle básico

| Método | Descrição |
| -------- | ----------- |
| `start()` | inicia execução |
| `sleep(long ms)` | pausa **sem liberar lock** |
| `join()` | aguarda término da thread |
| `interrupt()` | **sinaliza** interrupção (flag) |
| `isInterrupted()` | consulta flag |
| `yield()` | dica para scheduler liberar CPU |

Exemplo **join**:

```java
Thread t = new Thread(() -> { /* trabalho */ }, "T");
t.start();
t.join(); // aguarda T terminar
System.out.println("Thread T terminou");
```

---

## Interrupção correta

```java
public class TarefaLonga implements Runnable {
    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            // trabalho
            System.out.println("Trabalhando...");
            try {
                Thread.sleep(1_000);
            } catch (InterruptedException e) {
                // sleep limpa a flag → restauramos
                Thread.currentThread().interrupt();
                System.out.println("Interrompido");
                break;
            }
        }
    }
}

// main
Thread t = new Thread(new TarefaLonga(), "Longa");
t.start();
Thread.sleep(3_000);
t.interrupt(); // pede parada
```

---

## Sincronização – **race condition**

**Problema**:

```java
class Contador {
    private int count = 0;
    void incrementar() { count++; } // não é atômico
}
```

**Solução 1: synchronized.**

```java
class Contador {
    private int count = 0;
    synchronized void incrementar() { count++; } // lock implícito
}
```

**Solução 2: Lock explícito.**

```java
private final Lock lock = new ReentrantLock();

void incrementar() {
    lock.lock();
    try { count++; }
    finally { lock.unlock(); }
}
```

**Solução 3: classes atômicas.**

```java
private final AtomicInteger count = new AtomicInteger(0);
void incrementar() { count.incrementAndGet(); }
```

---

## Wait / Notify (cooperação)

```java
class Fila {
    private final Queue<Integer> fila = new LinkedList<>();
    private final Object lock = new Object();

    void colocar(Integer item) throws InterruptedException {
        synchronized (lock) {
            fila.add(item);
            lock.notify(); // acorda consumidor
        }
    }

    Integer retirar() throws InterruptedException {
        synchronized (lock) {
            while (fila.isEmpty()) lock.wait(); // libera lock e espera
            return fila.poll();
        }
    }
}
```

---

## Thread pool – **ExecutorService** (forma moderna)

**Nunca** crie threads manualmente para **tarefas curtas** – **use pool**.

```java
ExecutorService pool = Executors.newFixedThreadPool(4);

for (int i = 0; i < 10; i++) {
    final int tarefaId = i;
    pool.submit(() -> System.out.println("Tarefa " + tarefaId + " - " + Thread.currentThread().getName()));
}

pool.shutdown(); // **finaliza** pool (não aceita novas)
// pool.awaitTermination(1, TimeUnit.MINUTES);
```

**Scheduler/Cache**:

```java
Executors.newCachedThreadPool();     // cria conforme demanda
Executors.newScheduledThreadPool(2); // agenda tarefas
```

---

## Callable e Future – **tarefa com retorno**

```java
ExecutorService pool = Executors.newFixedThreadPool(2);

Callable<Integer> tarefa = () -> {
    Thread.sleep(1000);
    return 42;
};

Future<Integer> futuro = pool.submit(tarefa);
// fazer outra coisa...
Integer resultado = futuro.get(); // **bloqueia** até ter resposta
System.out.println("Resultado: " + resultado);

pool.shutdown();
```

---

## Thread-safe collections

| Classe | Descrição |
| -------- | ----------- |
| `CopyOnWriteArrayList` | lista **leitura intensiva**, **escrita copia array** |
| `ConcurrentHashMap` | map **alta concorrência**, **lock segmentado** |
| `BlockingQueue` | fila **bloqueante** (`ArrayBlockingQueue`, `LinkedBlockingQueue`) |

Exemplo **produtor/consumidor**:

```java
BlockingQueue<String> fila = new LinkedBlockingQueue<>(10);

// Produtor
pool.submit(() -> {
    fila.put("item");
});

// Consumidor
pool.submit(() -> {
    String item = fila.take(); // **espera** até ter
});
```

---

## **Virtual Threads** (Java 21+) – **leveza milhões**

```java
Thread vThread = Thread.ofVirtual()
                       .name("vt-")
                       .start(() -> {
                           System.out.println("Virtual: " + Thread.currentThread());
                       });
```

**Executor** virtual:

```java
ExecutorService vPool = Executors.newVirtualThreadPerTaskExecutor();
vPool.submit(() -> "tarefa leve");
```

---

## Boas práticas & dicas

✅ **Use** `ExecutorService` **ao invés de** `new Thread`.  
✅ **Nunca** **ignore InterruptedException** – **restaure flag**.  
✅ **Prefira** classes **atômicas** ou `ConcurrentHashMap` **a synchronized**.  
✅ **Documente** se classe é **thread-safe**.  
✅ **Evite** `Thread.sleep` em **lógica de negócio** – **use `ScheduledExecutorService`**.  

❌ **Não use** `stop()`, `suspend()` – **deprecated**.  
❌ **Não acesse** campos **sem sincronização** se **múltiplas threads**.  
❌ **Não confie** em `volatile` **para operações compostas**.

---

## Resumo de 1 frase

> Threads **executam código em paralelo**; **use `Runnable`/`Callable`**, **sincronize com `synchronized`, locks ou classes atômicas**, **prefira pools (`ExecutorService`)** e **trate interrupções corretamente** para **código concorrente seguro e eficiente**.
