import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    username: string,
    email: string,
    password: string,
    res,
  ): Promise<Object> {
    if (
      username === undefined ||
      email === undefined ||
      password === undefined
    ) {
      throw new NotFoundException('Invalid credentials');
    }
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new NotFoundException('Email already exists');
    }

    const newUser = await this.userModel.create({
      username,
      email,
      password,
    });

    const token = this.generateToken(newUser);
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(201).json({
      email: newUser.email,
      token: token.access_token,
    });
  }

  async loginUser(email: string, password: string, res): Promise<Object> {
    if (email === undefined || password === undefined) {
      throw new NotFoundException('Invalid credentials');
    }
    const user = (await this.userModel.findOne({ email })) as UserDocument;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await user.comparePassword(password);

    if (!result) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = this.generateToken(user);
    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
      email: user.email,
      token: token.access_token,
    });
  }

  async logoutUser(token: string, res) {
    res.setHeader('Authorization', '');
    return res.status(200).json({ message: 'User logged out' });
  }

  private generateToken(user: User) {
    const payload = {
      _id: user._id,
    };
    const token = {
      access_token: this.jwtService.sign(payload),
    };
    return token;
  }
}
