import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("February 13, 2025");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="code text-4xl font-black text-right">
      {`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes`}
    </div>
  );
};

export default Clock;
