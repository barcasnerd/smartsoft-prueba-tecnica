import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class ProductPurchase {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

    @CreateDateColumn()
    purchaseDate: Date;

    @Column()
    total: number;

    @Column()
    user: User;
}
