import React from "react";
import { IAnimation } from "./utils/interface";
interface IProp {
    children: React.ReactNode;
    animation: IAnimation;
}
declare const Animator: ({ children, animation }: IProp) => JSX.Element;
export default Animator;
