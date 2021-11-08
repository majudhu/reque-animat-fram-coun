import { useState, useRef, useEffect } from "react";

export default function RequeAnimatFramCoun({
  from = 0,
  to,
  duration = 200,
  children
}) {
  const [number, setNumber] = useState(from);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  function start() {
    cancelAnimationFrame(requestRef.current);
    startTimeRef.current = null;
    const elapsed =
      number === to ? 0 : duration * ((number - from) / (to - from));
    const rate = (to - from) / duration;
    function animate(time) {
      startTimeRef.current ??= time - elapsed;
      const next = (time - startTimeRef.current) * rate;
      if (next >= to) {
        setNumber(to);
      } else {
        setNumber(next);
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  }

  function stop(number) {
    cancelAnimationFrame(requestRef.current);
    if (number != null) setNumber(number);
  }

  function reverse() {
    cancelAnimationFrame(requestRef.current);
    startTimeRef.current = null;
    const elapsed =
      number === from
        ? -duration
        : duration * ((to - number) / (to - from) - 1);
    const rate = (to - from) / duration;
    function animate(time) {
      startTimeRef.current ??= time - elapsed;
      const next = (startTimeRef.current - time) * rate;
      if (next <= from) {
        setNumber(from);
      } else {
        setNumber(next);
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => stop, []);

  return children(number, start, stop, reverse);
}

/* ###############################################
References:
https://css-tricks.com/using-requestanimationframe-with-react-hooks/

################################################*/
