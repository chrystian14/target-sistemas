/*
3) Dado um vetor que guarda o valor de faturamento diário de uma distribuidora 
de todos os dias de um ano, faça um programa, na linguagem que desejar, que calcule 
e retorne:
  - O menor valor de faturamento ocorrido em um dia do ano;
  - O maior valor de faturamento ocorrido em um dia do ano;
  - Número de dias no ano em que o valor de faturamento diário foi superior à média anual.
*/

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
