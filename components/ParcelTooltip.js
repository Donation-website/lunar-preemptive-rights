export default function ParcelTooltip({ parcel }) {
  return (
    <div className="tooltip" style={{ left: parcel.x + 10, top: parcel.y - 30 }}>
      <strong>Parcel #{parcel.id}</strong><br/>
      Size: {parcel.size}<br/>
      Price: ${parcel.price}<br/>
      Coordinates: {parcel.x}, {parcel.y}<br/>
      {parcel.occupied ? 'Occupied' : 'Available'}
    </div>
  )
}
