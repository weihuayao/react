/// <reference types="node" />
declare type TelemetryEvent = {
    eventName: string;
    payload: object;
};
export declare class Telemetry {
    private conf;
    private sessionId;
    private rawProjectId;
    constructor({ distDir }: {
        distDir: string;
    });
    private notify;
    readonly anonymousId: string;
    readonly salt: string;
    private readonly isDisabled;
    setEnabled: (_enabled: boolean) => void;
    readonly isEnabled: boolean;
    oneWayHash: (payload: string | DataView | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | Buffer) => string;
    private readonly projectId;
    record: (_events: TelemetryEvent | TelemetryEvent[]) => Promise<{
        isFulfilled: boolean;
        isRejected: boolean;
        value?: any;
        reason?: any;
    }>;
    private submitRecord;
}
export {};
