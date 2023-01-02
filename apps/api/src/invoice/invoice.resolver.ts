import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {Invoice, InvoiceExport} from "./invoice.entity";
import {InvoiceService} from "./invoice.service";
import {Company} from "../company/company.entity";
import {InvoiceField} from "./invoice-fields.entity";
import {Customer} from "../customer/customer.entity";
import {User} from "../user/user.entity";

@Resolver(of => Invoice)
export default class InvoiceResolver {
    constructor(
        private readonly invoiceService: InvoiceService,
    ) {
    }

    @Query(() => [Invoice])
    async invoices() {
        return this.invoiceService.findAll();
    }

    @Query(() => Invoice)
    async invoice(@Args('id') id: number) {
        return this.invoiceService.findOne(id);
    }

    @ResolveField(() => Company)
    async billingAddress(@Parent() invoice: Invoice) {
        return invoice.billingAddress;
    }

    @ResolveField(() => Company)
    async shippingAddress(@Parent() invoice: Invoice) {
        return invoice.shippingAddress;
    }

    @ResolveField(() => InvoiceField)
    async items(@Parent() invoice: Invoice) {
        return invoice.items;
    }

    @ResolveField(() => Customer)
    async customer(@Parent() invoice: Invoice) {
        return invoice.customer;
    }

    @ResolveField(() => User)
    async owner(@Parent() invoice: Invoice) {
        return invoice.owner;
    }

    @ResolveField(() => InvoiceExport)
    async exports(@Parent() invoice: Invoice) {
        return invoice.exports;
    }
}
