import { IsNotEmpty } from "class-validator";

export class ExamSaveDto {
    @IsNotEmpty({ message: '考试 id 不能为空' })
    id: number;

    content: string;
}