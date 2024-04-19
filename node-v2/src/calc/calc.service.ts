import { Injectable, BadRequestException } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto): { result: string } {
    try {
      const result = this.evaluateExpression(calcBody.expression);
      return { result: result.toString() };
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: "Invalid expression provided",
        error: "Bad Request"
      });
    }
  }

  private evaluateExpression(expression: string): number {
    const tokens = expression.split(' ');
    let result = parseInt(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseInt(tokens[i + 1]);

      switch (operator) {
        case '+':
          result += operand;
          break;
        case '-':
          result -= operand;
          break;
        case '*':
          result *= operand;
          break;
        case '/':
          if (operand === 0) {
            throw new Error("Division by zero");
          }
          result /= operand;
          break;
        default:
          throw new Error("Invalid operator");
      }
    }

    return result;
  }
}
