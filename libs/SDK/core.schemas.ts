/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * NestJS API
 * desc
 * OpenAPI spec version: 1.0
 */
export interface UpdateProjectDto {
  id?: number;
  title?: string;
  description?: string;
  customer?: Customer;
  invoices?: Invoice[];
  estimates?: Estimate[];
  user?: User;
}

export type ExpenseCategory =
  typeof ExpenseCategory[keyof typeof ExpenseCategory];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ExpenseCategory = {
  travel: "travel",
  food: "food",
  materials: "materials",
  other: "other",
} as const;

export interface Expense {
  id: number;
  date: Date;
  amount: number;
  customer: Customer;
  user: User;
  invoice: Invoice;
  category: ExpenseCategory;
}

export interface CreateExpenseDto {
  id: number;
  date: Date;
  amount: number;
  customer: Customer;
  user: User;
  invoice: Invoice;
  category: ExpenseCategory;
}

export interface UpdatePaymentDto {
  id?: number;
  user?: User;
  invoices?: Invoice[];
  amount?: number;
  date?: Date;
  notes?: string;
  paymentMethod?: PaymentMethod;
}

export interface CreatePaymentDto {
  id: number;
  user: User;
  invoices: Invoice[];
  amount: number;
  date: Date;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface InvoiceField {
  id: number;
  invoice: Invoice;
  title: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
}

export interface CreateInvoiceDto {
  id: number;
  customer: Customer;
  billingAddress: Company;
  shippingAddress: Company;
  items: InvoiceField[];
  payment: Payment;
  title: string;
  description: string;
  date: Date;
  dueDate: Date;
  terms: string;
  notes: string;
  tax: number;
  globalDiscount: number;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
  status: InvoiceStatus;
  exports: InvoiceExport[];
}

export type ExportDocument = Document | null;

export interface Export {
  readonly id: number;
  /** The status of the export */
  readonly status: ExportStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly processedAt: Date;
  readonly errorAt: Date;
  readonly doneAt: Date;
  readonly document: ExportDocument;
}

export interface InvoiceExport {
  id: number;
  invoice: Invoice;
  export: Export;
}

export interface UpdateInvoiceDto {
  id?: number;
  customer?: Customer;
  billingAddress?: Company;
  shippingAddress?: Company;
  items?: InvoiceField[];
  payment?: Payment;
  title?: string;
  description?: string;
  date?: Date;
  dueDate?: Date;
  terms?: string;
  notes?: string;
  tax?: number;
  globalDiscount?: number;
  owner?: User;
  createdAt?: Date;
  updatedAt?: Date;
  status?: InvoiceStatus;
  exports?: InvoiceExport[];
}

export interface Invoice {
  id: number;
  customer: Customer;
  billingAddress: Company;
  shippingAddress: Company;
  items: InvoiceField[];
  payment: Payment;
  title: string;
  description: string;
  date: Date;
  dueDate: Date;
  terms: string;
  notes: string;
  tax: number;
  globalDiscount: number;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
  status: InvoiceStatus;
  exports: InvoiceExport[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  customer: Customer;
  invoices: Invoice[];
  estimates: Estimate[];
  user: User;
}

export interface CreateProjectDto {
  id: number;
  title: string;
  description: string;
  customer: Customer;
  invoices: Invoice[];
  estimates: Estimate[];
  user: User;
}

export interface UpdateExpenseDto {
  id?: number;
  date?: Date;
  amount?: number;
  customer?: Customer;
  user?: User;
  invoice?: Invoice;
  category?: ExpenseCategory;
}

export type SignatureDocument = Document | null;

export type SignatureType = typeof SignatureType[keyof typeof SignatureType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SignatureType = {
  SIGNATURE: "SIGNATURE",
  INITIALS: "INITIALS",
} as const;

export type SignatureStatus =
  typeof SignatureStatus[keyof typeof SignatureStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SignatureStatus = {
  PENDING: "PENDING",
  COMPLETE: "COMPLETE",
} as const;

export interface SignatureAnchor {
  top: number;
  left: number;
  width: number;
  height: number;
  winWidth: number;
  winHeight: number;
  scale: number;
  id: string;
}

export interface Signature {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly anchors: SignatureAnchor;
  readonly signatureUrl: string | null;
  /** The status of the signature */
  readonly status: SignatureStatus;
  /** The type of the signature */
  readonly type: SignatureType;
  readonly document: SignatureDocument;
}

export interface Document {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly url: string;
  readonly signatures: Signature[] | null;
}

export type ExportStatus = typeof ExportStatus[keyof typeof ExportStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ExportStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  DONE: "DONE",
  ERROR: "ERROR",
} as const;

export type InvoiceStatus = typeof InvoiceStatus[keyof typeof InvoiceStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const InvoiceStatus = {
  draft: "draft",
  sent: "sent",
  accepted: "accepted",
  declined: "declined",
  cancelled: "cancelled",
  changes_requested: "changes_requested",
  expired: "expired",
} as const;

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PaymentMethod = {
  cash: "cash",
  check: "check",
  card: "card",
  bank_transfer: "bank_transfer",
  other: "other",
} as const;

export interface Payment {
  id: number;
  user: User;
  invoices: Invoice[];
  amount: number;
  date: Date;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface UpdateCompanyDto {
  id?: number;
  legalname?: string;
  taxid?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  siret?: string;
  ape?: string;
  legalform?: LegalForm;
  website?: string;
  logo?: string;
  description?: string;
  industry?: string;
}

export interface CreateCompanyDto {
  id: number;
  legalname: string;
  taxid: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  siret: string;
  ape: string;
  legalform: LegalForm;
  website: string;
  logo: string;
  description: string;
  industry: string;
}

export type EstimateStatus = typeof EstimateStatus[keyof typeof EstimateStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EstimateStatus = {
  draft: "draft",
  sent: "sent",
  accepted: "accepted",
  declined: "declined",
  cancelled: "cancelled",
  changes_requested: "changes_requested",
  expired: "expired",
} as const;

export interface Estimate {
  id: number;
  customer: Customer;
  billingAddress: Company;
  shippingAddress: Company;
  items: EstimateField[];
  title: string;
  description: string;
  date: Date;
  dueDate: Date;
  terms: string;
  notes: string;
  tax: number;
  globalDiscount: number;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
  status: EstimateStatus;
}

export interface EstimateField {
  id: number;
  estimate: Estimate;
  title: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
}

export interface UpdateEstimateDto {
  id?: number;
  customer?: Customer;
  billingAddress?: Company;
  shippingAddress?: Company;
  items?: EstimateField[];
  title?: string;
  description?: string;
  date?: Date;
  dueDate?: Date;
  terms?: string;
  notes?: string;
  tax?: number;
  globalDiscount?: number;
  owner?: User;
  createdAt?: Date;
  updatedAt?: Date;
  status?: EstimateStatus;
}

export interface ChangePasswordDTO {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface LoginDTO {
  email?: string;
  password?: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
}

export type UpdateCustomerDtoCompany = Company | null;

export interface UpdateCustomerDto {
  readonly id?: number;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  company?: UpdateCustomerDtoCompany;
}

export interface Customer {
  readonly id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  company: CustomerCompany;
}

export interface CreateCustomerDto {
  readonly id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  company: CreateCustomerDtoCompany;
}

export type LegalForm = typeof LegalForm[keyof typeof LegalForm];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LegalForm = {
  AE: "AE",
  SARL: "SARL",
  SAS: "SAS",
  SASU: "SASU",
  EURL: "EURL",
  EI: "EI",
  EIRL: "EIRL",
} as const;

export interface Company {
  id: number;
  legalname: string;
  taxid: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  siret: string;
  ape: string;
  legalform: LegalForm;
  website: string;
  logo: string;
  description: string;
  industry: string;
}

export interface CreateEstimateDto {
  id: number;
  customer: Customer;
  billingAddress: Company;
  shippingAddress: Company;
  items: EstimateField[];
  title: string;
  description: string;
  date: Date;
  dueDate: Date;
  terms: string;
  notes: string;
  tax: number;
  globalDiscount: number;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
  status: EstimateStatus;
}

export type CustomerCompany = Company | null;

export type CreateCustomerDtoCompany = Company | null;

export interface DeleteResult {
  [key: string]: any;
}

export interface UpdateUserDto {
  [key: string]: any;
}

export interface User {
  id: number;
  email: string;
  password: string;
  Company: number;
  customers: string[];
}

export interface CreateUserDto {
  id: number;
  email: string;
  password: string;
  Company: number;
  customers: string[];
}
