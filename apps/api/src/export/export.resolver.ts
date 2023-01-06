import {Export} from "./export.entity";
import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {ExportService} from "./export.service";

@Resolver(() => Export)
export default class ExportResolver {
    constructor(
        private readonly exportService: ExportService,
    ) {
    }

    @Query(() => [Export])
    async exports() {
        return this.exportService.findAll();
    }

    @Query(() => Export)
    async export(@Args('id') id: number) {
        return this.exportService.findOne(id);
    }

    @ResolveField(() => Document)
    async document(@Parent() exp: Export) {
        return exp.document
    }
}
