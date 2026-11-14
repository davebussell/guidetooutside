// Restored from client module 98062 (exports: SEASON_WORD, SKY_WORD, TIME_GREETING, timeFromHour, timeFromSun)
export const SEASON_WORD = {
  spring: "spring",
  summer: "summer",
  autumn: "autumn",
  winter: "winter",
};
export const SKY_WORD = {
  clear: "sunny",
  partly: "sunny, cloudy",
  cloudy: "cloudy",
  rain: "rainy",
  snow: "snowy",
  fog: "foggy",
  storm: "stormy",
};
export const TIME_GREETING = {
  dawn: "Good morning",
  day: "Hello",
  dusk: "Good evening",
  night: "Good night",
};
export const timeFromHour = function (e) {
  return e >= 21 || e < 5 ? "night" : e < 7 ? "dawn" : e < 18 ? "day" : "dusk";
};
export const timeFromSun = function (e, t) {
  return e < -10 ? "night" : e < 5 ? (t < 180 ? "dawn" : "dusk") : "day";
};
