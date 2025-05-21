import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Venue } from "../../venue/schemas/venue.schema";

export type TypeDocument = HydratedDocument<Type>;

@Schema()
export class Type {
  @Prop({ unique: true })
  name: string;

  @Prop({
    type: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "Venue",
      },
    ],
  })
  venues: Venue[];
}

export const TypeSchema = SchemaFactory.createForClass(Type);
