import { Holding } from '@cryptack/interfaces/holding';
import { formatAmount } from '@cryptack/utils/format-amount';
import Image from 'next/image';
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
        <h5 className="card-title d-flex align-items-center gap-2">
          <Image
            className="rounded bg-body-tertiary p-1"
            alt={holding.cryptocurrency.name}
            height={32}
            width={32}
            src={holding.cryptocurrency.logoUrl || 'https://placehold.co/32x32'}
          />
          {holding.cryptocurrency.name} (
          {holding.cryptocurrency.symbol.toUpperCase()})
        </h5>
        <div>
          <span className="m-0">
            <strong>Current Price:</strong>
            <pre className="d-inline">
              {' '}
              ${formatAmount(holding.cryptocurrency.currentPrice)}
            </pre>
          </span>
        </div>
        <div>
          <span className="m-0">
            <strong>Quantity:</strong>
            <pre className="d-inline"> {holding.quantity}</pre>
          </span>
        </div>
        <div>
          <span className="m-0">
            <strong>Average Cost:</strong>
            <pre className="d-inline"> {formatAmount(holding.averageCost)}</pre>
          </span>
        </div>
        <div>
          <span className="m-0">
            <strong>Value:</strong>
            <pre className="d-inline"> ${formatAmount(holding.value)}</pre>
          </span>
        </div>
        <div>
          <span
            className={`m-0 ${profit >= 0 ? 'text-success' : 'text-danger'}`}
          >
            <strong>Profit:</strong>
            <pre className="d-inline"> ${formatAmount(profit)}</pre>
          </span>
        </div>
        <div className="mt-4 d-flex gap-2">
          <Link
            href={`/holding/${holding.cryptocurrency.symbol}`}
            className="btn btn-sm btn-primary"
          >
            View Details
          </Link>
          <Link
            href={`/holding/${holding.cryptocurrency.symbol}/edit`}
            className="btn btn-sm btn-warning"
          >
            Edit
          </Link>
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
