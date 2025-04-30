 // Sample data
/*let cars = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, license_plate: 'ABC123', daily_rate: 50, is_available: true },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019, license_plate: 'XYZ456', daily_rate: 60, is_available: true },
  ];
  
  let bookings = [];
  
  // DOM Elements
  const carList = document.getElementById('car-list');
  const carSelect = document.getElementById('car-select');
  const bookingForm = document.getElementById('booking-form');
  const bookingHistory = document.getElementById('booking-history');
  const adminCarList = document.getElementById('admin-car-list');
  const adminBookingList = document.getElementById('admin-booking-list');
  const carForm = document.getElementById('car-form');
  
  // Render available cars
  function renderCars(filteredCars = cars) {
    carList.innerHTML = '';
    carSelect.innerHTML = '';
    filteredCars.forEach(car => {
      if (car.is_available) {
        const li = document.createElement('li');
        li.textContent = `${car.make} ${car.model} - $${car.daily_rate}/day`;
        carList.appendChild(li);
  
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.make} ${car.model}`;
        carSelect.appendChild(option);
      }
    });
  }
  
  // Filter cars
  function filterCars() {
    const make = document.getElementById('filter-make').value.toLowerCase();
    const model = document.getElementById('filter-model').value.toLowerCase();
    const price = parseFloat(document.getElementById('filter-price').value);
  
    const filteredCars = cars.filter(car => {
      return (
        car.make.toLowerCase().includes(make) &&
        car.model.toLowerCase().includes(model) &&
        (isNaN(price) || car.daily_rate <= price)
      );
    });
  
    renderCars(filteredCars);
  }
  
  // Book a car
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const carId = parseInt(carSelect.value);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
  
    const car = cars.find(car => car.id === carId);
    if (car && car.is_available) {
      car.is_available = false;
      const booking = {
        id: bookings.length + 1,
        car_id: carId,
        start_date: startDate,
        end_date: endDate,
        status: 'Active',
      };
      bookings.push(booking);
      renderCars();
      renderBookingHistory();
      renderAdminBookings();
      alert('Booking successful!');
    } else {
      alert('Car is not available.');
    }
  });
  
  // Render booking history
  function renderBookingHistory() {
    bookingHistory.innerHTML = '';
    bookings.forEach(booking => {
      const li = document.createElement('li');
      li.textContent = `Car ID: ${booking.car_id}, Dates: ${booking.start_date} to ${booking.end_date}, Status: ${booking.status}`;
      bookingHistory.appendChild(li);
    });
  }
  
  // Add a new car
  carForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const make = document.getElementById('car-make').value;
    const model = document.getElementById('car-model').value;
    const year = parseInt(document.getElementById('car-year').value);
    const license = document.getElementById('car-license').value;
    const rate = parseFloat(document.getElementById('car-rate').value);
  
    const newCar = {
      id: cars.length + 1,
      make,
      model,
      year,
      license_plate: license,
      daily_rate: rate,
      is_available: true,
    };
    cars.push(newCar);
    renderCars();
    renderAdminCars();
    alert('Car added successfully!');
  });
  
  // Render admin car list
  function renderAdminCars() {
    adminCarList.innerHTML = '';
    cars.forEach(car => {
      const li = document.createElement('li');
      li.textContent = `${car.make} ${car.model} - $${car.daily_rate}/day`;
      adminCarList.appendChild(li);
    });
  }
  
  // Render admin booking list
  function renderAdminBookings() {
    adminBookingList.innerHTML = '';
    bookings.forEach(booking => {
      const li = document.createElement('li');
      li.textContent = `Booking ID: ${booking.id}, Car ID: ${booking.car_id}, Dates: ${booking.start_date} to ${booking.end_date}, Status: ${booking.status}`;
      adminBookingList.appendChild(li);
    });
  }
  
  // Initial render
  renderCars();
  renderBookingHistory();
  renderAdminCars();
  renderAdminBookings(); */

  // Sample data
