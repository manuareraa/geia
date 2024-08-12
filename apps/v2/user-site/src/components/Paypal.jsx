import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function Paypal(props) {
  const initialOptions = {
    clientId:
      "AWqMFsrCNIFKrjbGbEyIq2HHBBuGI6O5IRWLfoRgQetGB6CRnkobNytsi8_voGAKG-xxc4CkKjQG-Nmn",
    // "AWUsJF8fovi9TcVCmRQEOvPpy3RceJMr92jd1MlX-S7nmoGNjjRpzGNz4DhahnKA2i7XRQ9WxfCnssTf",
    // "AWqMFsrCNIFKrjbGbEyIq2HHBBuGI6O5IRWLfoRgQetGB6CRnkobNytsi8_voGAKG-xxc4CkKjQG-Nmn",
    "enable-funding":
      "paypal.FUNDING.PAYPAL,paypal.FUNDING.VENMO,paypal.FUNDING.PAYLATER,paypal.FUNDING.CARD",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  useEffect(() => {
    console.log("Paypal props", props);
  }, [props]);

  const [message, setMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Geoblocs",
            amount: {
              currency_code: "EUR",
              value: props.price,
            },
            custom_id: JSON.stringify({
              tokenId: props.tokenId,
              tokenQty: props.tokenQty,
              address: props.address,
            }),
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log("details", details);
      console.log("data", data);
      if (details.status === "COMPLETED") {
        props.successCallback(details, data);
      }
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    toast.error("An Error occured with your payment. Please try again.");
    alert("An Error occured with your payment. Please try again." + data);
    console.log("Paypal Error: ", data);
  };

  return (
    <div className="w-full">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            color: "gold",
            layout: "vertical", //default value. Can be changed to horizontal
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
}

export default Paypal;