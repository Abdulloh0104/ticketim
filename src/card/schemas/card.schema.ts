import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "../../district/schemas/district.schema";
import { Customer } from "../../customer/schemas/customer.schema";

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop()
  created_at: Date;
  @Prop()
  finished_at: Date;

  @Prop()
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  })
  customer_id: Customer;
}
export const CardSchema = SchemaFactory.createForClass(Card);
