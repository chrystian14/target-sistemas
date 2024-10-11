## Exercicio 1

Observe o trecho de código:

```
int INDICE = 12, SOMA = 0, K = 1;

enquanto K < INDICE faça

{ K = K + 1; SOMA = SOMA + K;}

imprimir(SOMA);
```

Ao final do processamento, qual será o valor da variável SOMA?

```js
const index = 1;
let sum = 0;
let k = 1;

while (k < index) {
  k = k + 1;
  sum = sum + k;
}

console.log(sum); // 0;
```

**Resposta**: 0

## Exercicio 2

Descubra a lógica e complete o próximo elemento:

a) 1, 3, 5, 7, \_\_\_
**Resposta**: 9

b) 2, 4, 8, 16, 32, 64, \_\_\_\_
**Resposta**: 128

c) 0, 1, 4, 9, 16, 25, 36, \_\_\_\_
**Resposta**: 49

d) 4, 16, 36, 64, \_\_\_\_
**Resposta**: 100

e) 1, 1, 2, 3, 5, 8, \_\_\_\_
**Resposta**: 13

f) 2,10, 12, 16, 17, 18, 19, \_\_\_\_
**Resposta**: 20

## Exercicio 3

Dado um vetor que guarda o valor de faturamento diário de uma distribuidora de todos os dias de um ano, faça um programa, na linguagem que desejar, que calcule e retorne:

- O menor valor de faturamento ocorrido em um dia do ano;
- O maior valor de faturamento ocorrido em um dia do ano;
- Número de dias no ano em que o valor de faturamento diário foi superior à média anual.

a) Considerar o vetor já carregado com as informações de valor de faturamento.

b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média.

c) Utilize o algoritmo mais veloz que puder definir.

### Resolução

[3_revenue/script.js](3_revenue/script.js)

```js
function calculateRevenue(dailyRevenues) {
  let min = null;
  let max = null;
  let sum = 0;
  let daysCount = 0;

  for (const currentRevenue of dailyRevenues) {
    if (currentRevenue > 0) {
      if (min === null || currentRevenue < min) {
        min = currentRevenue;
      }

      if (max === null || currentRevenue > max) {
        max = currentRevenue;
      }
      sum += currentRevenue;
      daysCount++;
    }
  }

  if (daysCount === 0) {
    return { min, max, daysAboveAverage: 0 };
  }

  const average = sum / daysCount;
  for (const currentRevenue of dailyRevenues) {
    if (currentRevenue > average) {
      daysCount++;
    }
  }

  return { min, max, daysAboveAverage: daysCount };
}
```

## Exercicio 4

Uma empresa solicitou a você um aplicativo para manutenção de um cadastro de clientes. Após a reunião de definição dos requisitos, as conclusões foram as seguintes:

- Um cliente pode ter um número ilimitado de telefones;
- Cada telefone de cliente tem um tipo, por exemplo: comercial, residencial, celular, etc. O sistema deve permitir cadastrar novos tipos de telefone;
- A princípio, é necessário saber apenas em qual estado brasileiro cada cliente se encontra. O sistema deve permitir cadastrar novos estados;

Você ficou responsável pela parte da estrutura de banco de dados que será usada pelo aplicativo. Assim sendo:

- Proponha um modelo lógico para o banco de dados que vai atender a aplicação. Desenhe as tabelas necessárias, os campos de cada uma e marque com setas os relacionamentos existentes entre as tabelas;
- Aponte os campos que são chave primária (PK) e chave estrangeira (FK);
- Faça uma busca utilizando comando SQL que traga o código, a razão social e o(s) telefone(s) de todos os clientes do estado de São Paulo (código “SP”);

### Resolução

[Diagrama Entidade Relacionamento Exercicio 4](4_database/diagrama-er.png)

#### Scripts SQL (postgresql):

- Criação de tabelas (e index): [4_database/1_tables.sql](4_database/1_tables.sql)

