"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPlugins() {
    const rawPlugins = navigator.plugins;
    if (!rawPlugins) {
        return undefined;
    }
    const plugins = [];
    // Safari 10 doesn't support iterating navigator.plugins with for...of
    for (let i = 0; i < rawPlugins.length; ++i) {
        const plugin = rawPlugins[i];
        if (!plugin) {
            continue;
        }
        const mimeTypes = [];
        for (let j = 0; j < plugin.length; ++j) {
            const mimeType = plugin[j];
            mimeTypes.push({
                type: mimeType.type,
                suffixes: mimeType.suffixes,
            });
        }
        plugins.push({
            name: plugin.name,
            description: plugin.description,
            mimeTypes,
        });
    }
    return plugins;
}
exports.default = getPlugins;
