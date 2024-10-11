function calculateMeetingPoint(
  distance,
  carSpeed,
  truckSpeed,
  tollDelayMinutes,
  tollCount
) {
  const totalTollDelayHour = (tollDelayMinutes * tollCount) / 60; // 0,25h
  // t_sem_obstaculos = x1 / v1
  const carTravelTimeWithoutDelay = distance / carSpeed; // 1,3888888
  // t_com_obstaculos = t_sem_obstaculos + 0,25h
  const carTravelTimeWithDelay = carTravelTimeWithoutDelay + totalTollDelayHour; // 1,6388888

  // v1 = x1 / t_com_obstaculos
  const carAverageSpeed = distance / carTravelTimeWithDelay; // 76,27km/h

  // t = 125 / (v1 + v2)
  const meetingTime = distance / (carAverageSpeed + truckSpeed); // 0,79h

  // x1 = v1 * t
  const carDistanceFromRibeirao = carAverageSpeed * meetingTime; // 61,008km
  // x2 = 125 - v2 * t
  const truckDistanceFromRibeirao = distance - truckSpeed * meetingTime; // 61,008km

  // Resultados (com 3 casas decimais para desconsiderar inconsistências de float point)
  const fixedCarDistanceFromRibeirao = carDistanceFromRibeirao.toFixed(3);
  const fixedTruckDistanceFromRibeirao = truckDistanceFromRibeirao.toFixed(3);

  // Comparação com utilização da fórmula diretamente
  const distanceFormula =
    (carAverageSpeed * distance) / (carAverageSpeed + truckSpeed).toFixed(3);

  console.log({
    totalTollDelayHour,
    carTravelTimeWithoutDelay,
    carTravelTimeWithDelay,
    carAverageSpeed,
    meetingTime,
    carDistanceFromRibeirao,
    truckDistanceFromRibeirao,
    distanceFormula,
  });

  if (fixedCarDistanceFromRibeirao < fixedTruckDistanceFromRibeirao) {
    console.log("O carro está mais perto de Ribeirão Preto.");
  } else if (fixedCarDistanceFromRibeirao > fixedTruckDistanceFromRibeirao) {
    console.log("O caminhão está mais perto de Ribeirão Preto.");
  } else {
    console.log("Ambos veículos estão na mesma distância de Ribeirão Preto.");
  }
}

const totalDistance = 125;
const carSpeed = 90;
const truckSpeed = 80;
const tollDelayMinutes = 5;
const tollCount = 3;

calculateMeetingPoint(
  totalDistance,
  carSpeed,
  truckSpeed,
  tollDelayMinutes,
  tollCount
);
