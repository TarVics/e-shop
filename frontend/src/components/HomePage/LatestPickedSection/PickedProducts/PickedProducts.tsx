import React, { FC/*, useEffect*/ } from "react";

import { /*useAppDispatch,*/ useAppSelector, useRefs } from "../../../../hooks";
import { SectionTitle, ProductSingle } from "../../..";
// import { summaryActions } from "../../../../redux";

const PickedProducts: FC = () => {
  // const dispatch = useAppDispatch();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  // const {summary} = useAppSelector(state => state.summaryReducer);
  const { refs: { summary } } = useRefs();

  // useEffect(() => {
  //   !summary && dispatch(summaryActions.loadSummary(i18n.encode));
  // }, [summary, dispatch, i18n.encode]);

  return (
    <>
      {/* <!-- PickedForYou --> */}
      {/* <!-- row --> */}
      <div className="row">
        <div className="col-md-12">
          <SectionTitle caption={i18n.value.PICKED_FOR_YOU} />
        </div>

        {summary?.picked.map(value =>
          <div key={value.uid} className="col-md-3 col-sm-6 col-xs-6">
            <ProductSingle product={value} />
          </div>
        )}
      </div>
      {/* <!-- /row --> */}
      {/* <!-- /PickedForYou --> */}
    </>
  );
};

export { PickedProducts };
