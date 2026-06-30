import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { CreateStaffInput } from './dto/create-staff.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../auth/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Staff)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Mutation(() => Staff)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createStaff(@Args('input') input: CreateStaffInput): Promise<Staff> {
    return this.staffService.create(input);
  }

  @Mutation(() => Staff)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  assignStaffToFlight(
    @Args('staffId') staffId: string,
    @Args('flightId', { nullable: true }) flightId?: string,
  ): Promise<Staff> {
    return this.staffService.assignToFlight(staffId, flightId || null);
  }

  @Query(() => [Staff], { name: 'staffMembers' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  @Query(() => Staff, { name: 'staffMember' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  findOne(@Args('id') id: string): Promise<Staff> {
    return this.staffService.findOne(id);
  }

  @Query(() => Staff, { name: 'meStaff' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.STAFF)
  getProfile(@CurrentUser() user: User): Promise<Staff> {
    return this.staffService.findByUserId(user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  removeStaff(@Args('id') id: string): Promise<boolean> {
    return this.staffService.remove(id);
  }
}
