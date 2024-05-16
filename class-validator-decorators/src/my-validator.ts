import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint()
export class MyValidator implements ValidatorConstraintInterface {
    async validate(text: string, validationArguments: ValidationArguments) {
        // console.log(text, validationArguments)
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(text.includes(validationArguments.constraints[0]));
            }, 3000);
        })
    }
}