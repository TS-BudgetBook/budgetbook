import {Controller, Get} from "@nestjs/common"

@Controller('auth')
export class AuthController {
    @Get('google/login')
     handleLogin(){
        return {msg: 'Google Authentication'};
    }

    @Get('google/callback')  
    handleRedirect (){
        return {msg: 'ok'};
    }
}