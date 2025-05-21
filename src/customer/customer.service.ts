import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schemas/customer.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerSchema: Model<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { password, confirm_password, email } = createCustomerDto;
    const customer = await this.customerSchema.findOne({ email });
    if (customer) {
      throw new BadRequestException("Numday emailli foydalanuvchi mavjud");
    }
    if (password != confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.customerSchema.create({
      ...createCustomerDto,
      hashed_password,
    });
  }

  findAll() {
    return this.customerSchema.find();
  }

  findOne(id: number) {
    return this.customerSchema.findById(id);
  }

  findByEmail(email: string) {
    return this.customerSchema.findOne({ email });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerSchema.findByIdAndUpdate(id, updateCustomerDto);
  }

  remove(id: number) {
    return this.customerSchema.deleteOne({ _id: id });
  }

  async updateRefreshToken(id: string, hashed_refresh_token: string) {
    const updatedUser = await this.customerSchema.findByIdAndUpdate(id, {
      hashed_refresh_token,
    });
    return updatedUser;
  }
}
