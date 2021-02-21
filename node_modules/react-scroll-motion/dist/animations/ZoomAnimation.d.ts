export declare const Zoom: (from?: number, to?: number) => {
    in: {
        style: {
            transform: (value: number) => string;
        };
    };
    out: {
        style: {
            transform: (value: number) => string;
        };
    };
};
export declare const ZoomIn: (from?: number, to?: number) => {
    in: {
        style: {
            transform: (value: number) => string;
        };
    };
};
export declare const ZoomOut: (from?: number, to?: number) => {
    out: {
        style: {
            transform: (value: number) => string;
        };
    };
};
