import { Injectable } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Type } from "./schemas/type.schema";
import { Model } from "mongoose";

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type.name) private typeSchema: Model<Type>) {}

  create(createTypeDto: CreateTypeDto) {
    return this.typeSchema.create(createTypeDto);
  }

  findAll() {
    return this.typeSchema.find();
  }

  findOne(id: string) {
    return this.typeSchema.findById(id);
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    const one = await this.typeSchema.findByIdAndUpdate(id, updateTypeDto, {
      new: true,
    });
    return one;
  }

  remove(id: string) {
    return this.typeSchema.findByIdAndDelete(id);
  }
}
