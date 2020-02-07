export declare type SprRoute = {
    initialRevalidateSeconds: number | false;
    srcRoute: string | null;
    dataRoute: string;
};
export declare type DynamicSprRoute = {
    routeRegex: string;
    dataRoute: string;
    dataRouteRegex: string;
};
export declare type PrerenderManifest = {
    version: number;
    routes: {
        [route: string]: SprRoute;
    };
    dynamicRoutes: {
        [route: string]: DynamicSprRoute;
    };
};
export default function build(dir: string, conf?: null): Promise<void>;
