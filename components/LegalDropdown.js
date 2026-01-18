import { useState } from 'react';

export default function LegalDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={()=>setOpen(!open)}>Terms & Conditions</button>
      {open && (
        <div style={{ border: '1px solid gray', padding: '10px', marginTop: '5px' }}>
          <p>No ownership is granted under current international law (Outer Space Treaty, 1967).</p>
          <p>This service exists in anticipation of future legal frameworks.</p>
        </div>
      )}
    </div>
  )
}
