import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Venue } from "../../venue/schemas/venue.schema";
import { Type } from "../../types/schemas/type.schema";

export type VenueTypeDocument = HydratedDocument<VenueType>;

@Schema()
export class VenueType {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  })
  venueId: Venue;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  })
  typeId: Type;
}

export const VenueTypeSchema = SchemaFactory.createForClass(VenueType);
