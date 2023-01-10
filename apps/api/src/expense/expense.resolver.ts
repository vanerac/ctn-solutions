import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {ExpenseService} from "./expense.service";
import {Expense} from "./expense.entity";
import {User} from "../user/user.entity";
import {Invoice} from "../invoice/invoice.entity";
import {Customer} from "../customer/customer.entity";

@Resolver(of => Expense)
export default class ExpenseResolver {

    constructor(
        private readonly expenseService: ExpenseService,
    ) {
    }

    @Query(() => [Expense])
    async expenses() {
        return this.expenseService.findAll();
    }

    // single expense
    @Query(() => Expense)
    async expense(@Args('id') id: number) {
        return this.expenseService.findOne(id);
    }

    @ResolveField(() => User)
    async user(@Parent() expense: Expense) {
        return expense.user
    }

    // Invoice
    @ResolveField(() => Invoice)
    async invoice(@Parent() expense: Expense) {
        return expense.invoice
    }

    // Customer
    @ResolveField(() => Customer)
    async customer(@Parent() expense: Expense) {
        return expense.customer
    }


}
