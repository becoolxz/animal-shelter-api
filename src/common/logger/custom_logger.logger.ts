import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
  log(message: any, context?: string, ...args) {
    const methodName = context ? `[${context}]` : '';
    const timestamp = new Date().toISOString();
    const formattedArgs = this.formatArguments(...args);

    const formattedMessage = `[${timestamp}] ${methodName} ${message} ${formattedArgs}`;

    super.log(formattedMessage);
  }

  private formatArguments(...args: any[]): any[] {
    return args.map((arg) => {
      if (typeof arg === 'object') {
        return this.formatObjectArguments(arg);
      }
      return arg;
    });
  }

  private formatObjectArguments(arg: object): string {
    return JSON.stringify(arg, null, 2);
  }
}
