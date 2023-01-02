import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {Estimate} from "./estimate.entity";
import {EstimateService} from "./estimate.service";
import {EstimateField} from "./estimate-field.entity";
import {User} from "../user/user.entity";
import {Customer} from "../customer/customer.entity";
import {Company} from "../company/company.entity";

@Resolver(of => Estimate)
export default class EstimateResolver {

    constructor(
        private readonly estimateService: EstimateService,
    ) {
    }

    @Query(() => [Estimate])
    async estimates() {
        return this.estimateService.findAll();
    }

    // single estimate
    @Query(() => Estimate)
    async estimate(@Args('id') id: number) {
        return this.estimateService.findOne(id);
    }

    @ResolveField(() => [EstimateField])
    async items(@Parent() estimate: Estimate) {
        return estimate.items;
    }

    @ResolveField(() => User)
    async user(@Parent() estimate: Estimate) {
        return estimate.owner;
    }

    // customer
    @ResolveField(() => Customer)
    async customer(@Parent() estimate: Estimate) {
        return estimate.customer;
    }

    // Billing comapny
    @ResolveField(() => Company)
    async billingAddress(@Parent() estimate: Estimate) {
        return estimate.billingAddress;
    }

    // Paying company
    @ResolveField(() => Company)
    async shippingAddress(@Parent() estimate: Estimate) {
        return estimate.shippingAddress;
    }

}
