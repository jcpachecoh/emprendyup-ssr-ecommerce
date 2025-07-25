'use client';
import React, { useState } from 'react';

/**
 * Counter component to increment and decrement a quantity.
 * @param {Object} props - Component properties.
 * @param {number} props.qtn - Initial quantity.
 */
type CounterProps = {
  qtn: number;
};

export default function Counter({ qtn }: CounterProps) {
  let [count, setCount] = useState(qtn);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <div className="qty-icons">
        <button
          onClick={() => decrement()}
          className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white minus"
        >
          -
        </button>
        <input
          min="0"
          name="quantity"
          value={count}
          type="number"
          readOnly
          className="h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white pointer-events-none w-16 ps-4 quantity mx-1"
        />
        <button
          onClick={() => increment()}
          className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-fourth-base/5 hover:bg-fourth-base text-fourth-base hover:text-white plus"
        >
          +
        </button>
      </div>
    </>
  );
}
