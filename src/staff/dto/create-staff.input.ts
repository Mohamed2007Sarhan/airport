import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { StaffRole } from '../entities/staff.entity';

@InputType()
export class CreateStaffInput {
  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: string;

  @Field(() => StaffRole)
  role: StaffRole;
}
