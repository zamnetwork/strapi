import type { errors } from '@strapi/utils';
import type { SanitizedAdminUser, Permission } from './shared';

/**
 * GET /users/me - Log in as an admin user
 */
export declare namespace GetMe {
  export interface Request {
    query: {};
    body: {};
  }

  export interface Response {
    data: SanitizedAdminUser;
    error?: errors.ApplicationError;
  }
}

/**
 * PUT /users/me - Update the current admin user
 */
export declare namespace UpdateMe {
  export interface BaseRequestBody {
    email?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    bio?: string;
    gravatar?: string;
    twitter?: string;
    displayname?: string;
    preferedLanguage?: string;
  }

  export interface PasswordRequestBody extends BaseRequestBody {
    currentPassword: string;
    password: string;
  }

  export interface Request {
    query: {};
    body: BaseRequestBody | PasswordRequestBody;
  }

  export interface Response {
    data: SanitizedAdminUser;
    error?: errors.ApplicationError | errors.ValidationError | errors.YupValidationError;
  }
}

/**
 * GET /users/me/permissions - Get the permissions of the current admin user
 */
export declare namespace GetOwnPermissions {
  export interface Request {
    query: {};
    body: {};
  }

  export interface Response {
    data: Permission[];
    error?: errors.ApplicationError;
  }
}
