import { MenuGroup } from '../../domain/menu-group.entity';

export class MenuGroupResponse {
    id: number;
    name: string;

    public static from(menuGroup: MenuGroup): MenuGroupResponse {
        const menuGroupResponse = new MenuGroupResponse();
        menuGroupResponse.id = menuGroup.id;
        menuGroupResponse.name = menuGroup.getName();
        return menuGroupResponse;
    }
}
