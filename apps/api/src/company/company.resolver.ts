import {Query, Resolver} from "@nestjs/graphql";
import {Company} from "./company.entity";
import {CompanyService} from "./company.service";

@Resolver(of => Company)
export default class CompanyResolver {

    constructor(private readonly companyService: CompanyService) {

    }

    @Query(() => [Company])
    async companies() {
        return this.companyService.findAll();
    }


}
