import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Airport } from '../../airport/entities/airport.entity';

export enum FlightStatus {
  ON_TIME = 'ON_TIME',
  DELAYED = 'DELAYED',
  CANCELED = 'CANCELED',
}

registerEnumType(FlightStatus, {
  name: 'FlightStatus',
});

@ObjectType()
@Entity('flights')
export class Flight {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  flightNumber: string;

  @Field(() => Airport)
  @ManyToOne(() => Airport, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'departureAirportId' })
  departureAirport: Airport;

  @Field()
  @Column()
  departureAirportId: string;

  @Field(() => Airport)
  @ManyToOne(() => Airport, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'destinationAirportId' })
  destinationAirport: Airport;

  @Field()
  @Column()
  destinationAirportId: string;

  @Field()
  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Field()
  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Field()
  @Column()
  airline: string;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  availableSeats: number;

  @Field(() => FlightStatus)
  @Column({
    type: 'varchar',
    length: 50,
    default: FlightStatus.ON_TIME,
  })
  status: FlightStatus;
}
