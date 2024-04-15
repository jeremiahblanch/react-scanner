import { useState } from "react";

import Scanner from "./scanner";
import DropZone from "./drop-zone"
import type ScannerProps from "./types/scanner-props";
import type Styleable from "./types/styleable";

export default function BarcodeScanner({
  onScan,
  onError,
  flipHorizontally,
  delay,
  aspectRatio,
  switchLabel,
  dropChildren,
  decoderOptions,
  style,
  className,
  canSwitchToImage = true,
}: ScannerProps & Styleable & {
  switchLabel?: (isScanner: boolean) => React.ReactNode
  dropChildren?: React.ReactNode
}) {
  const [isScanner, setIsScanner] = useState(true)
  return (
    <div id="barcode-scanner-layout" className={className} style={{
      width: '100%',
      ...style,
    }}>
      {isScanner
        ? <Scanner
          onScan={onScan}
          onError={onError}
          flipHorizontally={flipHorizontally}
          delay={delay}
          aspectRatio={aspectRatio}
          decoderOptions={decoderOptions}
        />
        : <DropZone
          onScan={onScan}
          onError={onError}
          decoderOptions={decoderOptions}>
          {dropChildren}
        </DropZone>}
        {canSwitchToImage && <>
        <button
          type="button"
          onClick={() => setIsScanner(!isScanner)}
          style={{
            width: '100%',
            marginTop: '16px',
            fontSize: '1rem',
          }}>
          {switchLabel !== undefined
            ? switchLabel(isScanner)
            : `Switch to ${isScanner ? 'image input' : 'scanner'}`}
        </button>
        </>}
    </div>
  );
}