import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter} from "./alll-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
