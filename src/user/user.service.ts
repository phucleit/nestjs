import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose'
import { Model } from 'mongoose';
import { User, UserDocument, UserStatus } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {};
  async findOne(username: string): Promise<User | undefined> {
    var z = await this.userModel.aggregate([
      {
        $match: {
          "username": username
        },
      },
      {
        $project: {"_id": false, "username" : "$username", "password" : "$password", "userId": "$id"}
      }
    ],{"allowDiskUse" : true}).exec();
    return z[0];
  }

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    user.status = UserStatus.OK;
    return await user.save();
  }
  
  async findAll() {
    var x = await this.userModel.find({}).exec();
    return x;
  }

  async findByUserName(username: string){
    return await this.userModel.findOne({UserName: username}).exec();
  }

  async initAdmin(){
    var x = await this.userModel.findOne({username: 'admin'}).exec();
    if(x) return UserStatus.NOTEXIST;
    else {
      var model = new this.userModel({
        username: 'admin',
        password: '123asd',
        email: 'admin@gmail.com'
      })
      await model.save();
      return model
    }
  }

  async insert() {

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
