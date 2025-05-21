import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Region } from "../../region/schemas/region.schema";

export type RegionDocument = HydratedDocument<Region>;

@Schema()
export class SeatType {
  @Prop({ unique: true })
  name: string;
}

export const SeatTypeSchema = SchemaFactory.createForClass(SeatType);
