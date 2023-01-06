import {GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig} from 'graphql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
};

export type Company = {
    __typename?: 'Company';
    address: Scalars['String'];
    ape: Scalars['String'];
    city: Scalars['String'];
    description: Scalars['String'];
    id: Scalars['Int'];
    industry: Scalars['String'];
    legalform: LegalForm;
    legalname: Scalars['String'];
    logo: Scalars['String'];
    siret: Scalars['String'];
    state: Scalars['String'];
    taxid: Scalars['String'];
    website: Scalars['String'];
    zip: Scalars['String'];
};

export type Customer = {
    __typename?: 'Customer';
    company?: Maybe<Company>;
    email: Scalars['String'];
    firstname: Scalars['String'];
    id: Scalars['Int'];
    lastname: Scalars['String'];
    phone: Scalars['String'];
    user: User;
};

export type Document = {
    __typename?: 'Document';
    createdAt: Scalars['DateTime'];
    id: Scalars['Int'];
    signatures?: Maybe<Array<Signature>>;
    updatedAt: Scalars['DateTime'];
    url?: Maybe<Scalars['String']>;
};

export type Estimate = {
    __typename?: 'Estimate';
    billingAddress: Company;
    createdAt: Scalars['DateTime'];
    customer: Customer;
    date: Scalars['DateTime'];
    description: Scalars['String'];
    dueDate: Scalars['DateTime'];
    globalDiscount: Scalars['Float'];
    id: Scalars['Int'];
    items: Array<EstimateField>;
    notes: Scalars['String'];
    owner: User;
    shippingAddress: Company;
    status: EstimateStatus;
    tax: Scalars['Float'];
    terms: Scalars['String'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    user: User;
};

export type EstimateField = {
    __typename?: 'EstimateField';
    description: Scalars['String'];
    discount: Scalars['Float'];
    estimate: Estimate;
    id: Scalars['Int'];
    quantity: Scalars['Float'];
    tax: Scalars['Float'];
    title: Scalars['String'];
    unitPrice: Scalars['Float'];
};

export enum EstimateStatus {
    Accepted = 'ACCEPTED',
    Cancelled = 'CANCELLED',
    ChangesRequested = 'CHANGES_REQUESTED',
    Declined = 'DECLINED',
    Draft = 'DRAFT',
    Expired = 'EXPIRED',
    Sent = 'SENT'
}

export type Export = {
    __typename?: 'Export';
    createdAt: Scalars['DateTime'];
    document?: Maybe<Document>;
    doneAt?: Maybe<Scalars['DateTime']>;
    errorAt?: Maybe<Scalars['DateTime']>;
    id: Scalars['Int'];
    processedAt?: Maybe<Scalars['DateTime']>;
    status: ExportStatus;
    updatedAt: Scalars['DateTime'];
};

export enum ExportStatus {
    Done = 'DONE',
    Error = 'ERROR',
    Pending = 'PENDING',
    Processing = 'PROCESSING'
}

export type Invoice = {
    __typename?: 'Invoice';
    billingAddress?: Maybe<Company>;
    createdAt: Scalars['DateTime'];
    customer: Customer;
    date: Scalars['DateTime'];
    description: Scalars['String'];
    dueDate: Scalars['DateTime'];
    exports?: Maybe<Array<InvoiceExport>>;
    globalDiscount: Scalars['Float'];
    id: Scalars['Int'];
    items: Array<InvoiceField>;
    notes: Scalars['String'];
    owner: User;
    shippingAddress?: Maybe<Company>;
    status: InvoiceStatus;
    tax: Scalars['Float'];
    terms: Scalars['String'];
    title: Scalars['String'];
    updatedAt: Scalars['DateTime'];
};

export type InvoiceExport = {
    __typename?: 'InvoiceExport';
    export?: Maybe<Export>;
    id: Scalars['Int'];
    invoice?: Maybe<Invoice>;
};

export type InvoiceField = {
    __typename?: 'InvoiceField';
    description: Scalars['String'];
    discount: Scalars['Float'];
    id: Scalars['Int'];
    invoice: Invoice;
    quantity: Scalars['Float'];
    tax: Scalars['Float'];
    title: Scalars['String'];
    unitPrice: Scalars['Float'];
};

export enum InvoiceStatus {
    Accepted = 'ACCEPTED',
    Cancelled = 'CANCELLED',
    ChangesRequested = 'CHANGES_REQUESTED',
    Declined = 'DECLINED',
    Draft = 'DRAFT',
    Expired = 'EXPIRED',
    Sent = 'SENT'
}

export enum LegalForm {
    Ae = 'AE',
    Ei = 'EI',
    Eirl = 'EIRL',
    Eurl = 'EURL',
    Sarl = 'SARL',
    Sas = 'SAS',
    Sasu = 'SASU'
}

export type Query = {
    __typename?: 'Query';
    companies: Array<Company>;
    customers: Array<Customer>;
    document: Document;
    documents: Array<Document>;
    estimate: Estimate;
    estimates: Array<Estimate>;
    export: Export;
    exports: Array<Export>;
    invoice: Invoice;
    invoices: Array<Invoice>;
    user: User;
    users: Array<User>;
};


export type QueryDocumentArgs = {
    id: Scalars['Float'];
};


export type QueryEstimateArgs = {
    id: Scalars['Float'];
};


export type QueryExportArgs = {
    id: Scalars['Float'];
};


export type QueryInvoiceArgs = {
    id: Scalars['Float'];
};


export type QueryUserArgs = {
    id: Scalars['Float'];
};

export type Signature = {
    __typename?: 'Signature';
    anchors?: Maybe<SignatureAnchor>;
    createdAt: Scalars['DateTime'];
    document?: Maybe<Document>;
    id: Scalars['Int'];
    signatureUrl?: Maybe<Scalars['String']>;
    status: SignatureStatus;
    type: SignatureType;
    updatedAt: Scalars['DateTime'];
};

export type SignatureAnchor = {
    height: Scalars['Int'];
    id: Scalars['Int'];
    left: Scalars['Int'];
    scale: Scalars['Int'];
    top: Scalars['Int'];
    width: Scalars['Int'];
    winHeight: Scalars['Int'];
    winWidth: Scalars['Int'];
};

export enum SignatureStatus {
    Complete = 'COMPLETE',
    Pending = 'PENDING'
}

export enum SignatureType {
    Initials = 'INITIALS',
    Signature = 'SIGNATURE'
}

export type User = {
    __typename?: 'User';
    Company?: Maybe<Company>;
    customers?: Maybe<Array<Customer>>;
    email: Scalars['String'];
    id: Scalars['Int'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Company: ResolverTypeWrapper<Company>;
    Customer: ResolverTypeWrapper<Customer>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    Document: ResolverTypeWrapper<Document>;
    Estimate: ResolverTypeWrapper<Estimate>;
    EstimateField: ResolverTypeWrapper<EstimateField>;
    EstimateStatus: EstimateStatus;
    Export: ResolverTypeWrapper<Export>;
    ExportStatus: ExportStatus;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Invoice: ResolverTypeWrapper<Invoice>;
    InvoiceExport: ResolverTypeWrapper<InvoiceExport>;
    InvoiceField: ResolverTypeWrapper<InvoiceField>;
    InvoiceStatus: InvoiceStatus;
    LegalForm: LegalForm;
    Query: ResolverTypeWrapper<{}>;
    Signature: ResolverTypeWrapper<Signature>;
    SignatureAnchor: never;
    SignatureStatus: SignatureStatus;
    SignatureType: SignatureType;
    String: ResolverTypeWrapper<Scalars['String']>;
    User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
    Boolean: Scalars['Boolean'];
    Company: Company;
    Customer: Customer;
    DateTime: Scalars['DateTime'];
    Document: Document;
    Estimate: Estimate;
    EstimateField: EstimateField;
    Export: Export;
    Float: Scalars['Float'];
    Int: Scalars['Int'];
    Invoice: Invoice;
    InvoiceExport: InvoiceExport;
    InvoiceField: InvoiceField;
    Query: {};
    Signature: Signature;
    SignatureAnchor: never;
    String: Scalars['String'];
    User: User;
}>;

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = ResolversObject<{
    address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    ape?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    industry?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    legalform?: Resolver<ResolversTypes['LegalForm'], ParentType, ContextType>;
    legalname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    logo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    siret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    taxid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    website?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    zip?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = ResolversObject<{
    company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = ResolversObject<{
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    signatures?: Resolver<Maybe<Array<ResolversTypes['Signature']>>, ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EstimateResolvers<ContextType = any, ParentType extends ResolversParentTypes['Estimate'] = ResolversParentTypes['Estimate']> = ResolversObject<{
    billingAddress?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
    date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    dueDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    globalDiscount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    items?: Resolver<Array<ResolversTypes['EstimateField']>, ParentType, ContextType>;
    notes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    shippingAddress?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['EstimateStatus'], ParentType, ContextType>;
    tax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    terms?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EstimateFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['EstimateField'] = ResolversParentTypes['EstimateField']> = ResolversObject<{
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    discount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    estimate?: Resolver<ResolversTypes['Estimate'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    tax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    unitPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExportResolvers<ContextType = any, ParentType extends ResolversParentTypes['Export'] = ResolversParentTypes['Export']> = ResolversObject<{
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    document?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType>;
    doneAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    errorAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    processedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['ExportStatus'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = ResolversObject<{
    billingAddress?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    customer?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
    date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    dueDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    exports?: Resolver<Maybe<Array<ResolversTypes['InvoiceExport']>>, ParentType, ContextType>;
    globalDiscount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    items?: Resolver<Array<ResolversTypes['InvoiceField']>, ParentType, ContextType>;
    notes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    shippingAddress?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['InvoiceStatus'], ParentType, ContextType>;
    tax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    terms?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceExportResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceExport'] = ResolversParentTypes['InvoiceExport']> = ResolversObject<{
    export?: Resolver<Maybe<ResolversTypes['Export']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    invoice?: Resolver<Maybe<ResolversTypes['Invoice']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceField'] = ResolversParentTypes['InvoiceField']> = ResolversObject<{
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    discount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    invoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType>;
    quantity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    tax?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    unitPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
    customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
    document?: Resolver<ResolversTypes['Document'], ParentType, ContextType, RequireFields<QueryDocumentArgs, 'id'>>;
    documents?: Resolver<Array<ResolversTypes['Document']>, ParentType, ContextType>;
    estimate?: Resolver<ResolversTypes['Estimate'], ParentType, ContextType, RequireFields<QueryEstimateArgs, 'id'>>;
    estimates?: Resolver<Array<ResolversTypes['Estimate']>, ParentType, ContextType>;
    export?: Resolver<ResolversTypes['Export'], ParentType, ContextType, RequireFields<QueryExportArgs, 'id'>>;
    exports?: Resolver<Array<ResolversTypes['Export']>, ParentType, ContextType>;
    invoice?: Resolver<ResolversTypes['Invoice'], ParentType, ContextType, RequireFields<QueryInvoiceArgs, 'id'>>;
    invoices?: Resolver<Array<ResolversTypes['Invoice']>, ParentType, ContextType>;
    user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
    users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type SignatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Signature'] = ResolversParentTypes['Signature']> = ResolversObject<{
    anchors?: Resolver<Maybe<ResolversTypes['SignatureAnchor']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    document?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    signatureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['SignatureStatus'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['SignatureType'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignatureAnchorResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignatureAnchor'] = ResolversParentTypes['SignatureAnchor']> = ResolversObject<{
    __resolveType: TypeResolveFn<null, ParentType, ContextType>;
    height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    left?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    scale?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    top?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    winHeight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    winWidth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
    Company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
    customers?: Resolver<Maybe<Array<ResolversTypes['Customer']>>, ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
    Company?: CompanyResolvers<ContextType>;
    Customer?: CustomerResolvers<ContextType>;
    DateTime?: GraphQLScalarType;
    Document?: DocumentResolvers<ContextType>;
    Estimate?: EstimateResolvers<ContextType>;
    EstimateField?: EstimateFieldResolvers<ContextType>;
    Export?: ExportResolvers<ContextType>;
    Invoice?: InvoiceResolvers<ContextType>;
    InvoiceExport?: InvoiceExportResolvers<ContextType>;
    InvoiceField?: InvoiceFieldResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Signature?: SignatureResolvers<ContextType>;
    SignatureAnchor?: SignatureAnchorResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
}>;


export type BuilderInputEntity = keyof ResolversParentTypes;

export type BuilderInputEntityProperties<T> = keyof ResolversParentTypes[T extends BuilderInputEntity ? T : never];

declare function createBuilderInput<T extends BuilderInputEntity, K extends BuilderInputEntityProperties<T>[]>(entity: T, properties: K):
    Pick<ResolversParentTypes[T], K[number]>;
