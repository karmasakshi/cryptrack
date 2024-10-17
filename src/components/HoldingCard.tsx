import Image from 'next/image';
import { Holding } from '@cryptack/interfaces/holding';
import Link from 'next/link';

const HoldingCard = ({ holding }: { holding: Holding }) => {
  const profit =
    (holding.cryptocurrency.currentPrice - holding.averageCost) *
    holding.quantity;

  return (
    <div className="card shadow-sm border-0">
      <div className="row g-0">
        <div className="bg-body-tertiary p-2 col-md-3 d-flex align-items-center justify-content-center">
          <Image
            className="img-fluid rounded"
            alt={holding.cryptocurrency.name}
            height={120}
            width={120}
            src={
              holding.cryptocurrency.logoUrl || 'https://placehold.co/120x120'
            }
          />
        </div>
        <div className="col-md-9">
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title mb-3">
              {holding.cryptocurrency.name} ({holding.cryptocurrency.symbol})
            </h5>
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
            <div className="mt-2">
              <Link href="/holdings" className="btn btn-sm btn-primary">
                View Details
              </Link>
              <button type="button" className="btn btn-sm btn-warning ms-2">
                Edit
              </button>
              <button type="button" className="btn btn-sm btn-danger ms-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingCard;
