import { useEffect, useRef, useState } from "react";
import { HideLoading, ShowLoading } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../helpers/axios";
import { Modal, message, Table } from "antd";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

const AdminBookings = () => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/bookings/get-bookings-by-user-id",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => {
        return seats.join(", ");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <p
            className='text-md underline cursor-pointer'
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print Ticekt
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  // Define the print handler using useReactToPrint and pass contentRef
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });
  return (
    <div>
      <PageTitle title='Bookings' />
      <div className='mt-2'>
        <Table dataSource={bookings} columns={columns} />
      </div>

      {showPrintModal && (
        <Modal
          title='Print Ticket'
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          open={showPrintModal}
          okText='Print'
          onOk={handlePrint}
        >
          <div
            className='flex flex-col p-5 sm:p-8 lg:p-10 space-y-4'
            ref={contentRef}
          >
            <p className='text-lg font-semibold'>Bus: {selectedBooking.name}</p>
            <p className='text-base'>
              {selectedBooking.from} - {selectedBooking.to}
            </p>
            <hr />
            <p className='text-sm'>
              <span className='font-semibold'>Journey Date:</span>
              {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
            </p>
            <p className='text-sm'>
              <span className='font-semibold'>Journey Time:</span>{" "}
              {selectedBooking.departure}
            </p>
            <hr />
            <p className='text-sm'>
              <span className='font-semibold'>Seat Numbers:</span>
              <br />
              {selectedBooking.seats.join(", ")}
            </p>
            <hr />
            <p className='text-sm'>
              <span className='font-semibold'>Total Amount:</span>{" "}
              {selectedBooking.fare * selectedBooking.seats.length} /-
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminBookings;
