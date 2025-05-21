import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../customer/schemas/customer.schema';
import mongoose, { Model } from 'mongoose';
import { CustomerCard } from './schemas/customer_card.schema';

@Injectable()
export class CustomerCardService {
  constructor(
      @InjectModel(Customer.name) private customerSchema: Model<Customer>,
      @InjectModel(CustomerCard.name) private customerCardSchema: Model<CustomerCard>
    ) {}
 async create(createCustomerCardDto: CreateCustomerCardDto) {
  const { customer_id } = createCustomerCardDto;
      if (!mongoose.isValidObjectId(customer_id)) {
        throw new BadRequestException("CustomerId noto'g'ri");
      }
      const customer = await this.customerSchema.findById(customer_id); // tashqi kalit
      console.log(customer);
      if (!customer) {
        throw new BadRequestException("Bunday customer yo'q");
      }
    return this.customerCardSchema.create(createCustomerCardDto)
  }

  findAll() {
    return this.customerCardSchema.find().populate("customer_id");
  }

  findOne(id: string) {
    return this.customerCardSchema.findById(id)
  }

 async update(id: string, updateCustomerCardDto: UpdateCustomerCardDto) {
   const one = await this.customerCardSchema.findByIdAndUpdate(
     id,
     updateCustomerCardDto,
     { new: true }
   );
   return one;  
  }

  remove(id: string) {
    return this.customerCardSchema.findByIdAndDelete(id)
  }
}
