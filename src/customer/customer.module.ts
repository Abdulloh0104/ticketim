import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Customer } from "./schemas/customer.schema";
import { AdminSchema } from "../admin/schemas/admin.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: AdminSchema }]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports:[CustomerService]
})
export class CustomerModule {}
