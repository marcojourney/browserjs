type PluginMimeTypeData = {
    type: string;
    suffixes: string;
};
type PluginData = {
    name: string;
    description: string;
    mimeTypes: PluginMimeTypeData[];
};
export default function getPlugins(): PluginData[] | undefined;
export {};
