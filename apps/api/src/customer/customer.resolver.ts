import {CustomerService} from "./customer.service";
import {Customer} from "./customer.entity";
import {Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {User} from "../user/user.entity";
import {Company} from "../company/company.entity";

@Resolver(of => Customer)
export default class CustomerResolver {
    constructor(private readonly customerService: CustomerService) {
    }

    @Query(() => [Customer])
    async customers() {
        return this.customerService.findAll();
    }

    // Company is a OneToOne relation
    @ResolveField(() => Company)
    async company(@Parent() customer: Customer) {
        return customer.company;
    }

    // User is a ManyToOne relation
    @ResolveField(() => User)
    async user(@Parent() customer: Customer) {
        return customer.user;
    }

}
