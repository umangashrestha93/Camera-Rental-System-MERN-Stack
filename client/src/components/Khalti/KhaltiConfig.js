import axios from "axios";
import myKey from "./KhaltiKey";

export default function KhaltiConfig(productName, productIdentity, handleSubmit) {
  let config = {
    publicKey: myKey.publicTestKey,
    productIdentity: `${productIdentity}`,
    productName: `${productName}`,
    productUrl: `http://localhost:3000/checkout`,
    eventHandler: {
      async onSuccess(payload) {
        const response = await axios.post(
          "http://localhost:8000/api/verify-payment",
          payload
        );
        if(response.status === 200){
          handleSubmit();
        }
        return response
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      // "EBANKING",
      // "MOBILE_BANKING",
      // "CONNECT_IPS",
      // "SCT",
    ],
  };

  return config;
}

