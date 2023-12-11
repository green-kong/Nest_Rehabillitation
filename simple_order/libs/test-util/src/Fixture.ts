import { MenuCreateRequest } from '../../../apps/api/src/menu/controller/dto/menuCreateRequest';
import { MenuProductRequest } from '../../../apps/api/src/menu/controller/dto/menuProductRequest';

export class Fixture {
    public static creatMenuRequest(
        menuName: string,
        menuPrice: number,
    ): MenuCreateRequest {
        const menuGroupId = 1;
        const menuProductRequest1 = MenuProductRequest.of(1, 2);
        const menuProductRequest2 = MenuProductRequest.of(2, 1);
        const menuProductRequest3 = MenuProductRequest.of(3, 1);

        return MenuCreateRequest.of(
            //
            menuName,
            menuPrice,
            menuGroupId,
            [menuProductRequest1, menuProductRequest2, menuProductRequest3],
        );
    }
}
