import {COLORS } from './test2'

export function decodedValue(colors: string[]) {
  let values = "";
  colors.forEach((value, index) => {
    if (index<2) {
        values = values + COLORS.findIndex(e => e === value);
    }

  })
  return  Number(values);

}


// type Color = keyof typeof COLORS;
// export function decodedValue([first, second]: Color[]): number {
//   return Number(`${COLORS[first]}${COLORS[second]}`)
// }

