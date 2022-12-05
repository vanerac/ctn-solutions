import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {readFileSync, writeFileSync} from "fs";
import {description, name, version} from 'package.json'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    writeFileSync('../../swagger.json',
        JSON.stringify(
            SwaggerModule
                .createDocument(app,
                    new DocumentBuilder()
                        .setTitle(name.toUpperCase())
                        .setDescription(description)
                        .setVersion(version)
                        .addBearerAuth()
                        .build()
                )
        )
    )


    SwaggerModule.setup('swagger', app,
        JSON.parse(readFileSync('./swagger.json').toString())
    )

    await app.listen(3000);
}

bootstrap();
