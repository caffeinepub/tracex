import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Location {
    lat: number;
    lng: number;
    timestamp: bigint;
    locationLabel: string;
}
export interface backendInterface {
    deleteLocation(phone: string): Promise<void>;
    getLocation(phone: string): Promise<Location | null>;
    listLocations(): Promise<Array<Location>>;
    listLocationsByLat(): Promise<Array<Location>>;
    listLocationsByLng(): Promise<Array<Location>>;
    listLocationsSortByTimestamp(): Promise<Array<Location>>;
    shareLocation(phone: string, lat: number, lng: number, locationLabel: string): Promise<void>;
}
