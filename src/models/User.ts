import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Rol } from "./Rol";

@Entity()

export class User{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    lastName : string

    @Column()
    age : number

    @Column()
    gender : string

    @Column()
    email: string

    @Column()
    password : string

    @Column({default: true})
    state : boolean

    @ManyToOne(()=> Rol, (rol)=> rol.users)
    rol: Rol

    @RelationId((user: User) => user.rol)
    rolId :number;
}
