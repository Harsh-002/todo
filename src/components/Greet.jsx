import { useEffect, useState } from "react";
import dinosaur from "../assets/lotties/dinosaur.json";
import sloth from "../assets/lotties/sloth.json";
import camel from "../assets/lotties/camel.json";
import Lottie from "lottie-react";

const Greet = () => {
  const [hours, setHours] = useState(new Date().getHours());
  const [greet, setGreet] = useState("");
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().getHours());
    }, 1000 * 60);

    return () => clearInterval(interval); // Clean up
  }, []);

  useEffect(() => {
    if (hours >= 0 && hours <= 11) {
      setGreet("Good morning");
      setAnimation(sloth);
    } else if (hours > 11 && hours <= 16) {
      setGreet("Good afternoon");
      setAnimation(camel);
    } else {
      setGreet("Good evening");
      setAnimation(dinosaur);
    }
  }, [hours]);

  return (
    <div className="text-center text-2xl m-4 font-bold flex items-center justify-center">
      <div className="relative">
        {greet}
        <div className="w-25 absolute left-full -bottom-[140%]">
          <Lottie animationData={animation} />
        </div>
      </div>
    </div>
  );
};

export default Greet;
