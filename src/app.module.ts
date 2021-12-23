import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostModule} from "./post/post.module";
import {Post} from "./post/entity/post.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          console.log(configService.get('MYSQL_HOST'))
          return {
            type: 'mysql',
            host: configService.get('MYSQL_HOST'),
            port: parseInt(configService.get('MYSQL_PORT')),
            username: configService.get('MYSQL_USERNAME'),
            password: configService.get('MYSQL_PASSWORD'),
            database: configService.get('MYSQL_DATABASE'),
            synchronize: true,
            logging: true,
            charset: 'utf8mb4_unicode_ci',
            timezone: '+09:00',
            entities: [Post]
          }
        }
      }),
      PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
