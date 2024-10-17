import Image from 'next/image';
import { Holding } from '@cryptack/interfaces/holding';
import Link from 'next/link';

const HoldingCard = ({
  holding,
  removeHolding,
}: {
  holding: Holding;
  removeHolding: (symbol: string) => void;
}) => {
  const profit: number = Number(
    (
      (holding.cryptocurrency.currentPrice - holding.averageCost) *
      holding.quantity
    ).toFixed(2),
  );

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title d-flex align-items-center">
          <Image
            className="me-2 rounded bg-body-tertiary p-1"
            alt={holding.cryptocurrency.name}
            height={32}
            width={32}
            src={holding.cryptocurrency.logoUrl || 'https://placehold.co/32x32'}
          />
          {holding.cryptocurrency.name} (
          {holding.cryptocurrency.symbol.toUpperCase()})
        </h5>
        <p className="m-0">
          <strong>Current Price:</strong>
          <pre className="d-inline">
            {' '}
            ${holding.cryptocurrency.currentPrice}
          </pre>
        </p>
        <p className="m-0">
          <strong>Quantity:</strong>
          <pre className="d-inline"> {holding.quantity}</pre>
        </p>
        <p className="m-0">
          <strong>Average Cost:</strong>
          <pre className="d-inline"> {holding.averageCost.toFixed(2)}</pre>
        </p>
        <p className="m-0">
          <strong>Total Value:</strong>
          <pre className="d-inline"> ${holding.value.toFixed(2)}</pre>
        </p>
        <p className={`m-0 ${profit >= 0 ? 'text-success' : 'text-danger'}`}>
          <strong>Profit:</strong>
          <pre className="d-inline"> ${profit}</pre>
        </p>
        <div className="mt-4">
          <Link
            href={`/holdings/${holding.cryptocurrency.symbol}`}
            className="btn btn-sm btn-primary me-2"
          >
            View Details
          </Link>
          <button type="button" className="btn btn-sm btn-warning me-2">
            Edit
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => removeHolding(holding.cryptocurrency.symbol)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default HoldingCard;
