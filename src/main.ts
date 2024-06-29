import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);

  var whitelist = ['http://95.163.223.141:3000', 'http://95.163.223.141:3000'];
app.enableCors({
origin: function (origin, callback) {
  if (whitelist.indexOf(origin) !== -1) {
    console.log("allowed cors for:", origin)
    callback(null, true)
  } else {
    console.log("blocked cors for:", origin)
    callback(new Error('Not allowed by CORS'))
  }
},
allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
credentials: true,
});

  await app.listen(PORT, () => console.log(`server start on ${PORT} port`));
}
bootstrap();
