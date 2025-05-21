import mongoose from "mongoose";

export class CreateSeatDto {
  sector: number;
  row_nubmer: number;
  venueId: mongoose.Schema.Types.ObjectId;
  seat_type_id: mongoose.Schema.Types.ObjectId;
}
