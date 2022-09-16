import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { Websites, WebsitesSchema } from './schemas/websites.schema';
import { IsWebsitesAlreadyExistConstraint } from './schemas/websites.validate';
var slugify = require('vietnamese-slug')

@Module({
  imports: [MongooseModule.forFeatureAsync(
    [
      {
        name: Websites.name,
        useFactory: () => {
          const schema = WebsitesSchema;
          schema.plugin(require('mongoose-autopopulate'));
          schema.pre('save', function () {
            this["slug"] = slugify(this["name"]) 
          });
          return schema;
        },
      }
    ]
  )],
  controllers: [WebsitesController],
  providers: [IsWebsitesAlreadyExistConstraint, WebsitesService],
  exports: [WebsitesService]
})
export class WebsitesModule {}
