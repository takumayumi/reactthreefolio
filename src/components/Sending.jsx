import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sending = () => {
  return (
    <>
      <span style={{ "--i": 1, animationDelay: "calc(.1s * var(--i))" }}>
        S
      </span>
      <span style={{ "--i": 2, animationDelay: "calc(.1s * var(--i))" }}>
        e
      </span>
      <span style={{ "--i": 3, animationDelay: "calc(.1s * var(--i))" }}>
        n
      </span>
      <span style={{ "--i": 4, animationDelay: "calc(.1s * var(--i))" }}>
        d
      </span>
      <span style={{ "--i": 5, animationDelay: "calc(.1s * var(--i))" }}>
        i
      </span>
      <span style={{ "--i": 6, animationDelay: "calc(.1s * var(--i))" }}>
        n
      </span>
      <span style={{ "--i": 7, animationDelay: "calc(.1s * var(--i))" }}>
        g
      </span>
      <span style={{ "--i": 8, animationDelay: "calc(.1s * var(--i))" }}>
        .
      </span>
      <span style={{ "--i": 9, animationDelay: "calc(.1s * var(--i))" }}>
        .
      </span>
      <span
        style={{
          "--i": 10,
          animationDelay: "calc(.1s * var(--i))",
        }}
      >
        .
      </span>
      <span
        className="ml-4"
        style={{
          "--i": 11,
          animationDelay: "calc(.1s * var(--i))",
        }}
      >
        <FontAwesomeIcon icon="fa-regular fa-envelope" />
      </span>
    </>
  );
};

export default Sending;
