import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService)

  app.enableCors()

  await app.listen(PORT, () => console.log(`server start on ${PORT} port`));
}
bootstrap();
