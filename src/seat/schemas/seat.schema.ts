import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Venue } from "../../venue/schemas/venue.schema";
import { SeatType } from "../../seat_type/schemas/seat_type.schema";

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat {
  @Prop()
  sector: number;

  @Prop()
  row_nubmer: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  })
  venueId: Venue;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "SeatType",
  })
  seat_type_id: SeatType;

  @Prop({default:"rasm"})
  location_in_schema: string;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);

