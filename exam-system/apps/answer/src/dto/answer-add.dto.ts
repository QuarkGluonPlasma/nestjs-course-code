import { IsNotEmpty, IsString } from "class-validator";

export class AnswerAddDto {
    @IsNotEmpty({message: '答卷内容不能为空'})
    @IsString()
    content: string;

    @IsNotEmpty()
    examId: number;
}
