import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

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
      <Card className="w-96 shadow-xl transition-all">
        <CardBody className="overflow-hidden p-0">
          <Image
            src={url}
            alt="Room type"
            className="object-cover rounded-t-xl"
            width={384} // Adjust as needed
            height={240} // Adjust as needed
          />
        </CardBody>
        <CardHeader className="p-4 flex-col items-start">
          <h2 className="font-bold text-lg">{name}</h2>
          <p className="text-sm">{description}</p>
        </CardHeader>
      </Card>
    </div>
  );
};
