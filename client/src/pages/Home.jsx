import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/reducers/alertSlice";
import axiosInstance from "../helpers/axios";
import { message, Col, Row, Input } from "antd";
import Bus from "../components/Bus";
import moment from "moment";

const Home = () => {
  const { user } = useSelector((state) => state.users);
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    journeyDate: "",
  });

  const dispatch = useDispatch();

  // Get all buses
  const getBuses = async () => {
    // Create a temporary filter object with non-empty fields

    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/buses/get-all-buses",
        filters
      );
      dispatch(HideLoading());

      if (response.data.success) {
        setBuses(response.data.data); // Update the state with fetched buses
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getBuses(); // Fetch buses on initial load
  }, []);

  return (
    <div>
      {/* Filter Inputs */}
      <div className='my-3 py-1'>
        <Row
          gutter={10}
          align='center'
          className='grid grid-cols-1 lg:grid-cols-4 gap-4'
        >
          {/* From Input */}
          <Col className='w-full'>
            <Input
              type='text'
              placeholder='From'
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </Col>

          {/* To Input */}
          <Col className='w-full'>
            <Input
              type='text'
              placeholder='To'
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </Col>

          {/* Date Input */}
          <Col className='w-full'>
            <Input
              type='date'
              value={filters.journeyDate}
              onChange={(e) =>
                setFilters({ ...filters, journeyDate: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </Col>

          {/* Buttons */}
          <Col className='w-full'>
            <div className='flex gap-2'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                onClick={getBuses}
              >
                Filter
              </button>
              <button
                className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300'
                onClick={() =>
                  setFilters({
                    from: "",
                    to: "",
                    journeyDate: "",
                  })
                }
              >
                Clear
              </button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Bus List */}
      <div>
        <Row gutter={[15, 15]}>
          {buses.length > 0 ? (
            buses
              .filter((bus) => bus.status === "Yet To Start")
              .map((bus) => (
                <Col key={bus._id} lg={12} xs={24} sm={24}>
                  <Bus bus={bus} />
                </Col>
              ))
          ) : (
            <div className='text-center w-full mt-4 text-gray-500'>
              No buses available
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Home;
