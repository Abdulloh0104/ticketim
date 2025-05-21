import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type HumanCategoryDocument = HydratedDocument<HumanCategory>;

@Schema()
export class HumanCategory {
  @Prop({unique:true})
  name: string;

  @Prop()
  start_age: number;

  @Prop()
  finish_age: number;

  @Prop({ enum: ["male", "female", "all"], default: "all" })
  gender: string;
}

export const HumanCategorySchema = SchemaFactory.createForClass(HumanCategory);
