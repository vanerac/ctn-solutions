import {Args, Parent, Query, ResolveField, Resolver} from "@nestjs/graphql";
import {Document, Signature} from "./document.entity";
import {DocumentService} from "./document.service";

@Resolver(of => Document)
export default class DocumentResolver {

    constructor(
        private readonly documentService: DocumentService,
    ) {

    }

    @Query(() => [Document])
    async documents() {
        return this.documentService.findAll();
    }

    // single document
    @Query(() => Document)
    async document(@Args('id') id: number) {
        return this.documentService.findOne(id);
    }

    @ResolveField(() => [Signature])
    async signatures(@Parent() document: Document) {
        return document.signatures;
    }

}
