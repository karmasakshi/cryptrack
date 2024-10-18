import {
  getCryptocurrencyData,
  getCryptocurrencyPrice,
} from '@cryptack/apis/cryptocompare';
import { usePortfolioStore } from '@cryptack/store/portfolio';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';

const AddHolding = () => {
  const { addHolding } = usePortfolioStore();
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddHolding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: string[] = [];

    if (!symbol) {
      newErrors.push('Symbol is required.');
    }

    if (!quantity || Number(quantity) <= 0) {
      newErrors.push('Quantity must be a positive number.');
    }

    if (price && Number(price) <= 0) {
      newErrors.push('Price must be a positive number.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccess(null);
    setErrors([]);

    try {
      const [apiPrice, data] = await Promise.all([
        getCryptocurrencyPrice(symbol),
        getCryptocurrencyData(symbol),
      ]);

      if (!apiPrice) {
        throw new Error('Unable to fetch the price for this cryptocurrency.');
      }

      const cryptocurrency = {
        name: data.NAME,
        currentPrice: price ? Number(price) : apiPrice,
        logoUrl: data.LOGO_URL,
        symbol,
      };

      addHolding(cryptocurrency, Number(quantity));

      setSymbol('');
      setQuantity('');
      setPrice('');
      setSuccess('Holding added successfully!');
    } catch {
      setErrors(['Failed to add holding.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Holding</title>
      </Head>
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div
            className="card border-0 shadow-sm"
            style={{ width: '480px', marginTop: '-120px' }}
          >
            <div className="card-body">
              <div className="d-flex flex-column align-items-center">
                <Image
                  className="rounded bg-body-tertiary p-2"
                  alt="Cryptack"
                  height={64}
                  width={64}
                  src="/logo.svg"
                />
                <h3 className="card-title mt-4">Add Holding</h3>
              </div>
              <form className="mt-4" onSubmit={handleAddHolding}>
                {errors.length > 0 && (
                  <div className="alert alert-danger">
                    <ul className="m-0">
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
                  <label htmlFor="symbol" className="form-label">
                    Symbol (e.g. BTC, ETH):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cryptocurrency symbol"
                    id="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="quantity" className="form-label">
                    Quantity:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quantity bought"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    id="quantity"
                    required
                    pattern="^(0|[1-9]\d*)(\.\d+)?$"
                  />
                </div>

                <div className="mt-2">
                  <label htmlFor="price" className="form-label">
                    Price (optional):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price per unit"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id="price"
                    pattern="^(0|[1-9]\d*)(\.\d+)?$"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    'Add Holding'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHolding;
