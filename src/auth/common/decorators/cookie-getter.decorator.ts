import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

export const CookieGetter = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<string> => {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies[data];
    if (!refreshToken) {
      throw new BadRequestException({ message: "Bunday Token Mavjud emas" });
    }
    return refreshToken;
  }
);
