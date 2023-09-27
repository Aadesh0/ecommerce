import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import { runFireworks } from "@/lib/utils";

const Canceled = () => {
  const { setCartItems, setTotalPrice, setTotalQuantites } = useStateContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantites(0);
  }, []);

  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        <h2>You Cancel your order!</h2>

        <p className="description">
          If you have any questions, please email
          <br></br>
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn" width="300px">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
