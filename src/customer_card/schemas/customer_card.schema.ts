import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "../../district/schemas/district.schema";
import { Region } from "../../region/schemas/region.schema";
import { Customer } from "../../customer/schemas/customer.schema";

export type CustomerCardDocument = HydratedDocument<CustomerCard>;

@Schema()
export class CustomerCard {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  number: string;

  @Prop()
  year: string;

  @Prop()
  month: string;

  @Prop({ default: false })
  is_active: boolean;

  @Prop({ default: false })
  is_main: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  })
  customer_id: Customer;
}

export const CustomerCardSchema = SchemaFactory.createForClass(CustomerCard);
