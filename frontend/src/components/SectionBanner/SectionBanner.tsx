import React from "react";

export interface ISectionBannerProps {
  centered?: boolean;
  children?: React.ReactNode;
  className?: string;
  image: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SectionBanner: React.FC<ISectionBannerProps> = (
  {
    centered,
    children,
    className,
    image,
    onClick
  }
) => {
  return (
    <>
      {/* <!-- banner --> */}
      <div
        className={className ? "banner " + className : "banner"}
        role={onClick ? "button" : "none"}
        onClick={onClick}
      >
        <img src={image} alt="" />
        <div className={centered ? "banner-caption text-center" : "banner-caption"}>
          {children}
        </div>
      </div>
      {/* <!-- /banner --> */}
    </>
  );
};

export { SectionBanner };