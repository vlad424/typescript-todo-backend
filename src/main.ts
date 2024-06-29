import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  await app.listen(5000, () => console.log(`server start on ${5000} port`));
}
bootstrap();
