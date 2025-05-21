import { Module } from "@nestjs/common";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "./schemas/card.schema";
import { Customer, CustomerSchema } from "../customer/schemas/customer.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:Card.name,
        schema: CardSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
