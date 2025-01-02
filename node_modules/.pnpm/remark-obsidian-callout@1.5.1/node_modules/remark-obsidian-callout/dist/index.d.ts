import type { Plugin } from "unified";
/**
 * Plugin configuration
 * @date 3/23/2023 - 5:16:27 PM
 *
 * @export
 * @interface Config
 */
export interface Config {
    /**
     * the data attribute name to be added to the blockquote
     * @date 3/23/2023 - 5:16:26 PM
     *
     * @type {string}
     */
    dataAttribute: string;
    /**
     * the custom class name to be added to the blockquote, by default it's `${dataAttribute}-${calloutType}` if not specified
     * @date 3/23/2023 - 5:16:26 PM
     *
     * @type {string | undefined}
     */
    blockquoteClass: string | undefined;
    /**
     * the custom class name to be added to the div, the parent element of icon & title text
     * @date 3/23/2023 - 5:16:26 PM
     *
     * @type {string}
     */
    titleClass: string;
    /**
     * the tag name for the title text element, default to `div`
     * @date 3/23/2023 - 5:16:26 PM
     *
     * @type {string}
     */
    titleTextTagName: string;
    /**
     * the custom class name to be added to the title text element
     * @date 3/23/2023 - 5:16:26 PM
     *
     * @type {string}
     */
    titleTextClass: string;
    /**
     * a function to transform the title text, you can use it to append custom strings
     * @date 3/23/2023 - 5:16:26 PM
     *
     * @type {(title: string) => string}
     */
    titleTextTransform: (title: string) => string;
    /**
     * the tag name for the title icon element, default to `div`
     * @date 3/23/2023 - 5:16:26 PM
     *
     * @type {string}
     */
    iconTagName: string;
    /**
     * the custom class name to be added to the title icon element
     * @date 3/23/2023 - 5:16:26 PM
     *
     * @type {string}
     */
    iconClass: string;
    /**
     * the custom class name to be added to the content element
     * @date 7/16/2024 - 7:20:26 PM
     *
     * @type {string}
     */
    contentClass: string;
    /**
     * predefined callouts, an object with callout's name as key, its SVG icon as value,
     *
     * see https://help.obsidian.md/Editing+and+formatting/Callouts#Supported+types,
     *
     * you can customize it by overriding the same callout's icon or passing new callout with customized name and icon
     * @date 10/07/2024 - 8:16:26 PM
     *
     * @type {Record<string, string>}
     */
    callouts: Record<string, string>;
}
/**
 * This is a remark plugin that parses Obsidian's callout syntax, and adds custom data attributes and classes to the HTML elements for further customizations.
 * @date 3/23/2023 - 5:16:26 PM
 *
 * @param {?Partial<Config>} [customConfig]
 * @returns {(tree: Node) => void}
 */
declare const plugin: Plugin;
export default plugin;
