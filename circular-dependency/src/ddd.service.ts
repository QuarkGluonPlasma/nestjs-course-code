import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CccService } from './ccc.service';

@Injectable()
export class DddService {
    constructor(@Inject(forwardRef(() => CccService)) private cccService: CccService) {}

    ddd() {
        return this.cccService.ccc()  + 'ddd';
    }
}
