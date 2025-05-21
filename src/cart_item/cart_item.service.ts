import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCartItemDto } from "./dto/create-cart_item.dto";
import { UpdateCartItemDto } from "./dto/update-cart_item.dto";
import { Ticket } from "../ticket/schemas/ticket.schema";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CartItem } from "./schemas/cart_item.schema";
import { Card } from "../card/schemas/card.schema";

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name) private cartItemSchema: Model<CartItem>,
    @InjectModel(Ticket.name) private ticketSchema: Model<Ticket>,
    @InjectModel(Card.name) private cardSchema: Model<Card>
  ) {}
 async create(createCartItemDto: CreateCartItemDto) {
    const { ticket_id, cart_id } = createCartItemDto;
    if (!mongoose.isValidObjectId(ticket_id)) {
      throw new BadRequestException("ticket_id noto'g'ri");
    }
    const ticket = await this.ticketSchema.findById(ticket_id); // tashqi kalit
    if (!ticket) {
      throw new BadRequestException("Bunday ticket yo'q");
    }

    if (!mongoose.isValidObjectId(cart_id)) {
      throw new BadRequestException("cart_id noto'g'ri");
    }
    const cart = await this.cardSchema.findById(cart_id); // tashqi kalit
    if (!cart) {
      throw new BadRequestException("Bunday card yo'q");
    }

    return this.cartItemSchema.create(createCartItemDto);
  }

  findAll() {
    return this.cartItemSchema.find().populate("ticket_id").populate("cart_id");
  }

  findOne(id: string) {
    return this.cartItemSchema.findById(id)
  }

  update(id: string, updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemSchema.findByIdAndUpdate(id,updateCartItemDto,{new:true})
  }

  remove(id: string) {
    return this.cartItemSchema.findByIdAndDelete(id)
  }
}
