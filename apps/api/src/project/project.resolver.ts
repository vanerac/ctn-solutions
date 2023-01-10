import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {Project} from "./project.entity";
import {ProjectService} from "./project.service";
import {User} from "../user/user.entity";
import {Invoice} from "../invoice/invoice.entity";
import {Estimate} from "../estimate/estimate.entity";
import {Customer} from "../customer/customer.entity";

@Resolver(of => Project)
export default class ProjectResolver {
    constructor(
        private readonly projectService: ProjectService,
    ) {
    }

    @Query(() => [Project])
    async projects() {
        return this.projectService.findAll()
    }

    // Single project
    @Query(() => Project)
    async project(@Args('id') id: number) {
        return this.projectService.findOne(id)
    }

    @ResolveField(() => User)
    async user(@Parent() project: Project) {
        return project.user
    }

    @ResolveField(() => [Invoice])
    async invoices(@Parent() project: Project) {
        return project.invoices
    }

    @ResolveField(() => [Estimate])
    async estimates(@Parent() project: Project) {
        return project.estimates
    }

    @ResolveField(() => Customer)
    async customer(@Parent() project: Project) {
        return project.customer
    }

}
