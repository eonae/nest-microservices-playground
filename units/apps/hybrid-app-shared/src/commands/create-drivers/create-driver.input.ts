// Validatable
export class CreateDriverInput {
  name: string;
  surname: string;
  phone: string;
  license: string;

  constructor (data: CreateDriverInput) {
    Object.assign(this, data);
  }
}