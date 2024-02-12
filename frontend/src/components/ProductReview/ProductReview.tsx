import React, {
  ForwardedRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
  useEffect,
  useState
} from "react";

import { useAppDispatch, useAppSelector, useAuth } from "../../hooks";
import { ProductType, ReviewPostType, ReviewQueryType } from "../../interface";
import { Pagination, PrimaryButton, StarsRating } from "..";
import { useSearchParams } from "react-router-dom";
import { reviewsActions } from "../../redux";
import { getErrorMessage } from "../../utils";

interface ProductReviewPropsType {
  product: ProductType;
  onTotal: (total: number) => void;
}

export type Ref = HTMLFormElement;

const ProductReview: ForwardRefExoticComponent<PropsWithoutRef<ProductReviewPropsType> & RefAttributes<Ref>> =
  React.forwardRef<Ref, ProductReviewPropsType>(
    ({ product, onTotal }, ref: ForwardedRef<HTMLFormElement>
    ) => {
      const dispatch = useAppDispatch();
      const { i18n } = useAppSelector(state => state.i18nReducer);
      const { reviews, error } = useAppSelector(state => state.reviewsReducer);
      const [params, setParams] = useSearchParams({});
      const [userRating, setUserRating] = useState<number>(5);
      const [disabled, setDisabled] = useState<boolean>(true);
      const { ctx } = useAuth();

      const loadReviews = useCallback((nextPage: number) => {
        const queryParams: ReviewQueryType = {
          product: product.uid,
          page: nextPage
        };

        dispatch(reviewsActions.loadReviews(queryParams));
      }, [dispatch, product.uid]);

      useEffect(() => {
        loadReviews(Number(params.get("page") || "1"));
      }, [loadReviews, params]);

      useEffect(() => {
        if (!reviews) return;
        const nextPage = Number(params.get("page") || "1");
        if (nextPage !== reviews.meta.page) {
          setParams(prevState => {
            prevState.set("page", String(reviews.meta.page));
            return prevState;
          });
        }
      }, [setParams, params, reviews]);

      useEffect(() => {
        reviews && onTotal(reviews.meta.itemCount);
      }, [onTotal, reviews]);

      const onFormValidate = (event: React.FormEvent<HTMLFormElement>) => {

        const tagName = (event.target as HTMLElement).tagName;
        if (tagName !== "INPUT" && tagName !== "TEXTAREA") return;

        const el = (tagName === "INPUT") ?
          event.target as HTMLInputElement : event.target as HTMLTextAreaElement;

        if (el.validity.typeMismatch && el.type === "email") {
          el.setCustomValidity(i18n.value.FORM_EMAIL_MISMATCH);
          setDisabled(true);
        } else if (el.validity.valueMissing) {
          el.setCustomValidity(i18n.value.FORM_VALUE_MISSING);
          setDisabled(true);
        } else {
          el.setCustomValidity("");
          setDisabled(false);
        }

      };

      const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const review: ReviewPostType = {
          product: product.uid,
          // author: (form.elements.namedItem("author") as HTMLInputElement).value,
          // email: (form.elements.namedItem("email") as HTMLInputElement).value,
          text: (form.elements.namedItem("text") as HTMLTextAreaElement).value,
          rating: userRating
        };

        form.reset();
        setUserRating(5);

        const params: ReviewQueryType = {
          product: product.uid,
          page: 1
        };

        dispatch(reviewsActions.postReview({ review, params, token: ctx.token }));
      };

      return (
        <div className="row">
          <div className="col-md-6">
            <div className="product-reviews">
              {reviews?.data.map(review => {
                const time = new Date(review.createdAt).toLocaleString().slice(0, -3);
                return (
                  <div key={review.uid} className="single-review">
                    <div className="review-heading">
                      <div><span><i className="fa fa-user-o"></i> {review.author}</span></div>
                      <div><span><i className="fa fa-clock-o"></i> {time}</span></div>
                      <div className="review-rating pull-right">
                        <StarsRating value={review.rating} showValue={true} />
                      </div>
                    </div>
                    <div className="review-body">
                      <p>{review.text}</p>
                    </div>
                  </div>
                );
              })}
              <ul className="reviews-pages">
                <Pagination linkCount={3}
                            startPage={Number(params.get("page") || "1")}
                            pageCount={reviews?.meta.pageCount || 1}
                            onChange={loadReviews}
                />
              </ul>
            </div>
          </div>
          {ctx.token && <div className="col-md-6">
            <h4 className="text-uppercase">{i18n.value.WRITE_YOUR_REVIEW}</h4>
            {/*<p>{i18n.value.EMAIL_NOT_PUBLISHED}</p>*/}
            <form className="review-form" ref={ref}
                  onChange={onFormValidate}
                  onInvalid={onFormValidate}
                  onSubmit={onFormSubmit}
            >
              {/*
              <div className="form-group">
                <input className="input" type="text" required={true} name={"author"}
                       placeholder={i18n.value.YOUR_NAME} />
              </div>
              <div className="form-group">
                <input className="input" type="email" required={true} name={"email"}
                       placeholder={i18n.value.EMAIL_ADDRESS} />
              </div>
*/}
              <div className="form-group">
                            <textarea className="input" required={true} name={"text"}
                                      placeholder={i18n.value.YOUR_REVIEW}></textarea>
              </div>
              <div className="form-group">
                <div className="input-rating">
                  <strong
                    className="text-uppercase">{i18n.value.YOUR_RATING}: </strong>
                  <div className="stars">
                    <StarsRating readonly={false}
                                 showValue={true}
                                 style={{ fontSize: "1.1em" }}
                                 value={userRating}
                                 onChange={setUserRating}
                    />
                  </div>
                </div>
              </div>
              {error &&
                <div className="form-group">
                  <span className="primary-color">{i18n.value.ERROR + ": " + getErrorMessage(i18n, error)}</span>
                </div>}
              <div className="form-group">
                <PrimaryButton disabled={disabled}>{i18n.value.SUBMIT}</PrimaryButton>
              </div>
            </form>
          </div>}
        </div>
      );
    });

export { ProductReview };
