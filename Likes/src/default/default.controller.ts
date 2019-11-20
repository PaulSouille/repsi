import { Controller, Get, Redirect } from '@nestjs/common';


@Controller('')
export class DefaultController {

    constructor() {

    }

    @Get()
    @Redirect('/documentation')
    documentation(){}
}
