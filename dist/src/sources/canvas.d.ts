export interface CanvasFingerprint {
    winding: boolean;
    geometry: string;
    text: string;
}
export default function getCanvasFingerprint(): Promise<CanvasFingerprint>;
