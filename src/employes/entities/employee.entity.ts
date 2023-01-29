import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  surname: string;

  @Column('text', {
    nullable: false,

    unique: true,
  })
  identityNumber: string;

  @Column('text', {
    nullable: false,
  })
  phoneNumber: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;
}
