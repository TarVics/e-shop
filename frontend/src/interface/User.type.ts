import { ApiRef } from "./Common.type";

export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserChangePasswordType {
  oldPassword: string;
  newPassword: string;
}

export interface UserChangePasswordFormType extends UserChangePasswordType {
  newPasswordConfirm: string;
}

export interface UserRecoverPasswordType {
  email: string;
}

export interface UserRegisterType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserRegisterFormType extends UserRegisterType {
  passwordConfirm: string;
}

export interface UserReLoginFormType extends UserLoginType {
  passwordConfirm: string;
}

export interface UserType {
  email: string;
  firstName: string;
  lastName: string;
  address: string/* | null*/;
  city: string/* | null*/;
  zipCode: string | null;
  tel: string;
  country: string | null;
  shippingMethodId: ApiRef;
  paymentMethodId: ApiRef;
}

// export interface UserType extends ApiObject {
//   firstName: string;
//   lastName: string;
//   email: string;
//   address: string | null;
//   city: string | null;
//   zipCode: string | null;
//   tel: string;
//   country: string | null;
//   shipping: ShippingMethodEnum;
//   payments: PaymentMethodEnum;
// }
//
// export interface UserLoginProps extends ApiObjectPost<UserType> {
//   passwordConfirm: string;
//   register: boolean;
// }
