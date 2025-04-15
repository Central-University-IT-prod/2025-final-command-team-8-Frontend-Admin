import {z} from "zod";

const passwordSchema = z.string().min(8, 'Минимальная длина пароля 8 символов')
    .regex(/[A-Z]/,'Пароль должен содержать хотя бы 1 заглавную букву')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Пароль должен содержать хотя бы один специальный символ');

export const ValidatePassword = (password: String) : String =>{
    try{
        passwordSchema.parse(password);
        return ''
    } catch(error){
        return error.errors[0].message;
    }
}