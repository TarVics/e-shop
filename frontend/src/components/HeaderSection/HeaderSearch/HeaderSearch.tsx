import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import { uriService } from "../../../services";
import { useAppSelector, useRefs } from "../../../hooks";
import { toApiKey } from "../../../interface";

const HeaderSearch: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useAppSelector(state => state.i18nReducer);
  const { api, refs } = useRefs();
  const [searchCategory, setSearchCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const selectValues = [<option key={"all"} value={""}>{i18n.value.ALL_CATEGORIES}</option>];

  refs.categories.forEach(rootCat => {
    if (!rootCat.children?.length) {
      selectValues.push(
        <optgroup key={rootCat.id} label={rootCat.name}>
          <option key={rootCat.id} value={rootCat.id}>{rootCat.name}</option>
        </optgroup>
      );
      return;
    }

    rootCat.children.forEach(subCat => {
      const res: ReactNode[] = [];

      if (subCat.children.length) {
        subCat.children.forEach(cat => {
          res.push(<option key={cat.id} value={cat.id}>{cat.name}</option>);
        });
      } else {
        res.push(<option key={subCat.id} value={subCat.id}>{subCat.name}</option>);
      }

      selectValues.push(
        <optgroup key={subCat.id} label={[rootCat.name, subCat.name].join(" / ")}>
          {res}
        </optgroup>
      );
    });
  });

  const onInput = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchText(e.currentTarget.value);
  };

  const onSelect = (e: React.FormEvent<HTMLSelectElement>): void => {
    setSearchCategory(e.currentTarget.value);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    /*searchCategory && */navigate(uriService.uriProductsSearch(searchCategory, searchText));
    e.preventDefault();
  };

  return (
    <>
      {/* <!-- Search --> */}
      <div className="header-search">
        <form>
          <select className="input search-categories" onChange={onSelect}
                  title={searchCategory ? api.getCategoryById(toApiKey(searchCategory))?.name : ""}>
            {selectValues}
          </select>
          <input
            type="text"
            className="input search-input"
            placeholder={i18n.value.KEYWORD_PLACEHOLDER}
            onInput={onInput}
          />
          <button
            disabled={searchText === ""}
            className="search-btn"
            onClick={onClick}
            style={{ opacity: searchText ? 1 : 0.5 }}
          ><i className="fa fa-search"></i></button>
        </form>
      </div>
      {/* <!-- /Search --> */}
    </>
  );
};

export { HeaderSearch };
