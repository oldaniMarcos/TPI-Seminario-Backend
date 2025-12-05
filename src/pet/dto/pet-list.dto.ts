export class PetListDto {
  id: number;
  name: string;
  birthDate: string;
  age: number;
  state: 'alta' | 'baja';
  breedName: string;
  speciesName: string;
}
