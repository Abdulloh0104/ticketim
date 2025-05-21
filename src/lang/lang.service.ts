import { Injectable } from '@nestjs/common';
import { CreateLangDto } from './dto/create-lang.dto';
import { UpdateLangDto } from './dto/update-lang.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lang } from './schemas/lang.schema';
import { Model } from 'mongoose';

@Injectable()
export class LangService {
  constructor(@InjectModel(Lang.name) private langSchema:Model<Lang>){}
  create(createLangDto: CreateLangDto) {
    return this.langSchema.create(createLangDto)
  }

  findAll() {
    return this.langSchema.find()
  }

  findOne(id: number) {
    return this.langSchema.findById(id) 
    }

  update(id: number, updateLangDto: UpdateLangDto) {
    return this.langSchema.findByIdAndUpdate(id,updateLangDto,{new:true})
  }

  remove(id: number) {
    return this.langSchema.findByIdAndDelete(id)
  }
}
