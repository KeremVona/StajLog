const Dashboard = ({ username, logs }) => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">
          Hoşgeldin, {username}!
        </h1>
        <p className="text-gray-600">Stajın nasıl gidiyor?</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Toplam kayıtlar
          </h2>
          <p className="text-2xl font-bold text-green-600">{logs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Pending Orders
          </h2>
          <p className="text-2xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Spent</h2>
          <p className="text-2xl font-bold text-blue-600">$500.00</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
