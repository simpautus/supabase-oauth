import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { User } from "@supabase/supabase-js";
import Navigation from "~/components/navigation";
import { getUser } from "~/utils/session";
// import supabase from "~/utils/supabase";
// import withAuth from "~/utils/withAuth";

type LoaderData = {
  user: User | null;
  plans: {
    id: string;
    name: string;
    price: number;
    currency: string;
  }[];
  subscriptionTier: "FREE" | "STANDARD" | "PREMIUM";
};

// export const loader = withAuth(
//   async ({ user, supabaseClient }) => {
//     const unsortedPlans = [
//       {
//         id: '101',
//         name: 'Product 1',
//         price: 100,
//         currency: 'USD',
//       },
//       {
//         id: '102',
//         name: 'Product 2',
//         price: 200,
//         currency: 'USD',
//       },
//       {
//         id: '103',
//         name: 'Product 3',
//         price: 300,
//         currency: 'USD',
//       },
//     ]

//     const plans = unsortedPlans.sort((a, b) => a.price - b.price)

//     return { plans, subscriptionTier: 'FREE' }
//   },
//   { required: false }
// )

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  // console.log({ user });

  const unsortedPlans = [
    {
      id: "101",
      name: "Product 1",
      price: 100,
      currency: "USD",
    },
    {
      id: "102",
      name: "Product 2",
      price: 200,
      currency: "USD",
    },
    {
      id: "103",
      name: "Product 3",
      price: 300,
      currency: "USD",
    },
  ];

  const plans = unsortedPlans.sort((a, b) => a.price - b.price);

  return json<LoaderData>({ user, plans, subscriptionTier: "FREE" });
};

const Index = () => {
  const { user, plans, subscriptionTier } = useLoaderData<LoaderData>();

  const shouldRenderManageButton = subscriptionTier !== "FREE";

  const handleSubscription = () => {
    console.log("handleSubscription");
    return null;
  };

  const handleManageSubscription = () => {
    console.log("handleManageSubscription");
    return null;
  };

  return (
    <>
      <Navigation user={user} />
      <div className="text-center text-2xl font-extrabold text-slate-900 sm:text-4xl lg:text-4xl">
        <p>
          Sunday Monday<span className="text-pink-400"> Happy </span>
          <span className="text-blue-400">Days</span>
        </p>
        <p>
          Tuesday Wednesday<span className="text-pink-400"> Happy </span>
          <span className="text-blue-400">Days</span>
        </p>
      </div>

      <div className="my-4 flex justify-center">
        <Link
          to="entries"
          className="flex h-12 items-center justify-center rounded bg-blue-400 px-6 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50"
        >
          Get started
        </Link>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 p-2 md:flex-row">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl text-slate-800 ${
              plan.name === "Standard" ? "bg-pink-300" : "bg-blue-300"
            }`}
          >
            <div className="mx-3 mt-3 rounded-t-xl bg-white p-8">
              <div className="text-center uppercase">{plan.name}</div>
              <h2 className="mt-10 text-center font-serif text-5xl">
                ${plan.price}
              </h2>
              <h3 className="mt-2 text-center">Per month</h3>
              <div className="flex justify-center">
                {shouldRenderManageButton ? (
                  <button
                    onClick={handleManageSubscription}
                    className={`my-6 inline-block cursor-pointer rounded-lg border border-blue-400 px-10 py-3 text-center duration-200 hover:bg-blue-400 hover:text-white
                  ${
                    plan.name === "Standard" &&
                    "border-pink-400 bg-pink-300 hover:border-pink-400 hover:bg-pink-400"
                  }`}
                  >
                    Manage
                  </button>
                ) : (
                  <button
                    onClick={handleSubscription}
                    className={`my-6 inline-block cursor-pointer rounded-lg border border-blue-400 px-10 py-3 text-center duration-200 hover:bg-blue-400 hover:text-white
                  ${
                    plan.name === "Standard" &&
                    "border-pink-400 bg-pink-300 hover:border-pink-400 hover:bg-pink-400"
                  }`}
                  >
                    Purchase
                  </button>
                )}
              </div>
            </div>
            <div className="border-t border-blue-300"></div>
            <div className="mx-3 mb-3 rounded-b-xl bg-white p-8">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                  <span className="ml-1">
                    {plan.name === "Free"
                      ? 10
                      : plan.name === "Standard"
                      ? "50"
                      : "Unlimited"}{" "}
                    Entries
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
