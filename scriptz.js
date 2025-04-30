// Sample data for featured cars
const featuredCars = [
    {
      id: 1,
      make: "Toyota",
      model: "Corolla",
      year: 2022,
      price: 50,
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2021,
      price: 55,
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      make: "Ford",
      model: "Mustang",
      year: 2020,
      price: 90,
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      price: 85,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];
  
  // Load featured cars
  function loadFeaturedCars() {
    const carsGrid = document.getElementById('featured-cars-list');
    
    featuredCars.forEach(car => {
      const carCard = document.createElement('div');
      carCard.className = 'car-card';
      carCard.innerHTML = `
        <div class="car-image" style="background-image: url('${car.image}')"></div>
        <div class="car-info">
          <h3>${car.make} ${car.model}</h3>
          <p>Year: ${car.year}</p>
          <p class="car-price">$${car.price}/day</p>
        </div>
      `;
      carsGrid.appendChild(carCard);
    });
  }
  
  // Animate stats counter
  function animateStats() {
    const carsCount = document.getElementById('cars-count');
    const bookingsCount = document.getElementById('bookings-count');
    const usersCount = document.getElementById('users-count');
    
    const targetCars = 150;
    const targetBookings = 850;
    const targetUsers = 320;
    
    let currentCars = 0;
    let currentBookings = 0;
    let currentUsers = 0;
    
    const interval = setInterval(() => {
      if (currentCars < targetCars) {
        currentCars += 5;
        carsCount.textContent = currentCars;
      }
      
      if (currentBookings < targetBookings) {
        currentBookings += 17;
        bookingsCount.textContent = currentBookings;
      }
      
      if (currentUsers < targetUsers) {
        currentUsers += 4;
        usersCount.textContent = currentUsers;
      }
      
      if (currentCars >= targetCars && currentBookings >= targetBookings && currentUsers >= targetUsers) {
        clearInterval(interval);
      }
    }, 30);
  }
  
  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedCars();
    
    // Start animation when stats section is in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        observer.unobserve(entries[0].target);
      }
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.stats'));
  });



  // Optional JavaScript for enhanced interactivity
document.querySelectorAll('.btn').forEach(button => {
  // Add ripple effect on click
  button.addEventListener('click', function(e) {
    // Only add ripple if it's not a link to another page
    if (!this.getAttribute('href') || this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      setTimeout(() => {
        ripple.remove();
        
        // If it's the demo button, scroll to demo section
        if (this.classList.contains('secondary-btn')) {
          document.querySelector('#demo').scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 600);
    }
  });
});

// Add this to your existing CSS if using the ripple effect
.ripple {
  position: absolute;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}