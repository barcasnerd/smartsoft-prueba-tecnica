import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class ProductPurchase {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

    @CreateDateColumn()
    purchaseDate: Date;

    @Column()
    total: number;

    @ManyToOne(() => User, user => user.purchases)
    user: User;
}
