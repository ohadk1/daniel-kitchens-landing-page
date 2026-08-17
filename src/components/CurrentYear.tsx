'use client';

import { useEffect, useState } from 'react';

/** The footer is statically prerendered, so `new Date()` there freezes at build time.
 *  Render the build year on the server (no hydration mismatch) and correct it on mount. */
export default function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);

  useEffect(() => {
    const current = new Date().getFullYear();
    if (current !== buildYear) setYear(current);
  }, [buildYear]);

  return <>{year}</>;
}
