import { BadRequestException } from '@nestjs/common';

export const validateSchema = (value: any, schema: any): void => {
    const result = schema.validate(value);
    if (result.error !== null) {
        const msgErr = generateJoiErrMessage(result.error);
        throw new BadRequestException(msgErr);
    }
};

export const generateJoiErrMessage = (error) => {
    // tslint:disable-next-line: no-any
    const errors = error.details.map((detail: any) => detail.message);
    return errors.join(',');
};
