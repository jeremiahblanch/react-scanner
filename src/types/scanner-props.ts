import type { BarcodeDetectorOptions } from "barcode-detector/pure";

export default interface ScannerProps {
  onError?: (error: Error) => void;
  onScan: (value: string) => void;
  flipHorizontally?: boolean;
  delay?: number;
  aspectRatio?: string;
  decoderOptions?: BarcodeDetectorOptions;
}