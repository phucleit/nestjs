import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { UpdateHostingDto } from './dto/update-hosting.dto';
import { Hostings, HostingsDocument } from './schemas/hostings.schema';
import { Website, WebsiteDocument } from '../website/schemas/website.schema';
import { MongooseHelper} from 'src/common/MongooseHelper'

@Injectable()
export class HostingsService {
  constructor(
    @InjectModel(Hostings.name) public model: Model<HostingsDocument>,
    @InjectModel(Website.name) public modelWebsite: Model<WebsiteDocument>
  ) {};

  async create(createHostingDto: CreateHostingDto) {
    const model = new this.model(createHostingDto);
    return await model.save();
  }

  async findAll(_page: any) {
    var model = await new MongooseHelper(this.model)
      .sort('createdAt', -1)
      .paging(_page, 10)
      .excute();
    return model;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).populate('website', '', this.modelWebsite).exec();

    // var model = await new MongooseHelper(this.model)
      // .query({
      //   $set: {
      //     websites: [
      //       new Types.ObjectId(id)
      //     ]
      //   }
      // })
    //   .excute();
    // return model;

    // var model = await new MongooseHelper(this.model).byID(id);
    // return model;

    // var model = await this.model.findById(id).populate('websites').exec();
    // return model;
  }

  async update(id: string, updateHostingDto: UpdateHostingDto) {
    const model = await this.model
      .findByIdAndUpdate(id, updateHostingDto)
      .setOptions({ new: true });
      
    if (!model) {
      throw new NotFoundException();
    }
    return model;
  }

  async remove(id: string) {
    const model = await this.model.findByIdAndDelete(id);
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
