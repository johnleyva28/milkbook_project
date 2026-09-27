import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola desde leyva, este es el setup inicial del backend';
  }
}
