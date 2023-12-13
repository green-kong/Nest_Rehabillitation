import { Injectable } from '@nestjs/common';
import { MenuGroupRepository } from '../../menu-group/domain/menu-group.repository';
import { ProductRepository } from '../../product/domain/Product.repository';
import { MenuValidator } from './menu.validator';
import { Menu } from '../domain/menu.entity';

@Injectable()
export class DefaultMenuValidator implements MenuValidator {
    constructor(
        private readonly menuGroupRepository: MenuGroupRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    public async validate(menu: Menu): Promise<void> {
        await this.validateMenuGroup(menu.menuGroupId);
        await this.validateProduct(menu);
    }

    private async validateProduct(menu: Menu) {
        const productIds = menu.menuProducts //
            .map((menuProduct) => menuProduct.productId);
        const products = await this.productRepository.findByIds(productIds);
        if (products.length !== productIds.length) {
            throw new Error(
                `존재하지 않는 product가 포함되어 있습니다. productIds = ${productIds}`,
            );
        }
    }

    private async validateMenuGroup(menuGroupId: number) {
        const menuGroup =
            await this.menuGroupRepository.findMenuGroupById(menuGroupId);
        if (!menuGroup) {
            throw new Error(
                `존재하지 않는 메뉴그룹 아이디 입니다. menuGroupId = ${menuGroupId}`,
            );
        }
    }
}
