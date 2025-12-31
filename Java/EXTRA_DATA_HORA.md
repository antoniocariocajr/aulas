# 📅 Classes de Hora e Data

> Antes do Java 8 usava-se `Date`/`Calendar` (buggy, mutável, sem fuso).  
> **Nova API (`java.time`)** é **imutável**, **thread-safe** e **baseada em ISO-8601**.

---

## Pacote `java.time` – visão geral

| Classe | O que representa | Exemplo de uso |
| -------- | ------------------ | ---------------- |
| `LocalDate` | **Data sem hora** (ano-mês-dia) | aniversário, vencimento |
| `LocalTime` | **Hora sem data** (hh:mm:ss.nnn) | horário de funcionamento |
| `LocalDateTime` | **Data + hora**, **sem fuso** | agendamento local |
| `ZonedDateTime` | **Data + hora + fuso** | evento global |
| `OffsetDateTime` | **Data + hora + offset** (+02:00) | protocolos/APIs |
| `Instant` | **Instante na linha do tempo** (epoch seconds) | timestamp único |
| `Duration` | **quantidade de tempo em segundos/nanos** | intervalo (< 24 h) |
| `Period` | **quantidade de tempo em anos/meses/dias** | intervalo longo |
| `ZoneId` | **regas de fuso** ("America/Sao_Paulo") | conversões |
| `ZoneOffset` | **diferença fixa de UTC** ("+03:00") | offsets simples |

---

## Criando instâncias (todas são **imutáveis**)

```java
LocalDate hoje = LocalDate.now();                     // hoje do sistema
LocalDate ontem = hoje.minusDays(1);                  // novo objeto
LocalDate natal = LocalDate.of(2024, 12, 25);         // of(ano, mês, dia)
LocalDate mesQueVem = hoje.plusMonths(1);

LocalTime agora = LocalTime.now();                    // 14:30:15.123
LocalTime meioDia = LocalTime.of(12, 0);              // 12:00
LocalTime fim = meioDia.plusHours(8);                 // 20:00

LocalDateTime hojeMeioDia = LocalDateTime.of(hoje, meioDia);
LocalDateTime daqui1h = LocalDateTime.now().plusHours(1);

Instant instante = Instant.now();                     // epoch millis
Instant daqui5s = instante.plusSeconds(5);

ZonedDateTime spAgora = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));
```

---

## Formatando e parse (padrão ISO)

| Classe | Método | Exemplo |
| -------- | -------- | --------- |
| `DateTimeFormatter` | `ofPattern("dd/MM/yyyy")` | custom |
| `DateTimeFormatter.ISO_LOCAL_DATE` | `yyyy-MM-dd` | padrão |
| `DateTimeFormatter.ISO_LOCAL_DATE_TIME` | `T` entre data e hora | |

```java
DateTimeFormatter fmtBR = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
LocalDateTime agora = LocalDateTime.now();
String texto = agora.format(fmtBR);              // "15/07/2024 14:30"
LocalDateTime deVolta = LocalDateTime.parse("15/07/2024 14:30", fmtBR);
```

---

## Convertendo entre si

```java
LocalDate date = LocalDate.of(2024, 7, 15);
LocalTime time = LocalTime.of(10, 30);
ZoneId sp = ZoneId.of("America/Sao_Paulo");

LocalDateTime ldt = date.atTime(time);                    // LocalDateTime
ZonedDateTime zdt = ldt.atZone(sp);                       // com fuso
Instant instant = zdt.toInstant();                        // epoch
LocalDateTime outroLDT = instant.atZone(sp).toLocalDateTime();
```

---

## Alterações

- retornam **novo objeto**

```java
LocalDate hoje = LocalDate.now();
hoje = hoje.withYear(2025)           // altera ano
           .withMonth(12)
           .withDayOfMonth(25)
           .with(TemporalAdjusters.firstDayOfNextMonth());

LocalTime agora = LocalTime.now();
agora = agora.withHour(9).withMinute(0).withSecond(0);
```

---

## Ajustes temporais (`TemporalAdjusters`)

```java
import static java.time.temporal.TemporalAdjusters.*;

LocalDate hoje = LocalDate.now();
LocalDate proxSegunda = hoje.with(nextOrSame(DayOfWeek.MONDAY));
LocalDate ultimoDiaMes = hoje.with(lastDayOfMonth());
LocalDate primeiroUtil = hoje.with(firstInMonth(DayOfWeek.MONDAY));
```

---

## Duração e período

```java
Duration duracao = Duration.between(LocalTime.of(8, 0), LocalTime.of(12, 30));
long minutos = duracao.toMinutes();          // 270

Period periodo = Period.between(LocalDate.of(2000, 1, 1), LocalDate.now());
int anos = periodo.getYears();               // 24
```

**Somando/subtraindo**:

```java
LocalDateTime mais30m = LocalDateTime.now().plus(Duration.ofMinutes(30));
LocalDate mais3M = hoje.plus(Period.ofMonths(3));
```

---

## Comparações

| Método | Retorno |
| -------- | --------- |
| `isBefore(other)` | boolean |
| `isAfter(other)` | boolean |
| `isEqual(other)` | boolean |
| `compareTo(other)` | -1, 0, 1 |

```java
boolean vencido = hoje.isAfter(vencimento);
```

---

## Time-zone & offset

```java
ZoneId sp = ZoneId.of("America/Sao_Paulo");
ZoneOffset offset = sp.getRules().getOffset(Instant.now()); // -03:00 (horário de verão)
ZonedDateTime zdt = LocalDateTime.now().atZone(sp);
System.out.println(zdt); // 2024-07-15T14:30-03:00[America/Sao_Paulo]
```

**Converter para outro fuso**:

```java
ZonedDateTime tokyo = zdt.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));
```

---

## **Exemplo completo**

- **próximo horário de ônibus**

```java
LocalTime agora = LocalTime.now();
LocalTime saida = LocalTime.of(6, 0);          // 6h
while (saida.isBefore(agora)) {
    saida = saida.plusMinutes(15);             // a cada 15 min
}
Duration espera = Duration.between(agora, saida);
System.out.println("Próximo ônibus em " + espera.toMinutes() + " min");
```

---

## **Convertendo legado**

- (Date/Calendar ↔ java.time)

```java
// Date → Instant
Instant inst = new Date().toInstant();

// Calendar → ZonedDateTime
ZonedDateTime zdt = calendar.toInstant()
                            .atZone(calendar.getTimeZone().toZoneId());

// Voltar
Date legado = Date.from(instant);
java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
java.sql.Timestamp ts = Timestamp.valueOf(localDateTime);
```

---

## Dicas & boas práticas

1. **Guarde no BD**:
   - `LocalDate` → `DATE`
   - `LocalTime` → `TIME`
   - `LocalDateTime` → `TIMESTAMP`
   - `ZonedDateTime` → `TIMESTAMP WITH TIME ZONE` (ou salve `Instant` + `ZoneId` separado)  
2. **NUNCA use `Date`/`Calendar` em novo código**.  
3. **Todos os objetos são imutáveis** – **guarde o resultado**:  
   `hoje = hoje.plusDays(1);`  
4. **Use `Instant` para log/timestamp único**; **converta para zona apenas na apresentação**.  
5. **Period** para **quantidades calendário** (anos/meses/dias); **Duration** para **horas/minutos/segundos/nanos**.

---

## **Resumo**

> A API `java.time` (**LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Instant, Duration, Period**) é **imutável, thread-safe e sem null** – **use-a para **qualquer manipulação de data/hora** em vez das classes legadas `Date`/`Calendar`.
