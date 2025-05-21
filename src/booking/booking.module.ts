import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Card, CardSchema } from '../card/schemas/card.schema';
import { PaymentMethod, PaymentMethodSchema } from '../payment_method/schemas/payment_method.schema';
import { DeliveryMethod, DeliveryMethodSchema } from '../delivery_method/schemas/delivery_method.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
      {
        name: Card.name,
        schema: CardSchema,
      },
      {
        name: PaymentMethod.name,
        schema: PaymentMethodSchema,
      },
      {
        name: DeliveryMethod.name,
        schema: DeliveryMethodSchema,
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
