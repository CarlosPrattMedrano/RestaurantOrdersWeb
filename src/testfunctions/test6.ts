
enum RNA {
  G = 'C',
  C = 'G',
  T = 'A',
  A = 'U',
}
export function toRna(dna: string):string {
  const sequence: string[] =  dna.split('');
  let rnaSequence: string = '';
  sequence.forEach((single: string)=>{
    const singleRNA = RNA[single as keyof typeof RNA]
    if (!singleRNA) {
        throw('Invalid input DNA.');
    }
    rnaSequence += singleRNA;
  })
  return rnaSequence;
}
