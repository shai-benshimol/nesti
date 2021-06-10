# Nesti

[nano](https://www.npmjs.com/package/nano) [couchdb](http://couchdb.apache.org/) module wrapper for [Nest.js](https://nestjs.com/).

##### Installation
``` npm i @shai_ben_shimol/nesti -S```

## Quick start


Import `Nesti` into the root `AppModule` and use the `init()` method to configure this database option. 

```typescript
import { Module } from '@nestjs/common';
import { NestiModule } from '@shai_ben_shimol/nesti';

@Module({
  imports: [
    NestiModule.init({
        host: '127.0.0.1', 
        port: 5984,
        protocol: 'http',
        username: 'root',
        password: '1234',
        dbname:'somedb'
    }),
  ],
})
export class AppModule {}
```
Afterward, the nesti instance will be available to inject across entire project (and in your feature modules, being `NestiModule` a global one) using the db_options injection token:

```typescript
import { Nesti, NestiService ,MaybeDocument} from '@shai_ben_shimol/nesti';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

interface User extends MaybeDocument{
  name:string;
  email:string;
  age:number;
  birth:Date;
}

@Controller()
export class AppController {
  constructor(private readonly db: NestiService) {}
  
  @Post('set-user')
  async set(@Body() user:User):Promise<Nesti.Result>{
    return await this.db.insert(user) //For update use _id
  }
  @Get('get-user')
  async getUser(@Param() params):Promise<Nesti.Result>{
    return (await this.db.use()).get(params.key)
  }
  @Delete('destroy')
  async destroy():Promise<Nesti.Result>{
    return await this.db.destroy()
  }
}
```

### Full Documentation ###
[nano]((https://www.npmjs.com/package/nano))

You can use the `docker-compose.yml` and run  
```bash
$ sudo docker-compose up
```