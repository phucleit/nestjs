import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { Emails, EmailsDocument } from './schemas/emails.schema';
import { MongooseHelper} from 'src/common/MongooseHelper';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(Emails.name) public model: Model<EmailsDocument>
  ) {};

  async create(createEmailDto: CreateEmailDto) {
    try {
      const model = new this.model(createEmailDto);
      return await model.save();
    } catch {
      return null;
    }
  }

  async findAll(_page: any) {
    var model = await new MongooseHelper(this.model)
      .sort('createdAt', -1)
      .paging(_page, 10)
      .excute();
    
    return model;
  }

  async findOne(id: string) {
    var model = await new MongooseHelper(this.model).byID(id);
    return model;
  }

  async update(id: string, updateEmailDto: UpdateEmailDto) {
    const model = await this.model
      .findByIdAndUpdate(id, updateEmailDto)
      .setOptions({ new: true });

    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  async remove(id: string) {
    var model = await this.model.findByIdAndDelete(id);
    if (!model) {
      throw new NotFoundException();
    }
    return 'Delete success';
  }

  async findByName(name: string) {
    const model = await this.model.findOne({name: name});
    return model;
  }
}
