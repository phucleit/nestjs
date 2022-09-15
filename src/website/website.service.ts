import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { Website, WebsiteDocument } from './schemas/website.schema';
import { MongooseHelper} from 'src/common/MongooseHelper'
import { monitorEventLoopDelay } from 'perf_hooks';

@Injectable()
export class WebsiteService {
  constructor(@InjectModel(Website.name) public model: Model<WebsiteDocument>) {};

  async create(createWebsiteDto: CreateWebsiteDto) {
    const model = new this.model(createWebsiteDto);
    return await model.save();
  }

  async findAll(_page: any) {
    var model = await new MongooseHelper(this.model)
      // .lookup('hosting', "hostings")
      .sort('createdAt', -1).paging(_page, 5).excute();
    return model;
  }

  async findOne(id: string) {
    var model = await new MongooseHelper(this.model).byID(id);
    return model;
  }

  async update(id: string, updateWebsiteDto: UpdateWebsiteDto) {
    const model = await this.model
      .findByIdAndUpdate(id, updateWebsiteDto)
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