let cars = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, license_plate: 'ABC123', daily_rate: 50, is_available: true },
  { id: 2, make: 'Honda', model: 'Civic', year: 2019, license_plate: 'XYZ456', daily_rate: 60, is_available: true },
];

let bookings = [];

// Render available cars
function renderCars(filteredCars = cars) {
  const carList = document.getElementById('car-list');
  const carSelect = document.getElementById('car-select');
  if (carList) carList.innerHTML = '';
  if (carSelect) carSelect.innerHTML = '';
  filteredCars.forEach(car => {
    if (car.is_available) {
      if (carList) {
        const li = document.createElement('li');
        li.textContent = `${car.make} ${car.model} - $${car.daily_rate}/day`;
        carList.appendChild(li);
      }
      if (carSelect) {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.make} ${car.model}`;
        carSelect.appendChild(option);
      }
    }
  });
}

// Filter cars
function filterCars() {
  const make = document.getElementById('filter-make').value.toLowerCase();
  const model = document.getElementById('filter-model').value.toLowerCase();
  const price = parseFloat(document.getElementById('filter-price').value);

  const filteredCars = cars.filter(car => {
    return (
      car.make.toLowerCase().includes(make) &&
      car.model.toLowerCase().includes(model) &&
      (isNaN(price) || car.daily_rate <= price)
    );
  });

  renderCars(filteredCars);
}

// Book a car
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const carId = parseInt(document.getElementById('car-select').value);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const car = cars.find(car => car.id === carId);
    if (car && car.is_available) {
      car.is_available = false;
      const booking = {
        id: bookings.length + 1,
        car_id: carId,
        start_date: startDate,
        end_date: endDate,
        status: 'Active',
      };
      bookings.push(booking);
      renderCars();
      renderBookingHistory();
      renderAdminBookings();
      alert('Booking successful!');
    } else {
      alert('Car is not available.');
    }
  });
}

// Render booking history
function renderBookingHistory() {
  const bookingHistory = document.getElementById('booking-history');
  if (bookingHistory) {
    bookingHistory.innerHTML = '';
    bookings.forEach(booking => {
      const li = document.createElement('li');
      li.textContent = `Car ID: ${booking.car_id}, Dates: ${booking.start_date} to ${booking.end_date}, Status: ${booking.status}`;
      bookingHistory.appendChild(li);
    });
  }
}

// Add a new car
const carForm = document.getElementById('car-form');
if (carForm) {
  carForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const make = document.getElementById('car-make').value;
    const model = document.getElementById('car-model').value;
    const year = parseInt(document.getElementById('car-year').value);
    const license = document.getElementById('car-license').value;
    const rate = parseFloat(document.getElementById('car-rate').value);

    const newCar = {
      id: cars.length + 1,
      make,
      model,
      year,
      license_plate: license,
      daily_rate: rate,
      is_available: true,
    };
    cars.push(newCar);
    renderCars();
    renderAdminCars();
    alert('Car added successfully!');
  });
}

// Render admin car list
function renderAdminCars() {
  const adminCarList = document.getElementById('admin-car-list');
  if (adminCarList) {
    adminCarList.innerHTML = '';
    cars.forEach(car => {
      const li = document.createElement('li');
      li.textContent = `${car.make} ${car.model} - $${car.daily_rate}/day`;
      adminCarList.appendChild(li);
    });
  }
}

// Render admin booking list
function renderAdminBookings() {
  const adminBookingList = document.getElementById('admin-booking-list');
  if (adminBookingList) {
    adminBookingList.innerHTML = '';
    bookings.forEach(booking => {
      const li = document.createElement('li');
      li.textContent = `Booking ID: ${booking.id}, Car ID: ${booking.car_id}, Dates: ${booking.start_date} to ${booking.end_date}, Status: ${booking.status}`;
      adminBookingList.appendChild(li);
    });
  }
}

// Initial render
renderCars();
renderBookingHistory();
renderAdminCars();
renderAdminBookings();