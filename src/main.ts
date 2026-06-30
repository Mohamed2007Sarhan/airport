import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global validation piping
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Auto-transform payloads to match DTO classes
      whitelist: true, // Strip non-whitelisted properties
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`\n==================================================`);
  console.log(`Server running on: http://localhost:${port}/graphql`);
  console.log(`GraphQL Playground available at that address`);
  console.log(`==================================================\n`);
}
bootstrap();
