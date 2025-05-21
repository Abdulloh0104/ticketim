import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from '../event/schemas/event.schema';
import { Seat, SeatSchema } from '../seat/schemas/seat.schema';
import { TicketStatus, TicketStatusSchema } from '../ticket_status/schemas/ticket_status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
      {
        name: Event.name,
        schema: EventSchema,
      },
      {
        name: Seat.name,
        schema: SeatSchema,
      },
      {
        name: TicketStatus.name,
        schema: TicketStatusSchema,
      },
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
