import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CalcController } from './calc/calc.controller';
import { CalcService } from './calc/calc.service';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  imports: [],
  controllers: [CalcController],
  providers: [CalcService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
