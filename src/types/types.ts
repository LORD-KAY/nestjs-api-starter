export interface IResponseStatus {
  message?: string;
  success?: boolean;
  status?: number;
}
export interface IResponse<T> extends IResponseStatus {
  data?: T;
}

export interface IResponseList<T> extends IResponseStatus {
  data?: Array<T>;
}

export interface IAuth {
  access_token: string;
  userType: string;
  [key: string]: string | number;
}

export interface IUser {
  id: string;
  role: IRole;
  username: string;
  email: string;
  mobile: string;
  password?: string;
  userType: string;
  name: string;
  organizationId: string;
  branchId: string;
  sub?: string;
}

export interface IRole {
  id: string;
  name: string;
  slug: string;
  description: string;
}
export type AuthUser = Pick<
  IUser,
  "id" | "username" | "email" | "mobile" | "userType"
> & {
  institution: string;
  deliveryProvider: string;
};

export interface IPaginateObject {
  docs: {}[];
  limit: number;
  total: number;
  page: number;
  pages: number;
}
export interface IMetaData {
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total_count: number;
}
export interface IPagination {
  paginateObj: IPaginateObject;
  meta: IMetaData;
}

export interface IOpeningStock {
  productId: string;
  openingStock: number;
  minimumThreshold: number;
}

export interface IUploadFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
}

export interface INestPaginate {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
