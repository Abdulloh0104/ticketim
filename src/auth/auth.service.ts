import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminDocument } from "../admin/schemas/admin.schema";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { AdminService } from "../admin/admin.service";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async generateTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async loginAdmin(loginDto: LoginDto, res: Response) {
    // console.log(loginDto);
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki password noto'g'ti");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      admin.hashed_password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki password noto'g'ti");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    res.cookie("adminRefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.hashed_refresh_token = hashed_refresh_token;
    await admin.save();

    return {
      message: "Xush kelibsiz",
      admin: admin._id,
      accessToken,
    };
  }

  async signOutAdmin(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("Admin not verified");
    }

    const hashed_refresh_token = null;
    await this.adminService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("adminRefreshToken");
    const response = {
      message: "User logged out seccessfully",
    };
    return response;
  }

  async refreshToken(userId: string, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    // console.log(userId);
    // console.log(decodedToken["id"]);

    if (userId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const user = await this.adminService.findOne(userId);

    if (!user || !user.hashed_refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );
    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateRefreshToken(user.id, hashed_refresh_token);

    res.cookie("adminRefresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "User refreshed",
      userId: user.id,
      access_token: accessToken,
    };
    return response;
  }
}
