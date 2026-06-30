import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { User } from '../../auth/entities/user.entity';
import { Flight } from '../../flight/entities/flight.entity';

export enum StaffRole {
  PILOT = 'PILOT',
  CREW = 'CREW',
  GROUND_STAFF = 'GROUND_STAFF',
  SECURITY = 'SECURITY',
}

registerEnumType(StaffRole, {
  name: 'StaffRole',
});

@ObjectType()
@Entity('staff')
export class Staff {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User)
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  employeeId: string;

  @Field(() => StaffRole)
  @Column({
    type: 'varchar',
    length: 50,
  })
  role: StaffRole;

  @Field(() => Flight, { nullable: true })
  @ManyToOne(() => Flight, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'assignedFlightId' })
  assignedFlight?: Flight;

  @Field({ nullable: true })
  @Column({ nullable: true })
  assignedFlightId?: string;
}
