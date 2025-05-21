export class CreateCustomerDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  birth_date: Date;
  gender: string;
  lang_id: number;
}
