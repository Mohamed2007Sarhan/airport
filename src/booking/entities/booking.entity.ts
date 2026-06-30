import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Passenger } from '../../passenger/entities/passenger.entity';
import { Flight } from '../../flight/entities/flight.entity';

@ObjectType()
@Entity('bookings')
@Unique(['flightId', 'seatNumber']) // Database level unique constraint for seat assignments
export class Booking {
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
  @Column()
  seatNumber: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  bookingDate: Date;
}
