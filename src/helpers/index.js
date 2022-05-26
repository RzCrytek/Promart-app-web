export const probableDateDeath = (age, date) => {
  // (cantidad_de_muerte_anual/total_población) * cantidad_personas => al 2021
  const mortalityRate = (248302 / 33_035_304) * 1000;

  const averageAgeLife = 100 * (mortalityRate.toFixed(1) / 10);
  const probableAge = averageAgeLife - age;

  const newDate = new Date(date);
  const year = newDate.getFullYear() + probableAge,
    month = newDate.getMonth() + 1,
    day = newDate.getDate();

  const probableDate = `${year}-${month}-${day}`;

  return { probableAge, probableDate };
};
