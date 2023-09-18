import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gallery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path:string
}