import { Module } from "@nestjs/common";
import { CartItemService } from "./cart_item.service";
import { CartItemController } from "./cart_item.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CartItem, CartItemSchema } from "./schemas/cart_item.schema";
import { Ticket, TicketSchema } from "../ticket/schemas/ticket.schema";
import { Card, CardSchema } from "../card/schemas/card.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CartItem.name,
        schema: CartItemSchema,
      },
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
      {
        name: Card.name,
        schema: CardSchema,
      },
    ]),
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
