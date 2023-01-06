import {UserService} from "./user.service";
import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {User} from "./user.entity";
import {Customer} from "../customer/customer.entity";
import {CustomerService} from "../customer/customer.service";

@Resolver(of => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly customerService: CustomerService
    ) {

    }


    @Query(() => [User])
    async users() {
        return this.userService.findAll();
    }

    // single user
    @Query(() => User)
    async user(@Args('id') id: number) {
        return this.userService.findOne(id);
    }

    @ResolveField(() => [Customer])
    async customers(@Parent() user: User) {
        return this.customerService.findAll()
    }

}
