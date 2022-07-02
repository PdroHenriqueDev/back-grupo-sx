import {
    Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './company';

@Entity({ name: 'collaborator' })
export class CollaboratorEntity {
    @PrimaryGeneratedColumn()
    code!: number;

    @Column()
    cpf!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    phone!: number;

    @Column()
    address!: string;
    
    @OneToOne(() => CompanyEntity, (company) => company.code)
    @JoinColumn({ name: 'company_code'})
    company_code!: CompanyEntity | number;
}