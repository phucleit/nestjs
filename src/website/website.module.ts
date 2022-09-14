import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsiteService } from './website.service';
import { WebsiteController } from './website.controller';
import { Website, WebsiteSchema } from './schemas/website.schema';
import { IsWebsiteAlreadyExistConstraint } from './schemas/website.validate';
var slugify = require('vietnamese-slug')

@Module({
  imports: [MongooseModule.forFeatureAsync(
    [
      {
        name: Website.name,
        useFactory: () => {
          const schema = WebsiteSchema;
          schema.plugin(require('mongoose-autopopulate'));
          schema.pre('save', function () {
            this["slug"] = slugify(this["name"]) 
          });
          return schema;
        },
      }
    ]
  )],
  controllers: [WebsiteController],
  providers: [IsWebsiteAlreadyExistConstraint, WebsiteService],
  exports: [WebsiteService]
})
export class WebsiteModule {}
