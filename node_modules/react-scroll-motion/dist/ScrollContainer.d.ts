import React from "react";
interface IProps {
    children: React.ReactNodeArray;
    scrollParent: Window | HTMLElement;
}
declare const ScrollAnimatorContainer: ({ children, scrollParent }: IProps) => JSX.Element;
export default ScrollAnimatorContainer;
