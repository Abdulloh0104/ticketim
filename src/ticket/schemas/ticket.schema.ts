import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Seat } from "../../seat/schemas/seat.schema";
import { TicketStatus } from "../../ticket_status/schemas/ticket_status.schema";

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop()
  price: string;

  @Prop()
  service_fee: string;

  @Prop()
  ticket_type: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  })
  event_id: Event;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seat",
  })
  seat_id: Seat;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "TicketStatus",
  })
  status_id: TicketStatus;
}
export const TicketSchema = SchemaFactory.createForClass(Ticket);
