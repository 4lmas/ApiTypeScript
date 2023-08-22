import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Rol{
    
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    rol : string

    @Column({default:true})
    isActive : boolean

    @OneToMany(()=> User, (user) => user.id)
    users: User[];
}