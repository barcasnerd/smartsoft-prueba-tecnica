import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProductPurchase } from "./ProductPurchase";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    money: number

    @Column({ nullable: true })
    isAdmin: boolean

    @OneToMany(() => ProductPurchase, purchase => purchase.user)
    purchases: ProductPurchase[];
}
