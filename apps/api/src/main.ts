import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {readFileSync, writeFileSync} from "fs";
// import {description, name, version} from 'package.json'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    const path = '../../swagger.json'


    writeFileSync(path,
        JSON.stringify(
            SwaggerModule
                .createDocument(app,
                    new DocumentBuilder()
                        .setTitle('NestJS API')
                        .setDescription('desc')
                        .setVersion('1.0')
                        .addBearerAuth()
                        .build()
                )
        )
    )


    SwaggerModule.setup('swagger', app,
        JSON.parse(readFileSync(path).toString())
    )

    await app.listen(3000);
}

bootstrap();
