import React, {FC, MouseEventHandler, ReactNode} from 'react';

export interface ISectionBannerProps {
    centered?: boolean;
    children?: ReactNode;
    className?: string;
    image: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const SectionBanner: FC<ISectionBannerProps> = ({centered, children, className, image, onClick}) => {
    return (
        <>
            {/* <!-- banner --> */}
            <div
                className={className ? "banner " + className : "banner"}
                role={onClick ? "button" : "none"}
                onClick={onClick}
            >
                <img src={image} alt=""/>
                <div className={centered ? "banner-caption text-center" : "banner-caption"}>
                    {children}
                </div>
            </div>
            {/* <!-- /banner --> */}
        </>
    );
};

export {SectionBanner}