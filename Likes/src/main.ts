import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:['http://localhost:3000','https://kube.paulsouille.fr','http://kube.paulsouille.fr']});

  const options = new DocumentBuilder()
    .setTitle('Like')
    .setDescription('The likes API description')
    .setVersion('1.0')
    .addTag('likes')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('likes/documentation', app, document);
  await app.listen(process.env.PORT);
}


bootstrap();
