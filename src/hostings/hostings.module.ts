import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostingsService } from './hostings.service';
import { HostingsController } from './hostings.controller';
import { Hostings, HostingsSchema } from './schemas/hostings.schema';
import { IsHostingsAlreadyExistConstraint } from './schemas/hostings.validate';
import { WebsiteModule } from 'src/website/website.module';
var slugify = require('vietnamese-slug')

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Hostings.name,
        useFactory: () => {
          const schema = HostingsSchema;
          schema.plugin(require('mongoose-autopopulate'));
          schema.pre('save', function () {
            this["slug"] = slugify(this["name"]) 
          });
          return schema;
        },
      }
    ]
    ),
    WebsiteModule
  ],
  controllers: [HostingsController],
  providers: [IsHostingsAlreadyExistConstraint, HostingsService],
  exports: [HostingsService]
})
export class HostingsModule {}
