import { MenuGroup } from '../../domain/menu-group.entity';

export class MenuGroupCreateRequest {
    name: string;

    public static from(name: string): MenuGroupCreateRequest {
        const menuGroupCreateRequest = new MenuGroupCreateRequest();
        menuGroupCreateRequest.name = name;
        return menuGroupCreateRequest;
    }

    public toMenuGroup(): MenuGroup {
        return MenuGroup.from(this.name);
    }
}
