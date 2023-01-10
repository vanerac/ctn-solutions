import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {Payment} from "./payment.entity";
import {PaymentService} from "./payment.service";
import {Customer} from "../customer/customer.entity";
import {User} from "../user/user.entity";

@Resolver(of => Payment)
export default class PaymentResolver {
    constructor(
        private readonly paymentService: PaymentService,
    ) {
    }

    @Query(() => [Payment])
    async payments() {
        return this.paymentService.findAll();
    }

    // single estimate
    @Query(() => Payment)
    async payment(@Args('id') id: number) {
        return this.paymentService.findOne(id);
    }

    // Customer
    @ResolveField(() => Customer)
    async customer(@Parent() payment: Payment) {
        return payment.customer;
    }

    // User
    @ResolveField(() => User)
    async user(@Parent() payment: Payment) {
        return payment.user;
    }


}
