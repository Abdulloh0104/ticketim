import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";
import { VenueType, VenueTypeDocument } from "./schemas/venue_type.schema";
import { Venue } from "../venue/schemas/venue.schema";
import { Type } from "../types/schemas/type.schema";

@Injectable()
export class VenueTypesService {
  constructor(
    @InjectModel(VenueType.name)
    private readonly venueTypeSchema: Model<VenueType>,
    @InjectModel(Venue.name) private venueSchema: Model<Venue>,
    @InjectModel(Type.name) private typeSchema: Model<Type>
  ) {}

  async create(createVenueTypeDto: CreateVenueTypeDto): Promise<VenueType> {
    const { venueId, typeId } = createVenueTypeDto;
    if (!mongoose.isValidObjectId(venueId)) {
      throw new BadRequestException("VenueId noto'g'ri");
    }
    const venue = await this.venueSchema.findById(venueId); // tashqi kalit
    if (!venue) {
      throw new BadRequestException("Bunday venue yo'q");
    }

    if (!mongoose.isValidObjectId(typeId)) {
      throw new BadRequestException("TypeId noto'g'ri");
    }
    const type = await this.typeSchema.findById(typeId); // tashqi kalit
    if (!typeId) {
      throw new BadRequestException("Bunday type yo'q");
    }
    const venueType = await this.venueTypeSchema.create(createVenueTypeDto);
    // venue?.types?.push(type!);
    await venue.save()
    // type?.venues?.push(venue);
    await type?.save();
    return venueType
  }

  async findAll(): Promise<VenueType[]> {
    return this.venueTypeSchema.find().populate("venueId").populate("typeId");
  }

  async findOne(id: string): Promise<VenueType> {
    const venueType = await this.venueTypeSchema
      .findById(id)
      .populate("venueId")
      .populate("typeId")
      .exec();

    if (!venueType) {
      throw new NotFoundException(`VenueType with id ${id} not found`);
    }

    return venueType;
  }

  async update(
    id: string,
    updateVenueTypeDto: UpdateVenueTypeDto
  ): Promise<VenueType> {
    const updated = await this.venueTypeSchema
      .findByIdAndUpdate(id, updateVenueTypeDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`VenueType with id ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<VenueType> {
    const deleted = await this.venueTypeSchema.findByIdAndDelete(id).exec();

    if (!deleted) {
      throw new NotFoundException(`VenueType with id ${id} not found`);
    }

    return deleted;
  }
}
