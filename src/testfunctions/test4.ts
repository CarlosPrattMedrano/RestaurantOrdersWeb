

enum COLORS {
  black = 0,
  brown = 1,
  red = 2,
  orange = 3,
  yellow = 4,
  green = 5,
  blue = 6,
  violet = 7,
  grey = 8,
  white = 9,
}

type Color = keyof typeof COLORS;

const OHMS = [
  'ohms',
  'kiloohms',
  'megaohms',
  'gigaohms',
  'teraohms'
]
function formatOhms(value: number): string {
  if (value === 0) {
    return "0 ohms";
  }
  const exponent = Math.floor(Math.log10(value) / 3);
  const index = Math.min(exponent, OHMS.length - 1);

  const scaled = value / Math.pow(1000, index);
  return scaled + " " + OHMS[index];
}

export function decodedResistorValue([first, second, third]: Color[]): string {
  const text = '0';
  const addedText = text.repeat(COLORS[third]);
  const ohms = `${COLORS[first]}${COLORS[second]}${addedText}`

  return formatOhms(Number(ohms));
}
