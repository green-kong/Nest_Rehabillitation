import { MenuValidator } from '../../../../apps/api/src/menu/service/menu.validator';
import { Injectable } from '@nestjs/common';
import { Menu } from '../../../../apps/api/src/menu/domain/menu.entity';

@Injectable()
export class StubMenuValidator implements MenuValidator {
    async validate(menu: Menu): Promise<void> {}
}
