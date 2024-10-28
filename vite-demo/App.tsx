import React, { useCallback, useState } from 'react';
import { Scanner } from '../src/';

export const App = () => {
  const [codes, setCodes] = useState<string[]>([]);

  const onScan = useCallback(
    (s: string) => {
      console.log(s);

      if (codes.includes(s)) {
        console.log('scanned already');

        return;
      }

      setCodes((old) => [...old, s]);
    },
    [codes, setCodes]
  );

  return (
    <div style={{ display: 'flex flex-wrap' }}>
      <Scanner
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '500px',
          maxHeight: '500px',
        }}
        onScan={onScan}
        aspectRatio="unset"
      />
      <div>
        <h2>Found:</h2>
        <ol>
          {codes.map((cd) => (
            <li key={cd}>{cd}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};
