import { Row, Col } from "antd";

const Seatselction = ({ selectedSeats, setSelectedSeats, bus }) => {
  const capacity = bus.capacity; // Get bus capacity

  // Handle seat selection or unselection
  const selectOrUnselectSeats = (seatNumber) => {
    // If the seat is already selected, unselect it
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Otherwise, select the seat
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className='mx-5'>
      <div className='w-[300px] border-2 p-2 border-[#808080]'>
        <Row gutter={[10, 10]}>
          {/* Create seat elements dynamically based on bus capacity */}
          {Array.from(Array(capacity).keys()).map((seat, idx) => {
            let seatClass = "";

            // Add class for selected seats
            if (selectedSeats.includes(seat + 1)) {
              seatClass = "bg-blue-500 text-white";
            }
            // Add class for already booked seats (non-clickable)
            else if (bus.seatsBooked.includes(seat + 1)) {
              seatClass =
                "bg-[#808080] text-white pointer-events-none cursor-not-allowed";
            }

            return (
              <Col span={6} key={idx}>
                <div
                  className={`flex items-center justify-center rounded-md font-bold border border-[#808080] p-2 cursor-pointer transition ${seatClass}`}
                  onClick={() => selectOrUnselectSeats(seat + 1)} // Click to select or unselect
                >
                  {seat + 1} {/* Display seat number */}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Seatselction;
