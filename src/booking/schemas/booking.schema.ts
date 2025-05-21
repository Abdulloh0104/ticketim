import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Card } from "../../card/schemas/card.schema";
import mongoose, { HydratedDocument } from "mongoose";
import { PaymentMethod } from "../../payment_method/schemas/payment_method.schema";
import { DeliveryMethod } from "../../delivery_method/schemas/delivery_method.schema";

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ default: new Date() })
  created_at: Date;

  @Prop()
  finished: Date;

  @Prop({ default: "10% chegirma" })
  discount_coupon: string;

  @Prop({ default: "standart" })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
  })
  cardId: Card;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentMethod",
  })
  paymentMethodId: PaymentMethod;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryMethod",
  })
  deliveryMethodId: DeliveryMethod;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
