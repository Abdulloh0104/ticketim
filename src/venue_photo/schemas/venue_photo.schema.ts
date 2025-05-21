import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Venue } from "../../venue/schemas/venue.schema";
import mongoose, { HydratedDocument } from "mongoose";

export type VenuePhotoDocument = HydratedDocument<VenuePhoto>;

@Schema()
export class VenuePhoto {
  @Prop({ unique: true })
  url: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  })
  venueId: Venue;
}
export const VenuePhotoSchema = SchemaFactory.createForClass(VenuePhoto);
