import { MaybeDocument } from 'nano';

import * as Nano from 'nano'
import { Injectable, Inject } from '@nestjs/common';
import { db_options } from './nesti.props';
import { Nesti } from './nesti.models';

@Injectable()
export class NestiService {

  public nano: Nano.ServerScope;

  constructor(@Inject(db_options) private dbOptions: Nesti.DbOption) {
    console.log('Welcone with some butify cli')
    const open = this.open()
    open.then(res => console.log(res)).catch(err => console.log(err))
  }
  protected open = async (): Promise<Nesti.Result> => {
    this.nano = Nano(`${this.dbOptions.protocol}://${this.dbOptions.username}:${this.dbOptions.password}@${this.dbOptions.host}:${this.dbOptions.port}`);
    return await this.nano.db.create(this.dbOptions.dbname)
      .then(() => Nesti.Result.success(null, `${this.dbOptions.dbname} open successfully`))
      .catch(err => {
        if (err.error === 'file_exists') {
          return Nesti.Result.success(null, `${this.dbOptions.dbname} open successfully`)
        }
        return Nesti.Result.fail(err)
      })
  }
   use = async<T>(): Promise<Nano.DocumentScope<T>> => {
    return this.nano.use<T>(this.dbOptions.dbname)
  }
  db = async (): Promise<Nano.DatabaseScope> => this.nano.db
  
  insert = async<T extends MaybeDocument>(data: T): Promise<Nesti.Result> =>
    await (await this.use()).insert(data)

  destroy = async (): Promise<Nesti.Result> => {
    return await this.nano.db.destroy(this.dbOptions.dbname)
      .then(() => Nesti.Result.success(null, `${this.dbOptions.dbname} destroyed successfully`))
      .catch(err => Nesti.Result.fail(err))
  }
}
