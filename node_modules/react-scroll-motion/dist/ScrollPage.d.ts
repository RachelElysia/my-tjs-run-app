import React from "react";
interface IProps {
    children: React.ReactNode;
    page: number;
    debugBorder: boolean;
}
declare const ScrollPage: ({ children, page, debugBorder }: IProps) => JSX.Element;
export default ScrollPage;
