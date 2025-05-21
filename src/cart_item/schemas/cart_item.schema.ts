
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  mongoose, { HydratedDocument } from "mongoose";
import { Ticket } from "../../ticket/schemas/ticket.schema";
import { Card } from "../../card/schemas/card.schema";

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      })
    ticket_id:Ticket

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
      })
    cart_id:Card
}
export const CartItemSchema = SchemaFactory.createForClass(CartItem);

