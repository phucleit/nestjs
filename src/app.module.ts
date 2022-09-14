import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HostingsModule } from './hostings/hostings.module';
import { WebsiteModule } from './website/website.module';

@Module({ 
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGOURL,{
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        connection.plugin(require('mongoose-paginate'));
        return connection;
      }
    }),
    AuthModule, UserModule, HostingsModule, WebsiteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
