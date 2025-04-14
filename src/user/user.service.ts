import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CustomErrorException } from '../exceptions/custom-exception';
import { GetUserQueryDto } from './dto/get-user.dto';

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

  async getAll(query: GetUserQueryDto) {
    const users = await this.prisma.user.findMany({
      where: {
        full_name: { contains: query.full_name },
        role: query.role,
        efficiency: query.efficiency
      }
    });

    return {
      success: true,
      result: { users }
    }
  }

  async get(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) throw new CustomErrorException(`User with id ${ userId } not found`, 404);

    return {
      success: true,
      result: user
    }
  }

  async update(userId: number, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: dto
      });

      return {
        success: true,
        result: user
      }
    } catch (e) {
      throw new CustomErrorException(`User with id ${ userId } not found`, 404);
    }
  }

  async deleteAll() {
    await this.prisma.user.deleteMany();

    return { success: true }
  }

  async delete(userId: number) {
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
}
