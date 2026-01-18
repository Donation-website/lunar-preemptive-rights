// components/ParcelInfo.js
export default function ParcelInfo({ parcel }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      padding: '15px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      borderRadius: '8px',
      maxWidth: '300px',
      zIndex: 10
    }}>
      <h3>Parcel #{parcel.id}</h3>
      <p>Size: {parcel.size} km²</p>
      <p>Price: ${parcel.price}</p>
      <p>Status: {parcel.sold ? 'Sold' : 'Available'}</p>
    </div>
  )
}
