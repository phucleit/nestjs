import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { Emails, EmailsSchema } from './schemas/emails.schema';
import { IsEmailsAlreadyExistConstraint } from './schemas/emails.validate';

var slugify = require('vietnamese-slug');

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
    [
      {
        name: Emails.name,
        useFactory: () => {
          const schema = EmailsSchema;
          schema.plugin(require('mongoose-autopopulate'));
          schema.pre('save', function () {
            this["slug"] = slugify(this["name"]) 
          });
          return schema;
        },
      }
    ]
    ),
  ],
  controllers: [EmailsController],
  providers: [IsEmailsAlreadyExistConstraint, EmailsService],
  exports: [EmailsService]
})
export class EmailsModule {}
