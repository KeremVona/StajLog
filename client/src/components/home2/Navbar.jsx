const Navbar = ({ setOpenSidebar }) => {
  return (
    <div className="md:hidden flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold text-gray-800">E-Commerce</h1>
      <button
        onClick={() => setOpenSidebar((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
