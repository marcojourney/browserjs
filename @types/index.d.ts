import { BuiltinComponents } from "../src";

declare module "fingerlockjs" {
    export function getAttributes(): Promise<BuiltinComponents>;
}