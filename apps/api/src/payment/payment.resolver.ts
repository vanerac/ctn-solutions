import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {Payment} from "./payment.entity";
import {PaymentService} from "./payment.service";
import {User} from "../user/user.entity";
import {Invoice} from "../invoice/invoice.entity";

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
    
    // User
    @ResolveField(() => User)
    async user(@Parent() payment: Payment) {
        return payment.user;
    }

    // Invoices
    @ResolveField(() => [Invoice])
    async invoices(@Parent() payment: Payment) {
        return payment.invoices;
    }


}
