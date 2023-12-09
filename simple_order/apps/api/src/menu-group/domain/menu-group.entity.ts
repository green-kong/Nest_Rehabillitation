import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from '@libs/entity';

@Entity()
export class MenuGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Name, { prefix: false })
    name: Name;

    public static from(name: string): MenuGroup {
        const menuGroupName = Name.from(name);
        const menuGroup = new MenuGroup();
        menuGroup.name = menuGroupName;
        return menuGroup;
    }

    public getName(): string {
        return this.name.name;
    }
}
