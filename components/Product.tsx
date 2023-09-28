import React from "react";
import Link from "next/link";

import { urlFor } from "@/lib/client";

interface ProductProps {
  product: {
    image: string[]; // Assuming image is an array of string URLs
    name: string;
    slug: {
      current: string;
    };
    price: number;
  };
}

const Product = ({ product }: ProductProps) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(product.image && product.image[0]).toString()}
            width={250}
            height={250}
            className="product-image"
            alt=""
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
