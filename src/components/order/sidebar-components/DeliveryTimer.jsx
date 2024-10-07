import { useEffect, useState } from "react";

const DeliveryTimer = ({ deliveryTime }) => {
  // All states defination here
  const [timeLeft, setTimeLeft] = useState(deliveryTime);

  //   All useEffect Defination starts here
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1000; // Decrease by 1 second (1000 milliseconds)
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  //   calculateTimer Function
  const calculateTimeLeft = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = calculateTimeLeft(timeLeft);

  return (
    <div className="bg-lightskyblue p-3">
      <h1 className="text-xl font-semibold">Time left to deliver</h1>
      <div className="my-3 flex flex-wrap border border-primary">
        <div className="w-1/4 border-r border-primary py-3 text-center">
          <h1 className="text-xl font-bold">{String(days).padStart(2, "0")}</h1>
          <p className="text-sm font-medium text-black/80">Days</p>
        </div>
        <div className="w-1/4 border-r border-primary py-3 text-center">
          <h1 className="text-xl font-bold">
            {String(hours).padStart(2, "0")}
          </h1>
          <p className="text-sm font-medium text-black/80">Hours</p>
        </div>
        <div className="w-1/4 border-r border-primary py-3 text-center">
          <h1 className="text-xl font-bold">
            {String(minutes).padStart(2, "0")}
          </h1>
          <p className="text-sm font-medium text-black/80">Minutes</p>
        </div>
        <div className="w-1/4 py-3 text-center">
          <h1 className="text-xl font-bold">
            {String(seconds).padStart(2, "0")}
          </h1>
          <p className="text-sm font-medium text-black/80">Second</p>
        </div>
        <button
          type="button"
          className="w-full bg-primary p-2 text-lg font-semibold text-white"
        >
          Deliver Now
        </button>
      </div>
      <button type="button" className="w-full text-center text-lg">
        Extend delivery date
      </button>
    </div>
  );
};

export default DeliveryTimer;
