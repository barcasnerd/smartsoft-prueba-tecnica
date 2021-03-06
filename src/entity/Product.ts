import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    price: number;

    @Column()
    quantity: number;
}
