import React, {FC} from 'react';

export interface SectionTitleProps {
    caption: string;
    slickClass?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({caption, slickClass}) => {
    return (
        <>
            {/* <!-- section title --> */}
            <div className="section-title">
                <h2 className="title">{caption}</h2>
                {slickClass &&
                    <div className="pull-right">
                        <div className={`${slickClass} custom-dots`}></div>
                    </div>
                }
            </div>
            {/* <!-- section title --> */}
        </>
    );
};

export {SectionTitle}