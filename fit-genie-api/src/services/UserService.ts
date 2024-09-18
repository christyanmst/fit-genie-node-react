import { hash } from "bcryptjs";
import { mediator } from "../mediator/AppMediator";
import axios from 'axios';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

interface UpdateUserRequest {
    userId: number;
    image: Express.Multer.File;
}

class UserService {
    async createUser({ name, email, password }: CreateUserRequest) {
        if (!(name && email && password)) throw new Error("Missing parameters");

        const userAlreadyExists = await mediator.publish('user:findByEmail', email);

        if (userAlreadyExists) throw new Error("User already exists");

        const passwordHash = await hash(password, 8);

        const user = await mediator.publish('user:create', { name, email, passwordHash });

        return user;
    }

    async updateUserPhoto({ userId, image }: UpdateUserRequest) {
        if (!(userId && image)) throw new Error("Missing parameters");
        const userIdAux = Number(userId);

        const userInfo = await mediator.publish('user:findById', userIdAux);
        if (!userInfo) throw new Error("User not found");

        const photoBuffer = image.buffer;

        const compressedPhotoBuffer = await this.compressImageWithTinyPNG(photoBuffer);


        const user = await mediator.publish('user:updatePhoto', { userId: userIdAux, image: compressedPhotoBuffer });

        return user;
    }

    async getUserPhoto(userId: number) {
        if (!userId) throw new Error("Missing parameters");

        const userIdAux = Number(userId);

        const user = await mediator.publish('user:getUserPhoto', userIdAux);
        if (!user) throw new Error("User not found");
        
        return user.photo;
    }

    async compressImageWithTinyPNG(imageBuffer: Buffer) {
        const apiKey = "";
        const apiEndpoint = `https://api.tinify.com/shrink`;
        const authHeader = "Basic " + Buffer.from(`api:${apiKey}`).toString('base64');
    
        try {
            const response = await axios.post(apiEndpoint, imageBuffer, {
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Authorization': authHeader,
                },
                responseType: 'json',
            });
    
            const compressedImageUrl = response.data.output.url;
            const compressedImageBlob = await axios.get(compressedImageUrl, {
                responseType: 'arraybuffer',
            });
    
            return Buffer.from(compressedImageBlob.data);
        } catch (error) {
            console.error("Erro ao comprimir a imagem com TinyPNG:", error);
            throw new Error("Erro ao comprimir a imagem");
        }
    }
}

export { UserService };
