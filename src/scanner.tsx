import { useEffect, useRef, useState } from "react"

import shimGetUserMedia from './utils/shim-get-user-media';
import { getDevices, getUserMedia, handleStream, releaseStream } from "./utils/controller";
import { useDecoder } from "./utils/use-decoder"
import type ScannerProps from "./types/scanner-props"
import type Styleable from "./types/styleable"
import CameraChooser from './camera-chooser';

interface HTMLVideoElementExtended extends HTMLVideoElement {
  mozSrcObject?: MediaStream
}

export default function Scanner({
  onScan,
  onError,
  flipHorizontally = false,
  delay = 800,
  aspectRatio = '1/1',
  decoderOptions,
  formats,
  className,
  style,
}: ScannerProps & Styleable) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDevice, setSelectedDevice] = useState<number | undefined>();

  const preview = useRef<HTMLVideoElementExtended>(null)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const isMounted = useRef<boolean>(false)

  // ensure a format is defined - we print out target formats to the screen so we need it here.
  const targetFormats = formats ?? decoderOptions?.formats ?? ['qr_code'];

  const decoder = useDecoder({
    ...decoderOptions,
    formats: targetFormats
  })

  const decode = () => {
    if (!preview.current) return

    decoder
      .current(preview.current)
      .then((code) => {
        timeoutId.current = setTimeout(decode, delay)
        if (code) onScan(code)
      })
      .catch(onError)
  }

  const release = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current)
    stream.current && releaseStream(preview.current, stream.current)
  }

  useEffect(() => {
    getDevices()
      .then(ds => {
        setDevices(ds)
        setSelectedDevice(Number(localStorage?.getItem("previousDevice") ?? 0));
      })
      .catch(onError)

    return release
  }, [preview])

  useEffect(() => {
    if (selectedDevice == undefined || selectedDevice >= devices.length) return

    if (localStorage) {
      localStorage.setItem('previousDevice', `${selectedDevice}`);
    }
    const selected = devices[selectedDevice]
    getUserMedia(selected.deviceId)
      .then(s => {
        if (!preview.current) return
        stream.current = s

        if (isMounted) {
          handleStream(preview.current, s, delay, selected).then(decode)
        } else releaseStream(preview.current, s)
      })
      .catch(onError)

    return release
  }, [selectedDevice])

  useEffect(() => {
    shimGetUserMedia()
    isMounted.current = true

    return () => {
      isMounted.current = false
      release()
    }
  }, [])

  return <div id="barcode-scanner" className={className} style={{ position: 'relative', ...style}}>
    {devices.length > 1 && <CameraChooser 
      devices={devices} 
      selectedIndex={selectedDevice} 
      onSelect={setSelectedDevice}
    />}
    <video
      ref={preview}
      preload="none"
      muted
      playsInline
      style={{
        aspectRatio: aspectRatio,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: flipHorizontally ? 'scaleX(1)' : 'scaleX(-1)',
        userSelect: 'none',
        pointerEvents: 'none',
      }} />
      <small>Looking for {targetFormats.join(', ')}</small>
  </div>
}