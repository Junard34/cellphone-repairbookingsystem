import React from 'react';

const CustomerDashboard = ({ 
  formData, 
  newBooking, 
  bookings, 
  onLogout, 
  onNewBookingChange, 
  onSubmitBooking 
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">📱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* New Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Book a Repair</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Device Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Device Model</label>
              <input
                type="text"
                value={newBooking.device}
                onChange={(e) => onNewBookingChange({ ...newBooking, device: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="iPhone 12"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="text"
                value={newBooking.phone || formData.phone}
                onChange={(e) => onNewBookingChange({ ...newBooking, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0912-345-6789"
              />
            </div>

            {/* Issue Description - Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
              <select
                value={newBooking.issue}
                onChange={(e) => onNewBookingChange({ ...newBooking, issue: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cracked Screen">Cracked Screen</option>
                <option value="Battery Replacement">Battery Replacement</option>
                <option value="Charging Issue">Charging Issue</option>
                <option value="Overheating">Overheating</option>
                <option value="Camera Not Working">Camera Not Working</option>
                <option value="Microphone Issue">Microphone Issue</option>
                <option value="Speaker Issue">Speaker Issue</option>
                <option value="Water Damage">Water Damage</option>
                <option value="Software Problem">Software Problem</option>
              </select>
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <input
                type="date"
                value={newBooking.date}
                onChange={(e) => onNewBookingChange({ ...newBooking, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              onClick={onSubmitBooking}
              className="md:col-span-3 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Submit Booking
            </button>
          </div>
        </div>

        {/* My Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Device</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Issue</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{booking.id}</td>
                    <td className="px-4 py-3 text-sm">{booking.device}</td>
                    <td className="px-4 py-3 text-sm">{booking.phone}</td>
                    <td className="px-4 py-3 text-sm">{booking.issue}</td>
                    <td className="px-4 py-3 text-sm">{booking.date}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CustomerDashboard;

