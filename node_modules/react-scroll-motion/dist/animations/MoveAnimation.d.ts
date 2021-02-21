export declare const Move: (dx?: number, dy?: number, outDx?: number | null, outDy?: number | null) => {
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
export declare const MoveIn: (dx?: number, dy?: number) => {
    in: {
        style: {
            transform: (value: number) => string;
        };
    };
};
export declare const MoveOut: (dx?: number, dy?: number) => {
    out: {
        style: {
            transform: (value: number) => string;
        };
    };
};
