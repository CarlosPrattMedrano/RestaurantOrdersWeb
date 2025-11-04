enum Planets {
  mercury = 0.2408467,
  venus = 0.61519726,
  earth = 1,
  mars = 1.8808158,
  jupiter = 11.862615,
  saturn = 29.447498,
  uranus = 84.016846,
  neptune = 164.79132
}
type Planet = keyof typeof Planets;

export function age(planet: Planet, seconds: number): number {
  const earthYearInSeconds = 31557600;
  const planetOrbitalPeriod = Planets[planet];
  return parseFloat((seconds / (earthYearInSeconds * planetOrbitalPeriod)).toFixed(2));
}
