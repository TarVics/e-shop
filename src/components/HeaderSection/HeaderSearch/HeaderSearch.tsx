import React, {ReactNode, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {refsService, uriService} from "../../../services";
import {useAppSelector} from "../../../hooks";

const HeaderSearch = () => {
    const navigate = useNavigate();
    const {i18n} = useAppSelector(state => state.i18nReducer);
    const {categories} = useAppSelector(state => state.refsReducer);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchText, setSearchText] = useState('');

    const selectValues = [<option key={'all'} value={''}>{i18n.value.ALL_CATEGORIES}</option>];
    const rootCategories = refsService.getCategoryTree(categories).filter(category => category.parent === null);

    rootCategories.forEach(rootCat => {
        if (!rootCat.childCategories.length) {
            selectValues.push(
                <optgroup key={rootCat.id} label={rootCat.name}>
                    <option key={rootCat.id} value={rootCat.id}>{rootCat.name}</option>
                </optgroup>
            );
            return;
        }

        rootCat.childCategories.forEach(subCat => {
            const res: ReactNode[] = [];

            if (subCat.childCategories.length) {
                subCat.childCategories.forEach(cat => {
                    res.push(<option key={cat.id} value={cat.id}>{cat.name}</option>)
                })
            } else {
                res.push(<option key={subCat.id} value={subCat.id}>{subCat.name}</option>)
            }

            selectValues.push(
                <optgroup key={subCat.id} label={[rootCat.name, subCat.name].join(' / ')}>
                    {res}
                </optgroup>
            );
        })
    })

    const onInput = (e: React.FormEvent<HTMLInputElement>): void => {
        setSearchText(e.currentTarget.value);
    }

    const onSelect = (e: React.FormEvent<HTMLSelectElement>): void => {
        setSearchCategory(e.currentTarget.value);
    }

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        navigate(uriService.uriProductsSearch(searchCategory, searchText));
        e.preventDefault();
    }

    return (
        <>
            {/* <!-- Search --> */}
            <div className="header-search">
                <form>
                    <input
                        type="text"
                        className="input search-input"
                        placeholder="Enter your keyword"
                        onInput={onInput}
                    />
                    <select className="input search-categories" onChange={onSelect}>
                        {selectValues}
                    </select>
                    <button
                        disabled={searchText === ''}
                        className="search-btn"
                        onClick={onClick}
                    ><i className="fa fa-search"></i></button>
                </form>
            </div>
            {/* <!-- /Search --> */}
        </>
    );
};

export {HeaderSearch}