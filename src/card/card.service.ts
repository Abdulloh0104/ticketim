import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Card } from "./schemas/card.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Customer } from "../customer/schemas/customer.schema";

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardSchema: Model<Card>,
    @InjectModel(Customer.name) private customerSchema: Model<Customer>
  ) {}
  async create(createCardDto: CreateCardDto) {
    const { customer_id } = createCardDto;
    if (!mongoose.isValidObjectId(customer_id)) {
      throw new BadRequestException("Customer_id noto'g'ri");
    }
    const customer = await this.customerSchema.findById(customer_id); // tashqi kalit
    if (!customer) {
      throw new BadRequestException("Bunday customer yo'q");
    }

    return this.cardSchema.create(createCardDto);
  }

  findAll() {
    return this.cardSchema.find().populate("customer_id");
  }

  findOne(id: string) {
    return this.cardSchema.findById(id);
  }

  update(id: string, updateCardDto: UpdateCardDto) {
    return this.cardSchema.findByIdAndUpdate(id, updateCardDto, { new: true });
  }

  remove(id: string) {
    return this.cardSchema.findByIdAndDelete(id);
  }
}
