import { useState } from 'react';
import ParcelTooltip from './ParcelTooltip';

export default function ParcelMap({ parcels, onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div id="map-container" style={{ backgroundImage: 'url(/moon/moon-map.jpg)', backgroundSize: 'cover', height: '600px' }}>
      {parcels.map(parcel => (
        <svg
          key={parcel.id}
          style={{
            position: 'absolute',
            left: parcel.x,
            top: parcel.y,
            width: parcel.sizePx,
            height: parcel.sizePx,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={() => setHovered(parcel)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => !parcel.occupied && onSelect(parcel)}
        >
          <polygon
            points={parcel.hexPoints}
            fill={parcel.occupied ? 'red' : 'green'}
            className="parcel"
          />
        </svg>
      ))}
      {hovered && <ParcelTooltip parcel={hovered} />}
    </div>
  )
}
