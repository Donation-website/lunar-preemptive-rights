export default function ParcelOverlay({ parcels }) {
  return (
    <>
      {parcels.map(parcel => (
        <mesh
          key={parcel.id}
          position={[parcel.x, parcel.y, 1.01]}
          scale={[parcel.size, parcel.size, parcel.size]}
          onClick={() => {
            if (parcel.status === 'available') {
              alert(`Proceed to checkout for parcel #${parcel.id}, price $${parcel.price}`)
            } else {
              alert(`Parcel #${parcel.id} is already occupied`)
            }
          }}
        >
          <circleGeometry args={[1, 6]} />
          <meshBasicMaterial color={parcel.status === 'available' ? 'green' : 'red'} />
        </mesh>
      ))}
    </>
  )
}
