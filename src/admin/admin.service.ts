import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin, AdminDocument } from "./schemas/admin.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminSchema: Model<Admin>) {}
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, email } = createAdminDto;
    const admin = await this.adminSchema.findOne({ email });
    if (admin) {
      throw new BadRequestException("Bumday emailli foydalanuvchi mavjud");
    }
    if (password != confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminSchema.create({ ...createAdminDto, hashed_password });
  }

  findAll() {
    return this.adminSchema.find();
  }

  findOne(id: string) {
    return this.adminSchema.findById(id);
  }

  findByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminSchema.findByIdAndUpdate(id, updateAdminDto);
  }

  remove(id: string) {
    return this.adminSchema.deleteOne({ _id: id });
  }

  async updateRefreshToken(id: string, hashed_refresh_token: string) {
    const updatedUser = await this.adminSchema.findByIdAndUpdate(id, {
      hashed_refresh_token,
    });
    return updatedUser;
  }
}
