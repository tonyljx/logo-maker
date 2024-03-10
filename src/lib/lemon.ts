// import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
// // https://docs.lemonsqueezy.com/guides/tutorials/nextjs-saas-billing
// /**
//  * Ensures that required environment variables are set and sets up the Lemon
//  * Squeezy JS SDK. Throws an error if any environment variables are missing or
//  * if there's an error setting up the SDK.
//  */
// export function configureLemonSqueezy() {
//   const requiredVars = [
//     "LEMON_SQUEEZY_API_KEY",
//     "LEMON_SQUEEZY_STORE_ID",
//     "LEMON_SQUEEZY_SIGNATURE_SECRET",
//   ];
//   console.log(process.env.LEMON_SQUEEZY_API_KEY);

//   const missingVars = requiredVars.filter((varName) => !process.env[varName]);

//   if (missingVars.length > 0) {
//     throw new Error(
//       `Missing required LEMONSQUEEZY env variables: ${missingVars.join(
//         ", ",
//       )}. Please, set them in your .env file.`,
//     );
//   }

//   lemonSqueezySetup({
//     apiKey: process.env.LEMON_SQUEEZY_API_KEY,
//     onError: (error) => {
//       throw new Error(`Lemon Squeezy API error: ${error.message}`);
//     },
//   });
// }
