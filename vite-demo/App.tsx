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
    <div style={{ display: 'flex' }}>
      <Scanner
        style={{ width: '50vw', height: '50vh' }}
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
