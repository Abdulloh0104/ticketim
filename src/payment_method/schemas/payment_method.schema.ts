import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "../../district/schemas/district.schema";

export type PaymentMethodDocument = HydratedDocument<PaymentMethod>;

@Schema()
export class PaymentMethod {
  @Prop({ unique: true })
  name: string;
}
export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
