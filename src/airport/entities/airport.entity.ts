import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity('airports')
export class Airport {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true, length: 10 })
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ length: 100 })
  city: string;

  @Field()
  @Column({ length: 100 })
  country: string;
}
