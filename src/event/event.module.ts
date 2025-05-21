import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "./schemas/event.schema";
import { HumanCategory, HumanCategorySchema } from "../human_category/schemas/human_category.schema";
import { Venue, VenueSchema } from "../venue/schemas/venue.schema";
import { Lang, LangSchema } from "../lang/schemas/lang.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
      {
        name: HumanCategory.name,
        schema: HumanCategorySchema,
      },
      {
        name: Venue.name,
        schema: VenueSchema,
      },
      {
        name: Lang.name,
        schema: LangSchema,
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
