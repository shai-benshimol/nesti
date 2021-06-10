import { DynamicModule, Module } from '@nestjs/common';
import { Nesti } from './nesti.models';
import { db_options } from './nesti.props';
import { NestiService } from './nesti.service';
@Module({
  providers: [NestiService]
})
export class NestiModule {
  static init(dbOptions?: Nesti.DbOption): DynamicModule {
    return {
      module: NestiModule,
      providers: [{
        provide: db_options,
        useValue: dbOptions
      },
      NestiService],
      exports: [
        NestiService
      ],
    };
  }
}
