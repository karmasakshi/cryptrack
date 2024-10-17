import Image from 'next/image';
import { Holding } from '@cryptack/interfaces/holding';
import Link from 'next/link';

const HoldingCard = ({
  holding,
  onRemove,
}: {
  holding: Holding;
  onRemove: (symbol: string) => void;
}) => {
  const profit: number =
    (holding.cryptocurrency.currentPrice - holding.averageCost) *
    holding.quantity;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <Image
            className="me-2 rounded bg-body-tertiary p-1"
            alt={holding.cryptocurrency.name}
            height={32}
            width={32}
            src={holding.cryptocurrency.logoUrl || 'https://placehold.co/32x32'}
          />
          <h5 className="card-title m-0">
            {holding.cryptocurrency.name} (
            {holding.cryptocurrency.symbol.toUpperCase()})
          </h5>
        </div>
        <div className="mt-2">
          <div>
            <strong>Quantity:</strong> {holding.quantity}
          </div>
          <div>
            <strong>Current Price:</strong> $
            {holding.cryptocurrency.currentPrice}
          </div>
          <div>
            <strong>Total Value:</strong> ${holding.value}
          </div>
          <div className={`${profit >= 0 ? 'text-success' : 'text-danger'}`}>
            <strong>Profit:</strong> ${profit}
          </div>
        </div>
        <div className="mt-4">
          <Link
            href={`/holdings/${holding.cryptocurrency.symbol}`}
            className="btn btn-sm btn-primary"
          >
            View Details
          </Link>
          <button type="button" className="btn btn-sm btn-warning ms-2">
            Edit
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger ms-2"
            onClick={() => onRemove(holding.cryptocurrency.symbol)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoldingCard;
