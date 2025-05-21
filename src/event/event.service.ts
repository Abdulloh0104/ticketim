import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { HumanCategory } from "../human_category/schemas/human_category.schema";
import { Venue } from "../venue/schemas/venue.schema";
import { Lang } from "../lang/schemas/lang.schema";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventSchema: Model<Event>,
    @InjectModel(HumanCategory.name)
    private humanCategorySchema: Model<HumanCategory>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(Lang.name) private langSchema: Model<Lang>
  ) {}
  async create(createEventDto: CreateEventDto) {
    const { human_category_id, venue_id, lang_id } = createEventDto;
    if (!mongoose.isValidObjectId(human_category_id)) {
      throw new BadRequestException("human_category_id noto'g'ri");
    }
    const human_category =
      await this.humanCategorySchema.findById(human_category_id); // tashqi kalit
    if (!human_category) {
      throw new BadRequestException("Bunday human_category yo'q");
    }

    if (!mongoose.isValidObjectId(venue_id)) {
      throw new BadRequestException("venue_id noto'g'ri");
    }
    const venue = await this.venueSchema.findById(venue_id); // tashqi kalit
    if (!venue) {
      throw new BadRequestException("Bunday venue yo'q");
    }

    if (!mongoose.isValidObjectId(lang_id)) {
      throw new BadRequestException("lang_id noto'g'ri");
    }
    const lang = await this.langSchema.findById(lang_id); // tashqi kalit
    if (!lang) {
      throw new BadRequestException("Bunday lang yo'q");
    }

    return this.eventSchema.create(createEventDto);
  }

  findAll() {
    return this.eventSchema
      .find()
      .populate("human_category_id")
      .populate("venue_id")
      .populate("lang_id");
  }

  findOne(id: number) {
    return this.eventSchema.findById(id);
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.eventSchema.findByIdAndUpdate(id, updateEventDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.eventSchema.findByIdAndDelete(id)
  }
}
