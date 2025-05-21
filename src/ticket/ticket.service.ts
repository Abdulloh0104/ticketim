import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket } from "./schemas/ticket.schema";
import mongoose, { Model } from "mongoose";
import { TicketStatus } from "../ticket_status/schemas/ticket_status.schema";
import { Seat } from "../seat/schemas/seat.schema";
import { Event } from "../event/schemas/event.schema";

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketSchema: Model<Ticket>,
    @InjectModel(Event.name) private eventSchema: Model<Event>,
    @InjectModel(Seat.name) private seatSchema: Model<Seat>,
    @InjectModel(TicketStatus.name)
    private ticketStatusSchema: Model<TicketStatus>
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    const { event_id, status_id, seat_id } = createTicketDto;
    if (!mongoose.isValidObjectId(event_id)) {
      throw new BadRequestException("event_id noto'g'ri");
    }
    const event = await this.eventSchema.findById(event_id); // tashqi kalit
    if (!event) {
      throw new BadRequestException("Bunday event yo'q");
    }

    if (!mongoose.isValidObjectId(status_id)) {
      throw new BadRequestException("status_id noto'g'ri");
    }
    const status = await this.ticketStatusSchema.findById(status_id); // tashqi kalit
    if (!status) {
      throw new BadRequestException("Bunday ticketStatus yo'q");
    }

    if (!mongoose.isValidObjectId(seat_id)) {
      throw new BadRequestException("seat_id noto'g'ri");
    }
    const seat = await this.seatSchema.findById(seat_id); // tashqi kalit
    if (!seat) {
      throw new BadRequestException("Bunday seat yo'q");
    }

    return this.ticketSchema.create(createTicketDto);
  }

  findAll() {
    return this.ticketSchema
      .find()
      .populate("seat_id")
      .populate("status_id")
      .populate("event_id");
  }

  findOne(id: number) {
    return this.ticketSchema.findById(id);
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.ticketSchema.findByIdAndUpdate(id, updateTicketDto, {
      new: true,
    });
  }

  remove(id: number) {
    return this.ticketSchema.findByIdAndDelete(id);
  }
}
