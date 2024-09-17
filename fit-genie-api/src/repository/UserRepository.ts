import prismaClient from "../prisma";
import { mediator } from "../mediator/AppMediator";

class UserRepository {
  constructor() {
    this.initialize();
  }

  initialize() {
    mediator.on("user:findByEmail", async (email: string) => {
        return await this.findUserByEmail(email);
    });

    mediator.on("user:findById", async (userId: number) => {
        return await this.findUserById(userId);
    });

    mediator.on("user:create", async (params: { name: string; email: string; passwordHash: string }) => {
        return await this.createUser(params);
    });

    mediator.on("user:updatePhoto", async (params: { userId: number; image: Buffer }) => {
        return await this.updatePhoto(params);
    });
  }

  async findUserByEmail(email: string) {
    const userInfo = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    return userInfo;
  }

  async findUserById(userId: number) {
    const userInfo = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    return userInfo;
  }

  async createUser(params: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    const user = await prismaClient.user.create({
      data: {
        username: params.name,
        email: params.email,
        password: params.passwordHash,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    return user;
  }

  async updatePhoto(params: { userId: number; image: Buffer }) {
    const user = await prismaClient.user.update({
      where: {
        id: params.userId,
      },
      data: {
        photo: params.image,
      },
    });

    return user;
  }
}

export default new UserRepository();