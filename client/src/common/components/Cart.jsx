import _ from "lodash";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const Cart = () => {
  const cartDetails = JSON.parse(localStorage.getItem("cart"));
  console.log(cartDetails[0].images[0].url);
  let totalpice = [];

  const handlepayment = async (price) => {
    console.log(price);
    
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_API);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        {
          price,
        }
      );

      const sessionId = response.data.id;
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <div class="relative mx-auto w-full bg-white">
        <div class="grid min-h-screen grid-cols-1">
          <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 class="sr-only">Order summary</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div class="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
            </div>
            <div class="relative">
              <ul class="space-y-5">
                {cartDetails.length > 0 &&
                  cartDetails.map((m) => (
                    <li class="flex justify-between">
                      <div class="inline-flex">
                        <img src={m.images[0].url} alt="" class="max-h-16" />
                        <div class="ml-3">
                          <p class="text-base font-semibold text-white">
                            {m.title}
                          </p>
                          <p class="text-sm font-medium text-white text-opacity-80">
                            {m.description}
                          </p>
                        </div>
                      </div>
                      <p class="text-sm font-semibold text-white">
                        $ {m.price}
                      </p>
                      <span className="hidden">{totalpice.push(m.price)}</span>
                    </li>
                  ))}
              </ul>
              <div class="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div class="space-y-2">
                <p class="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>$ {_.sum(totalpice)}</span>
                </p>
              </div>
              <button
                type="submit"
                class="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-200 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                onClick={() => handlepayment(_.sum(totalpice))}
              >
                Place Order
              </button>
            </div>
            <div class="relative mt-10 text-white">
              <h3 class="mb-5 text-lg font-bold">Support</h3>
              <p class="text-sm font-semibold">
                +01 653 235 211 <span class="font-light">(International)</span>
              </p>
              <p class="mt-1 text-sm font-semibold">
                support@nanohair.com <span class="font-light">(Email)</span>
              </p>
              <p class="mt-2 text-xs font-medium">
                Call us now for payment related issues
              </p>
            </div>
            <div class="relative mt-10 flex">
              <p class="flex flex-col">
                <span class="text-sm font-bold text-white">
                  Money Back Guarantee
                </span>
                <span class="text-xs font-medium text-white">
                  within 30 days of purchase
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
