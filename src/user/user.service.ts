import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CustomErrorException } from '../exceptions/custom-exception';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: dto
    });

    return {
      success: true,
      result: {
        id: user.id
      }
    }
  }

  async get(userId?: number, role?: string) {
    if (Number.isNaN(userId)) {
      throw new CustomErrorException('Validation failed (numeric string is expected)', 400);
    }

    if (userId) {
      const user = await this.prisma.user.findFirst({
        where: { id: userId }
      });
      if (!user) throw new CustomErrorException(`User with id ${ userId } not found`, 404);

      return {
        success: true,
        result: user
      }
    }

    if (role) {
      const users = await this.prisma.user.findMany({
        where: { role }
      });

      return {
        success: true,
        result: { users }
      };
    }

    const users = await this.prisma.user.findMany();

    return {
      success: true,
      result: { users }
    }
  }

  async update(userId: number, dto: UpdateUserDto) {
    const exists = await this.prisma.user.findFirst({
      where: { id: userId }
    });
    if (!exists) throw new CustomErrorException(`User with id ${ userId } not found`, 404);

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: dto
    });

    return {
      success: true,
      result: user
    }
  }

  async delete(userId?: number) {
    if (Number.isNaN(userId)) {
      throw new CustomErrorException('Validation failed (numeric string is expected)', 400);
    }

    if (userId) {
      try {
        const user = await this.prisma.user.delete({
          where: { id: userId }
        });

        return {
          success: true,
          result: user
        }
      } catch (e) {
        throw new CustomErrorException(`User with id ${ userId } not found`, 404);
      }
    }

    await this.prisma.user.deleteMany();

    return { success: true }
  }
}
