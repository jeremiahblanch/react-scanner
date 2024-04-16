import { ChangeEvent, useRef } from 'react';
import type CameraChooserProps from "./types/camera-chooser-props";

// icon from HeroIcons camera solid
const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColorstyle"
    style={{width: '24px', height: '24px'}}
  >
    <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
    <path
      fillRule="evenodd"
      d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function CameraChooser({ devices, selectedIndex, onSelect}: CameraChooserProps) {
    const selRef = useRef(null);

    const getSelectElement = (): HTMLSelectElement => (selRef.current as unknown as HTMLSelectElement);

    const toggleSelect = () => {
        const sel = getSelectElement();

        if (sel.style.display === 'none') {
          sel.style.display = 'block';
          sel.showPicker();
        }
        else {
            sel.style.display = 'none';
        }
    }

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const index = parseInt((e.target as HTMLSelectElement).value)

        onSelect(index);
        getSelectElement().style.display = 'none';
    }

    const onSelectClick = () => {
        const sel = getSelectElement();
        
        if (sel.style.display === 'block') {
          sel.style.display = 'none';
        }
    };

    return (
      <div style={{
        left: '50%',
        position: 'absolute',
        textAlign: 'center',
        top: 0,
        transform: 'translateX(-50%)',
      }}>
        <button
          onClick={toggleSelect}
          style={{
            alignItems: 'center',
            backgroundColor: "#ccc",
            borderRadius: "0.5rem",
            border: 0,
            color: "#000",
            display: 'flex',
            padding: '0.5rem',
            position: 'relative',
            zIndex: 1,
          }}
          type="button"
        >
          <Icon /> &#9662;
        </button>
        <select
          style={{
            display: "none",
            height: 0,
            width: 0,
            position: 'absolute',
            opacity: 0,
            zIndex: -1,
          }}
          ref={selRef}
          value={selectedIndex}
          onChange={onSelectChange}
          onClick={onSelectClick}
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