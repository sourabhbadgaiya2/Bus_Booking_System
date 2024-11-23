import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../helpers/axios";
import { HideLoading, ShowLoading } from "../redux/reducers/alertSlice";
import Seatselction from "../components/Seatselction";
import StripeCheckout from "react-stripe-checkout";

const Booknow = () => {
  const [selectedSeats, setSelectedSeats] = useState([]); // Selected seats array
  const [bus, setBus] = useState(null); // Bus details
  const params = useParams(); // URL params
  const navigate = useNavigate(); // Navigation hook
  const dispatch = useDispatch(); // Redux dispatcher

  // Fetch bus details by ID
  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Book seats
  const bookNow = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
        // transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Handle Stripe payment
  // const onToken = async (token) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axiosInstance.post("/bookings/make-payment", {
  //       token,
  //       amount: selectedSeats.length * bus.fare * 100,
  //     });
  //     console.log(response);

  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       bookNow(response.data.data.transactionId);
  //     } else {
  //       message.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  // Fetch bus details on component mount
  useEffect(() => {
    getBus();
  }, [params.id]);

  return (
    <div>
      {bus && (
        <Row className='mt-3' gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className='text-2xl primary-text'>{bus.name}</h1>
            <h1 className='text-md mb-2'>
              {bus.from} - {bus.to}
            </h1>
            <hr />

            <div className='flex flex-col gap-2 my-2'>
              <p className='text-md'>Journey Date: {bus.journeyDate}</p>
              <p className='text-md'>Fare: ₹ {bus.fare} /-</p>
              <p className='text-md'>Departure Time: {bus.departure}</p>
              <p className='text-md'>Arrival Time: {bus.arrival}</p>
              <p className='text-md'>Capacity: {bus.capacity}</p>
              <p className='text-md'>
                Seats Left: {bus.capacity - bus.seatsBooked.length}
              </p>
            </div>
            <hr />

            <div className='flex flex-col mt-2 gap-2'>
              <h1 className='text-2xl'>
                Selected Seats: {selectedSeats.join(", ")}
              </h1>
              <h1 className='text-2xl mt-2'>
                Fare: ₹ {bus.fare * selectedSeats.length} /-
              </h1>
              <hr />

              {/* <StripeCheckout
                billingAddress
                token={onToken}
                amount={bus.fare * selectedSeats.length * 100}
                currency='INR'
                stripeKey='pk_live_51QNpZwJJDdLdHncEU8GiI7yzqaYIppx9RVwS4qhvJKwKTv9fjdn5HW9RWagti7hyJBdyFWtUm0qeggxPCDbe2BYS008NiHwdkq'
              > */}
              <button
                onClick={bookNow}
                className={`px-6 py-3 rounded-md bg-blue-600 text-white font-bold hover:bg-blue-700 transition ${
                  selectedSeats.length === 0 && "opacity-50 cursor-not-allowed"
                }`}
                disabled={selectedSeats.length === 0}
              >
                Book Now
              </button>
              {/* </StripeCheckout> */}
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <Seatselction
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Booknow;
