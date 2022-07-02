import {
    Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';
  
@Entity({ name: 'company' })
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    code!: number;

    @Column()
    cnpj!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    phone!: number;

    @Column()
    address!: string;
}
  