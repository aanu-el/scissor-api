import {
    validate,
    validateOrReject,
    Length,
    IsEmail,
    IsString
} from 'class-validator';

export class UserValidator {
    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsString()
    @Length(2, 10, {
            message: "username must between 2 and 10 characters long"
        })
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @Length(4, 10, {
        message: "password must between 4 and 10 characters long"
        })
    password!: string;
}