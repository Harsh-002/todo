import { useEffect, useState } from "react";
import dinosaur from "../assets/lotties/dinosaur.json";
import sloth from "../assets/lotties/sloth.json";
import camel from "../assets/lotties/camel.json";

const Greet = ({ setAnimation }) => {
  const [hours, setHours] = useState(new Date().getHours());
  const [greet, setGreet] = useState("");

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
  }, [hours, setAnimation]);

  return (
    <div className="text-center md:text-2xl md:m-4 m-2 font-bold flex items-center justify-center">
      {greet}
    </div>
  );
};

export default Greet;
