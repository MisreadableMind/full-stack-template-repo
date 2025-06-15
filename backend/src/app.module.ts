import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/example.service';
import { configuration } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // Uncomment and configure TypeORM when needed
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT, 10) || 5432,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: [],
    //   synchronize: process.env.NODE_ENV !== 'production',
    // }),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class AppModule {}