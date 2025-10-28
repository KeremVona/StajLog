const Sidebar = ({
  openSidebar,
  setOpenSidebar,
  activeSection,
  setActiveSection,
}) => {
  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-50 ${
        openSidebar ? "w-64" : "w-20 md:w-64 hidden md:block"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {(openSidebar || window.innerWidth >= 768) && (
          <h1 className="text-xl font-bold text-green-600 transition-opacity duration-300">
            StajLog
          </h1>
        )}
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          className="md:hidden p-2 rounded-full hover:bg-gray-200"
        >
          {/* Hamburger Icon */}
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

      {/* Nav */}
      <nav className="py-4">
        <ul className="space-y-2">
          {[
            { key: "dashboard", label: "Dashboard", icon: "home" },
            { key: "orders", label: "Kayıtlar", icon: "clipboard" },
            { key: "kayit_ekle", label: "Kayıt Ekle", icon: "user" },
            { key: "disa_aktar", label: "Dışa Aktar", icon: "user" },
            { key: "profile", label: "Profile", icon: "user" },
          ].map((item) => (
            <li key={item.key}>
              <button
                onClick={() => {
                  setActiveSection(item.key);
                  setOpenSidebar(false);
                }}
                className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                  activeSection === item.key ? "bg-gray-100" : ""
                }`}
              >
                {/* Placeholder for icons */}
                <span className="h-5 w-5 text-gray-600">⬤</span>
                {(openSidebar || window.innerWidth >= 768) && (
                  <span className="text-gray-700">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
