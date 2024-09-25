interface TypeRoomCardProps {
  url: string;
  name: string;
  description: string;
  className?: string;
}
export const TypeRoomCard: React.FC<TypeRoomCardProps> = ({
  className,
  name,
  url,
  description,
}) => {
  return (
    <div className={className}>
      <div className="card bg-base-100 w-96 h-80 shadow-xl">
        <figure>
          <img src={url} alt="Shoes" />
        </figure>
        <div className="card-body bg-white">
          <h2 className="card-title">{name}</h2>
          <p>&nbsp;&nbsp;{description}</p>
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
