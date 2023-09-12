import { BuiltinComponents } from "../src";

declare module "browserjs" {
    export function getAttributes(): Promise<BuiltinComponents>;
}