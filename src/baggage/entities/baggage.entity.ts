import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { Passenger } from '../../passenger/entities/passenger.entity';
import { Flight } from '../../flight/entities/flight.entity';

export enum BaggageStatus {
  CHECKED_IN = 'CHECKED_IN',
  IN_TRANSIT = 'IN_TRANSIT',
  ARRIVED = 'ARRIVED',
  CLAIMED = 'CLAIMED',
}

registerEnumType(BaggageStatus, {
  name: 'BaggageStatus',
});

@ObjectType()
@Entity('baggages')
export class Baggage {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Passenger)
  @ManyToOne(() => Passenger, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'passengerId' })
  passenger: Passenger;

  @Field()
  @Column()
  passengerId: string;

  @Field(() => Flight)
  @ManyToOne(() => Flight, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flightId' })
  flight: Flight;

  @Field()
  @Column()
  flightId: string;

  @Field()
  @Column({ unique: true })
  tagNumber: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  weight: number;

  @Field(() => BaggageStatus)
  @Column({
    type: 'varchar',
    length: 50,
    default: BaggageStatus.CHECKED_IN,
  })
  status: BaggageStatus;
}
