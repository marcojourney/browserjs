import { BuiltinComponents } from './sources';
export interface Confidence {
    /**
     * A number between 0 and 1 that tells how much the agent is sure about the visitor identifier.
     * The higher the number, the higher the chance of the visitor identifier to be true.
     */
    score: number;
    /**
     * Additional details about the score as a human-readable text
     */
    comment?: string;
}
export declare const commentTemplate = "$ if upgrade to Pro: https://fpjs.dev/pro";
export default function getConfidence(components: Pick<BuiltinComponents, 'platform'>): Confidence;
