/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
// import hbs from 'hbs';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/* 
https://docs.nestjs.com/techniques/mvc
https://handlebarsjs.com/guide/#simple-expressions
https://github.com/facundo1000/thiagos-app/blob/master/src/main.ts
*/
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // template dirrectory
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // use Handlebars template engine
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe());

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  // Helper para comparar valores y devolver un booleano true o false
  //Utilizado para comparar si un valores de los selectores que devuelven un unico valor
  hbs.registerHelper('eq', function (a, b): boolean {
    return a === b;
  });

  // Helper para comparar valores dentro de un array y devolver un booleano true o false
  hbs.registerHelper('isInArray', function (value, array): boolean {
    return array.includes(value);
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
