import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userRole, setUserRole] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    confirmPassword: '',
    password: '',
    name: '',
    phone: '',
    role: 'customer'
  });

  const [newBooking, setNewBooking] = useState({
    device: '',
    issue: '',
    date: ''
  });

  // ✅ All bookings removed (starts EMPTY)
  const [bookings, setBookings] = useState([]);

  // 🔹 Remove a booking
  const handleDeleteBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    setUserRole(formData.role);
    setCurrentPage('dashboard');
  };

  const handleSignup = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    alert('Account created successfully! Please login.');
    setCurrentPage('login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      role: 'customer'
    });
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      role: 'customer'
    });
  };

  const handleSubmitBooking = () => {
  if (!newBooking.device || !newBooking.issue || !newBooking.date) {
    alert('Please fill in all booking fields!');
    return;
  }

  const booking = {
    id: bookings.length + 1,
    customer: formData.name || 'Current User',
    phone: newBooking.phone || formData.phone || '0985-000-000', // ✅ Use phone from newBooking or formData
    device: newBooking.device,
    issue: newBooking.issue,
    status: 'pending',
    date: newBooking.date,
    technician: 'Unassigned'
  };

  setBookings([...bookings, booking]);
  setNewBooking({ device: '', issue: '', date: '', phone: formData.phone }); // ✅ Reset with user phone
  alert('Booking created successfully!');
};

  const handleUpdateStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleAssignTechnician = (id, techName) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, technician: techName, status: 'in-progress' } : b));
  };

  // 🔹 Render Pages
  if (currentPage === 'login') {
    return (
      <LoginPage
        formData={formData}
        onInputChange={handleInputChange}
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentPage('signup')}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignupPage
        formData={formData}
        onInputChange={handleInputChange}
        onSignup={handleSignup}
        onSwitchToLogin={() => setCurrentPage('login')}
      />
    );
  }

  if (currentPage === 'dashboard' && userRole === 'customer') {
    return (
      <CustomerDashboard
        formData={formData}
        newBooking={newBooking}
        bookings={bookings}
        onLogout={handleLogout}
        onNewBookingChange={setNewBooking}
        onSubmitBooking={handleSubmitBooking}
        onDeleteBooking={handleDeleteBooking}
      />
    );
  }

  if (currentPage === 'dashboard' && userRole === 'admin') {
    return (
      <AdminDashboard
        bookings={bookings}
        onLogout={handleLogout}
        onAssignTechnician={handleAssignTechnician}
        onUpdateStatus={handleUpdateStatus}
        onDeleteBooking={handleDeleteBooking}
      />
    );
  }

  return null;
}
