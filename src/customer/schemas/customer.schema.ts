import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;
  @Prop({ required: true })
  email: string;

  @Prop()
  phone_number: string;

  @Prop()
  hashed_password: string;

  @Prop()
  hashed_refresh_token: string;

  @Prop({ default: false })
  is_active: boolean;

  @Prop()
  birth_date: Date;

  @Prop({ defaultOptions: ["male", "female"] })
  gender: string;

  @Prop()
  lang_id: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
