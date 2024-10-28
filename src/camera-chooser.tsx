import { ChangeEvent, useCallback, useRef } from 'react';
import type CameraChooserProps from './types/camera-chooser-props';
import type Styleable from './types/styleable';

// icon from HeroIcons camera solid
const Icon = ({ style = {} }: Styleable) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColorstyle"
    style={{ width: '24px', height: '24px', ...style }}
  >
    <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
    <path
      fillRule="evenodd"
      d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function CameraChooser({
  devices,
  selectedIndex,
  onSelect,
}: CameraChooserProps) {
  const selRef = useRef(null);

  const openSelect = useCallback(
    () =>
      !!selRef.current && (selRef.current as HTMLSelectElement).showPicker(),
    []
  );

  const onSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const index = parseInt((e.target as HTMLSelectElement).value);

      onSelect(index);
    },
    [onSelect]
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        left: 0,
        padding: '1rem',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1,
      }}
    >
      <button
        onClick={openSelect}
        style={{
          alignItems: 'center',
          backgroundColor: '#ccc',
          borderRadius: '0.5rem',
          border: '1px solid #000',
          boxShadow: '0 0 0.75rem 0rem #000',
          color: '#000',
          display: 'flex',
          fontSize: '1.5rem',
          lineHeight: '1.5rem',
          padding: '0.75rem 0.75rem 0.75rem 1.25rem',
          position: 'relative',
          zIndex: 1,
        }}
        type="button"
      >
        <Icon style={{ marginRight: '0.5rem' }} />
        &#9660;
      </button>
      <select
        style={{
          position: 'absolute',
          opacity: 0,
        }}
        ref={selRef}
        value={selectedIndex}
        onChange={onSelectChange}
      >
        {devices.map((device, i) => (
          <option key={i} value={i}>
            {device.label}
          </option>
        ))}
      </select>
    </div>
  );
}
