import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { HumanCategory } from "../../human_category/schemas/human_category.schema";
import { Venue } from "../../venue/schemas/venue.schema";
import { Lang } from "../../lang/schemas/lang.schema";
import { EventType } from "../../event_type/schemas/event_type.schema";

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  name: string;

  @Prop()
  photo: string;

  @Prop()
  start_date: Date;

  @Prop({
    validate: {
      validator: (v: string) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props) => `${props.value} is not a valid time format (HH:mm)`,
    },
  })
  start_time: string;

  @Prop()
  finish_date: Date;

  @Prop({
    validate: {
      validator: (v: string) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props) => `${props.value} is not a valid time format (HH:mm)`,
    },
  })
  finish_time: string;

  @Prop()
  info: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventType",
  })
  event_type_id: EventType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "HumanCategory",
  })
  human_category_id: HumanCategory;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  })
  venue_id: Venue;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lang",
  })
  lang_id: Lang;

  @Prop({ default: new Date() })
  release_date: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
