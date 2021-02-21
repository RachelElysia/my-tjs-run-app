/// <reference types="react" />
declare type ScrollContainerContextType = {
    currentY?: number;
    viewportHeight?: number;
    totalPage?: number;
    totalHeight?: number;
    totalProgress?: number;
    realPage?: number;
    currentPage?: number;
    currentProgress?: number;
};
declare type ScrollPageContextType = {
    page: number;
};
export declare const ScrollContainerContext: import("react").Context<ScrollContainerContextType>;
export declare const ScrollPageContext: import("react").Context<ScrollPageContextType>;
export {};