```sql
CREATE TABLE "states" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(25) NOT NULL,
    "code" CHAR(2) NOT NULL UNIQUE
);

CREATE TABLE "customers" (
    "id" SERIAL PRIMARY KEY,
    "business_name" VARCHAR(255) NOT NULL,

    "state_id" INTEGER NOT NULL,
    FOREIGN KEY ("state_id") REFERENCES "states"("id")
);

CREATE TABLE "phone_types" (
    "id" SERIAL PRIMARY KEY,
    "type_name" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "phones" (
    "id" SERIAL PRIMARY KEY,
    "number" VARCHAR(15) NOT NULL,

    "phone_type_id" INTEGER NOT NULL,
    FOREIGN KEY ("phone_type_id") REFERENCES "phone_types"("id"),

    "customer_id" INTEGER NOT NULL,
    FOREIGN KEY ("customer_id") REFERENCES "customers"("id")
);

-- Criando um index para acelear a pesquisa pelo código do estado
CREATE INDEX idx_states_code ON "states"("code");
```

- Inserção de dados: [4_database/2_inserts.sql](4_database/2_inserts.sql)
- Consulta: [4_database/3_select.sql](4_database/3_select.sql)

```sql
SELECT
  s.code AS state_code,
  c.business_name,
  p.number
FROM
    "customers" c
JOIN
    "phones" p ON c.id = p.customer_id
JOIN
    "states" s ON c.state_id = s.id
WHERE
    s.code = 'SP';
```

## Exercicio 5

Dois veículos, um carro e um caminhão, saem respectivamente de cidades opostas pela mesma rodovia. O carro, de Ribeirão Preto em direção a Barretos, a uma velocidade constante de 90 km/h, e o caminhão, de Barretos em direção a Ribeirão Preto, a uma velocidade constante de 80 km/h. Quando eles se cruzarem no percurso, qual estará mais próximo da cidade de Ribeirão Preto?

a) Considerar a distância de 125km entre a cidade de Ribeirão Preto <-> Barretos.

b) Considerar 3 pedágios como obstáculo e que o carro leva 5 minutos a mais para passar em cada um deles, pois ele não possui dispositivo de cobrança de pedágio.

c) Explique como chegou no resultado.

### Resolução

Resolução em código comentado se encontra em [5_distances/script.js](5_distances/script.js)

**Explicação**:

```js
/*
  O ponto de cruzamento, considerando ribeirão preto como referência (125km), pode ser descrito
  pelas seguintes equações horárias:
  - x1 -> carro (sai de ribeirao, portanto a velocidade é positiva a partir da referência):
  - x2 ->caminhão (sai de barretos, portanto a velocidade é negativa a partir da referência)
*/
x1 = 0 + v1 * t;
x2 = 125 - v2 * t;

/*
  Como o carro tem 3 pedágios de 5min cada, podemos calcular o tempo de viagem sem os obstáculos
  e depois com os obstáculos:
    t_sem_obstaculos = distancia / velocidade-carro
    t_com_obstaculos = t_sem_obstaculos + t_cobranca_de_pedagio
*/
t_sem_obstaculos = 125 / 90; // aproximadamente 1,38h
t_com_obstaculos = t_sem_obstaculos + 0.25; // aproximadamente 1,64h

/*
  Com isso podemos calcular a velocidade média do carro:
  v1 = distancia / t_com_obstaculos
*/
v1 = 125 / t_com_obstaculos; // aproximadamente 76,27km/h

/*
  Agora igualamos as equações horárias para calcular o ponto de cruzamento:
*/

x1 = v1 * t
x2 = 125 - v2 * t

x1 = x2
v1 * t  = 125 - v2 * t
v1 * t + v2 * t = 125
t * (v1 + v2) = 125
t = (125 / (v1 + v2))

/*
  Substituindo o valor de t em x1 (lembrando que x1 e x2 sao iguais no ponto de encontro):
*/
x = v1 * t
x = v1 * (125 / (v1 + v2))
x = v1 * 125 / (v1 + v2)

/*
  Finalmente podemos substituir pelos valores v1 e v2 para encontrar o ponto de cruzamento.
  Como os 2 estão no mesmo ponto de cruzamento, ambos estão na mesma distância de ribeirão preto.
*/
x = 76,27 * 125 / (76,27 + 80)
x = 61,008km
```
