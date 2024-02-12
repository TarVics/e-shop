import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { Link, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";

import { UserType } from "../../interface";
import { uriService } from "../../services";
import { useAppSelector, useAuth, useRefs } from "../../hooks";
import { userValidator } from "../../validators";
import { FieldErrorMessage, OrderSummary, PrimaryButton } from "..";
import { getErrorMessage } from "../../utils";
import { PaymentMethodEnum, ShippingMethodEnum } from "../../enum";

interface UserFormPropsType {
  error?: object,
  makeOrder?: boolean;
  onSubmit: SubmitHandler<UserType>;
}

const UserForm: React.FC<UserFormPropsType> = (
  {
    error,
    makeOrder,
    onSubmit
  }
) => {
  const location = useLocation();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const {
    cart,
    error: cartError
  } = useAppSelector(state => state.cartsReducer);
  const { refs, api } = useRefs();
  const {
    ctx: { user, error: userError },
    api: { loadProfile }
  } = useAuth();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    formState: {
      errors,
      isValid
    },
    setValue
  } = useForm<UserType>({
    resolver: joiResolver(userValidator),
    mode: "all",
    defaultValues: {
      "shippingMethodId": api.getShippingMethodByValue(
        ShippingMethodEnum.FreeShipping
      )?.id as number,
      "paymentMethodId": api.getPaymentMethodByValue(
        PaymentMethodEnum.BankTransfer
      )?.id as number
    }
  });

  useEffect(() => {
    loadProfile().then();
  }, [loadProfile]);

  React.useEffect(() => {
    if (!makeOrder && formState.isSubmitSuccessful) {
      reset(undefined, { keepDirtyValues: true });
    }
  }, [formState, reset, makeOrder]);

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("address", user.address);
      setValue("country", user.country);
      setValue("city", user.city);
      setValue("zipCode", user.zipCode);
      setValue("tel", user.tel);
      setValue("shippingMethodId", user.shippingMethodId);
      setValue("paymentMethodId", user.paymentMethodId);

      // setValue("register", false);
      // setValue("password", "");
      // setValue("passwordConfirm", "");
    }
  }, [setValue, user, api]);

  return (
    <form id="checkout-form" className="clearfix" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6">
        <div className="billing-details">
          {!user && makeOrder ?
            <p>
              {i18n.value.ALREADY_CUSTOMER_QUESTION}&nbsp;
              <Link to={uriService.uriLogin()} state={location}>{i18n.value.LOGIN}</Link>
            </p> : null
          }
          <div className="section-title">
            <h3 className="title">{i18n.value[makeOrder ? "BILLING_DETAILS" : "USER_DETAILS"]}</h3>
          </div>
          {/*<div className="form-group">*/}
          {/*  <input className="input" type="text"*/}
          {/*         readOnly={!!user}*/}
          {/*         placeholder={i18n.value.FORM_FIRST_NAME}*/}
          {/*         {...register("firstName")}*/}
          {/*  />*/}
          {/*  <FieldErrorMessage error={errors["firstName"]} />*/}
          {/*</div>*/}
          <div className="form-group">
            <input className="input" type="text"
                   readOnly={!!user}
                   placeholder={i18n.value.FORM_LAST_NAME}
                   {...register("lastName")}
            />
            <FieldErrorMessage error={errors["lastName"]} />
          </div>
          <div className="form-group">
            <input className="input" type="email"
                   readOnly={!!user}
                   placeholder={i18n.value.FORM_EMAIL}
                   {...register("email")}
            />
            <FieldErrorMessage error={errors["email"]} />
          </div>
          <div className="form-group">
            <input className="input" type="text"
                   placeholder={i18n.value.FORM_ADDRESS}
                   {...register("address")}
            />
            <FieldErrorMessage error={errors["address"]} />
          </div>
          <div className="form-group">
            <input className="input" type="text"
                   placeholder={i18n.value.FORM_CITY}
                   {...register("city")}
            />
            <FieldErrorMessage error={errors["city"]} />
          </div>
          <div className="form-group">
            <input className="input" type="text"
                   placeholder={i18n.value.FORM_COUNTRY}
                   {...register("country")}
            />
            <FieldErrorMessage error={errors["country"]} />
          </div>
          <div className="form-group">
            <input className="input" type="text"
                   placeholder={i18n.value.FORM_ZIP_CODE}
                   {...register("zipCode")}
            />
            <FieldErrorMessage error={errors["zipCode"]} />
          </div>
          <div className="form-group">
            <input className="input" type="tel"
                   placeholder={i18n.value.FORM_TELEPHONE}
                   {...register("tel")}
            />
            <FieldErrorMessage error={errors["tel"]} />
          </div>
          {/*{!makeOrder || !user ?*/}
          {/*  <div className="form-group">*/}
          {/*    <div className="input-checkbox">*/}
          {/*      <input type="checkbox" id="register"*/}
          {/*             {...register("register")}*/}
          {/*      />*/}
          {/*      <label className="font-weak form-group" htmlFor="register">*/}
          {/*        {i18n.value[makeOrder ? "NEW_ACCOUNT_QUESTION" : "CHANGE_PASSWORD_QUESTION"]}*/}
          {/*      </label>*/}
          {/*      <div className="caption">*/}
          {/*        {!user ?*/}
          {/*          <p>{i18n.value.ENTER_PASSWORD_INFO}</p> :*/}
          {/*          <p>{i18n.value.RE_ENTER_PASSWORD_INFO}</p>*/}
          {/*        }*/}
          {/*        <div className="form-group">*/}
          {/*          <input className="input" type="password"*/}
          {/*                 readOnly={!!user}*/}
          {/*                 disabled={!!user}*/}
          {/*                 placeholder={i18n.value.ENTER_YOUR_PASSWORD}*/}
          {/*                 {...register("password")}*/}
          {/*          />*/}
          {/*          <FieldErrorMessage error={errors["password"]} />*/}
          {/*        </div>*/}
          {/*        <div className="form-group">*/}
          {/*          <input className="input" type="password"*/}
          {/*                 readOnly={!!user}*/}
          {/*                 disabled={!!user}*/}
          {/*                 placeholder={i18n.value.REENTER_YOUR_PASSWORD}*/}
          {/*                 {...register("passwordConfirm")}*/}
          {/*          />*/}
          {/*          <FieldErrorMessage error={errors["passwordConfirm"]} />*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div> : null*/}
          {/*}*/}

          {user && !makeOrder ?
            <div className="form-group">
              <p>
                <Link to={uriService.uriPassword()}>{i18n.value.CHANGE_PASSWORD_QUESTION}</Link>
              </p>
            </div> : null
          }
        </div>
      </div>

      <div className="col-md-6">
        <div className="shiping-methods">
          <div className="section-title">
            <h4 className="title">{i18n.value.SHIPPING_METHODS}</h4>
          </div>
          {/*{refs.shippingMethods.map(method =>*/}
          {/*  <div className="input-checkbox" key={method.id}>*/}
          {/*    <input id={`shipping-${method.id}`}*/}
          {/*           {...register("shippingMethodId")}*/}
          {/*           type="radio"*/}
          {/*           value={method.id}*/}
          {/*    />*/}
          {/*    <label htmlFor={`shipping-${method.id}`}>*/}
          {/*      {method.name + (method.price ? " - " + getCurrencyText(method.price) : "")}*/}
          {/*    </label>*/}
          {/*    <div className="caption">*/}
          {/*      <p>{method.info}</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
          <Controller
            name={"shippingMethodId"}
            control={control}
            render={
              ({ field: { onChange, onBlur, value, ref } }) =>
                <>
                  {refs.shippingMethods.map(method =>
                    <div className="input-checkbox" key={method.id}>
                      <input
                        id={`shipping-${method.id}`}
                        type="radio"
                        onBlur={onBlur}
                        onChange={() => onChange(method.id)}
                        checked={value === method.id}
                        ref={ref}
                      />
                      <label htmlFor={`shipping-${method.id}`}>
                        {method.name + (method.price ? " - " + api.getCurrencyText(method.price) : "")}
                      </label>
                      <div className="caption">
                        <p>{method.info}</p>
                      </div>
                    </div>
                  )}
                </>
            }
          />
          <FieldErrorMessage error={errors["shippingMethodId"]} />
        </div>

        <div className="payments-methods">
          <div className="section-title">
            <h4 className="title">{i18n.value.PAYMENT_METHODS}</h4>
          </div>
          {/*{refs.paymentMethods.map(method =>*/}
          {/*  <div className="input-checkbox" key={method.id}>*/}
          {/*    <label>*/}
          {/*      <input {...register("paymentMethodId")}*/}
          {/*             type="radio"*/}
          {/*             value={method.id}*/}
          {/*      />*/}
          {/*      {method.name}*/}
          {/*    </label>*/}
          {/*    <div className="caption">*/}
          {/*      <p>{method.info}</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
          <Controller
            name={"paymentMethodId"}
            control={control}
            render={
              ({ field: { onChange, onBlur, value, ref } }) =>
                <>
                  {refs.paymentMethods.map(method =>
                    <div className="input-checkbox" key={method.id}>
                      <input
                        id={`payment-${method.id}`}
                        type="radio"
                        onBlur={onBlur}
                        onChange={() => onChange(method.id)}
                        checked={value === method.id}
                        ref={ref}
                      />
                      <label htmlFor={`payment-${method.id}`}>
                        {method.name}
                      </label>
                      <div className="caption">
                        <p>{method.info}</p>
                      </div>
                    </div>
                  )}
                </>
            }
          />
          <FieldErrorMessage error={errors["paymentMethodId"]} />
        </div>
      </div>

      <div className="col-md-12">
        {makeOrder ?
          <OrderSummary cart={cart}
                        error={userError || cartError || error}
                        makeOrder={true}
                        onClick={() => handleSubmit(onSubmit)}
                        onCheckValid={() => Object.keys(errors).length === 0} /> :
          <div className="form-group">
            {userError &&
              <p className="pull-left">
                <span className="primary-color">{i18n.value.ERROR + ": " + getErrorMessage(i18n, userError)}</span>
              </p>}
            <div className="pull-right">
              <PrimaryButton onClick={() => handleSubmit(onSubmit)} disabled={!isValid}>
                {i18n.value.SUBMIT}
              </PrimaryButton>
            </div>
          </div>
        }
      </div>

    </form>
  );
};

export { UserForm };
