import React, {FC, MouseEvent, useEffect, useState} from 'react';

export interface PaginationProps {
    linkCount: number;
    pageCount: number;
    startPage?: number;
    onChange: (page: number) => void;
}

type PageInfoType = {
    offset: number;
    page: number;
}

const defaultPageInfo: PageInfoType = {
    offset: 0,
    page: 0,
}

const Pagination: FC<PaginationProps> = ({linkCount, pageCount, onChange, startPage}) => {
    const [pageInfo, setPageInfo] = useState<PageInfoType>(defaultPageInfo);

    useEffect(() => {
        const page = (startPage || 1) - 1;
        const offset = Math.min(Math.trunc(page / linkCount) * linkCount, pageCount - linkCount);
        setPageInfo(prevState => ({
            ...prevState,
            page,
            offset,
        }));
    }, [pageCount, linkCount, startPage]);

    const onPageClick = (e: MouseEvent<HTMLAnchorElement>, page: number) => {
        // Backward
        if (page === -1) {
            if (pageInfo.page > 0) {
                const page = pageInfo.page - 1;
                const offset = (page < pageInfo.offset) ?
                    Math.max(0, pageInfo.offset - linkCount) : pageInfo.offset;

                setPageInfo(prevState => ({
                    ...prevState,
                    page,
                    offset
                }));

                onChange(page + 1);
            }
        } else
            // Forward
        if (page === 0) {
            if (pageInfo.page < pageCount) {
                const page = pageInfo.page + 1;
                const offset = (page - pageInfo.offset >= linkCount) ?
                    Math.min(page, pageCount - linkCount) : pageInfo.offset;

                setPageInfo(prevState => ({
                    ...prevState,
                    page,
                    offset
                }));
                onChange(page + 1);
            }
        } else if (pageInfo.page !== page) {
            setPageInfo(prevState => ({
                ...prevState,
                page
            }));
            onChange(page + 1);
        }
        e.preventDefault()
    }

    const pages: Array<JSX.Element> = []
    const pageStart = pageInfo.offset;
    const pageStop = Math.min(pageCount, pageInfo.offset + linkCount);

    for (let i = pageStart; i < pageStop; i++) {
        pages.push(
            <li key={i} className={(pageInfo.page === i) ? "active" : ""}>
                <a href="." onClick={e => onPageClick(e, i)}>{i + 1}</a>
            </li>
        )
    }

    return (
        <ul className="store-pages">
            <li><span className="text-uppercase">Page:</span></li>
            {pageInfo.offset > 0 ?
                <li>
                    <a href="." onClick={e => onPageClick(e, -1)}><i className="fa fa-caret-left"></i></a>
                </li> : null
            }
            {pages}
            {pageInfo.offset + linkCount < pageCount ?
                <li>
                    <a href="." onClick={e => onPageClick(e, 0)}><i className="fa fa-caret-right"></i></a>
                </li> : null
            }
        </ul>
    );
};

export {Pagination}