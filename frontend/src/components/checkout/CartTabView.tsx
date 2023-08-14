/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Review, ShippingAddress, Payment } from "./ShippingDetails";
import { Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import {useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

const CartTabView = () => {
  const [currentState, setCurrentState] = useState(1);
  const [completed, setCompleted] = useState<any>([]);
  const reduxCheckoutData = useSelector((state: RootState) => state.checkout.data);
  const {data: checkoutData2} = useSelector((state:RootState)=>state.checkoutApis);
  const handleClick = (state: any) => {
    if (state === "1") {
      setCurrentState(1);
    }
    if (state === "2") {
      setCurrentState(2);
      setCompleted([1]);
    }
    if (state === "3") {
      setCurrentState(3);
      setCompleted([1, 2]);
    }
  };
  
  if ((checkoutData2?.data ? checkoutData2?.data[0]?.items?.length <= 0 : checkoutData2?.length==0) && reduxCheckoutData.length==0) {
    return (
      <>
      <Navigate to="/cart" />
      </>
    )
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
          backgroundColor: "#fff",
        }}
      >
        <div
          data-testid="tabview1"
          style={{
            color: completed.includes(1)
              ? "#fff"
              : currentState === 1
              ? "#fff"
              : "",
            backgroundColor: completed.includes(1)
              ? "#27ae60"
              : currentState === 1
              ? "#00BCD4"
              : "#fff",
            flex:1,
            padding:'20px 30px'
          }}
          className=" "
          onClick={() => {
            handleClick("1");
          }}
        >
          <Typography
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {completed.includes(1) ? (
              <DoneIcon style={{ color: "#fff", marginLeft: "8px" }} />
            ) : null}
            SHIPPING ADDRESS
          </Typography>
        </div>

        <div
          data-testid="tabview2"
          style={{
            color: completed.includes(2)
              ? "#fff"
              : currentState === 2
              ? "#fff"
              : "",
            backgroundColor: completed.includes(2)
              ? "#27ae60"
              : currentState === 2
              ? "#00BCD4"
              : "#f0f0f0",
            flex:1,
            padding:'20px 30px'
          }}
          // onClick={() => handleClick("2")}
        >
          <Typography
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {completed.includes(2) ? (
              <DoneIcon style={{ color: "#fff", marginLeft: "8px" }} />
            ) : null}
            CONFIRM ORDER
          </Typography>
        </div>
        <div
          data-testid="tabview3"
          style={{
            color: completed?.includes(3)
              ? "#fff"
              : currentState === 3
              ? "#fff"
              : "",
            backgroundColor: completed?.includes(3)
              ? "#27ae60"
              : currentState === 3
              ? "#00BCD4"
              : "#f0f0f0",
            flex:1,
            padding:'25px 20px'
          }}
          // onClick={() => handleClick("3")}
        >
          <Typography
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {completed?.includes(3) ? (
              <DoneIcon style={{ color: "#fff", marginLeft: "8px" }} />
            ) : null}
            PAYMENT
          </Typography>
        </div>
      </div>
      <div>
        {currentState === 1 && (
          <ShippingAddress
            setCompleted={setCompleted}
            completed={completed}
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
        )}
        {currentState === 2 && (
          <Review
            setCompleted={setCompleted}
            completed={completed}
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
        )}
        {currentState === 3 && (
          <Payment
            setCompleted={setCompleted}
            completed={completed}
            currentState={currentState}
            setCurrentState={setCurrentState}
          />
        )}
      </div>
    </div>
  );
};

export default CartTabView;
