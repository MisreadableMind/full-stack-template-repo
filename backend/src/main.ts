import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { logMemoryUsage } from './utils';
import * as v8 from 'v8';

console.log(`Memory limit: ${v8.getHeapStatistics().heap_size_limit / 1024 / 1024} MB`);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Increase payload size limit for JSON and URL-encoded data
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ limit: '200mb', extended: true }));

    // Enable CORS and configure it
    app.enableCors({
        origin: true, // Allow all origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Accept',
        optionsSuccessStatus: 204,
        credentials: false
    });

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('API Template')
        .setDescription('Template API built with NestJS')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    logMemoryUsage();
    await app.listen(process.env.PORT || 4000);
}

bootstrap();