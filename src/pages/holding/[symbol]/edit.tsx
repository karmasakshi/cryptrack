import { Holding } from '@cryptack/interfaces/holding';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditHolding = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { portfolio, updateHolding } = usePortfolioStore();
  const [holding, setHolding] = useState<Holding | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [averageCost, setAverageCost] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (symbol && portfolio.holdings) {
      const currentHolding = portfolio.holdings.find(
        (h) => h.cryptocurrency.symbol === symbol,
      );
      if (currentHolding) {
        setHolding(currentHolding);
        setQuantity(currentHolding.quantity.toString());
        setAverageCost(currentHolding.averageCost.toString());
      }
    }
  }, [symbol, portfolio.holdings]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: string[] = [];

    if (!quantity || Number(quantity) <= 0) {
      newErrors.push('Quantity must be a positive number.');
    }

    if (!averageCost || Number(averageCost) <= 0) {
      newErrors.push('Average cost must be a positive number.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess(null);
    setErrors([]);

    if (holding) {
      const updatedHolding: Holding = {
        ...holding,
        quantity: parseFloat(quantity),
        averageCost: parseFloat(averageCost),
      };
      updateHolding(updatedHolding);
      setSuccess('Holding updated successfully!');
    }
  };

  if (!holding) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Head>
          <title>
            Edit {holding.cryptocurrency.symbol.toUpperCase()} Holding
          </title>
        </Head>
        <div className="container-fluid">
          <div
            className="card border-0 shadow-sm mt-5 mx-auto"
            style={{ width: '480px', maxWidth: '100%' }}
          >
            <div className="card-body">
              <div className="d-flex flex-column align-items-center">
                <Image
                  className="rounded bg-body-tertiary p-1"
                  alt={holding.cryptocurrency.name}
                  height={64}
                  width={64}
                  src={
                    holding.cryptocurrency.logoUrl ||
                    'https://placehold.co/64x64'
                  }
                />
                <h3 className="card-title mt-4">
                  Edit {holding.cryptocurrency.symbol.toUpperCase()} Holding
                </h3>
              </div>
              <form className="mt-4" onSubmit={handleSubmit}>
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <ul className="m-0 list-unstyled">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}
                <div>
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quantity held"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    id="quantity"
                    required
                    pattern="^(0|[1-9]\d*)(\.\d+)?$"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="averageCost" className="form-label">
                    Average Cost
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Average cost per unit"
                    id="averageCost"
                    value={averageCost}
                    onChange={(e) => setAverageCost(e.target.value)}
                    required
                    pattern="^(0|[1-9]\d*)(\.\d+)?$"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Update Holding
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EditHolding;
