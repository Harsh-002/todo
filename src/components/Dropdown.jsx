const Dropdown = ({ children, ref, visible }) => {
  return (
    <div
      ref={ref}
      className={`absolute z-50 top-full ${visible ? "" : "hidden"}`}
    >
      <ul className="list-none bg-gray-100 border rounded-md overflow-hidden shadow-lg">
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
