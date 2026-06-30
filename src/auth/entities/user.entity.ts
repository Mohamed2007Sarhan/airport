import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  PASSENGER = 'PASSENGER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  // We do not expose the password field to GraphQL queries
  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({
    type: 'varchar',
    length: 50,
  })
  role: UserRole;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
