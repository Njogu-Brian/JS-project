document.addEventListener('DOMContentLoaded', () => {
    // Carousel Section Image Background Change with Zoom Effect
    let currentIndex = 0;
    const images = [
        'assets/webimage (1).jpg',
        'assets/webimage (1).webp',
        'assets/webimage (2).webp',
        'assets/webimage (3).webp',
        'assets/webimage (4).webp',
        'assets/webimage (5).webp'
    ];
    const carouselSection = document.getElementById('carousel-section');

    function updateCarouselImage() {
        if (carouselSection) {
            // Remove existing img if present
            const existingImage = document.querySelector('#carousel-section img');
            if (existingImage) {
                existingImage.remove();
            }

            // Create new img element for the next image
            const imgElement = document.createElement('img');
            imgElement.src = images[currentIndex];
            imgElement.classList.add('carousel-image');
            imgElement.style.zIndex = '1'; 
            carouselSection.appendChild(imgElement);

            currentIndex = (currentIndex + 1) % images.length;
        }
    }

    setInterval(updateCarouselImage, 8000); // Change image every 8 seconds
    updateCarouselImage();

    // Enrollment Modal
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    const enrollmentModal = document.getElementById('enrollment-modal');
    const closeEnrollmentModal = document.getElementById('close-enrollment-modal');

    enrollButtons.forEach(button => {
        button.addEventListener('click', () => {
            enrollmentModal.style.display = 'block';
        });
    });

    closeEnrollmentModal.addEventListener('click', () => {
        enrollmentModal.style.display = 'none';
    });

    document.getElementById('enrollment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('You have successfully enrolled!');
        enrollmentModal.style.display = 'none';
    });

    // Financial Aid Modal
    const applyFinancialAidButton = document.getElementById('apply-financial-aid');
    const financialAidModal = document.getElementById('financial-aid-modal');
    const closeFinancialAidModal = document.getElementById('close-financial-aid-modal');

    applyFinancialAidButton.addEventListener('click', () => {
        financialAidModal.style.display = 'block';
    });

    closeFinancialAidModal.addEventListener('click', () => {
        financialAidModal.style.display = 'none';
    });

    document.getElementById('financial-aid-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Your financial aid application has been submitted successfully!');
        financialAidModal.style.display = 'none';
    });

    // Contact Form Submission
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
    });

    // Dark/Light Mode Toggle
    const toggleModeButton = document.getElementById('toggle-mode');
    toggleModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggleModeButton.querySelector('.fas');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-lightbulb');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-lightbulb');
        }

        // Update colors for dark mode
        if (document.body.classList.contains('dark-mode')) {
            document.documentElement.style.setProperty('--background-color', '#121212');
            document.documentElement.style.setProperty('--text-color', '#ffffff');
            document.documentElement.style.setProperty('--header-background', '#1f1f1f');
            document.documentElement.style.setProperty('--button-background', '#333333');
            document.documentElement.style.setProperty('--modal-background', '#1f1f1f');
            document.documentElement.style.setProperty('--modal-box-shadow', '0 4px 8px rgba(255, 255, 255, 0.1)');
        } else {
            document.documentElement.style.setProperty('--background-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--header-background', '#004aad');
            document.documentElement.style.setProperty('--button-background', '#004aad');
            document.documentElement.style.setProperty('--modal-background', '#ffffff');
            document.documentElement.style.setProperty('--modal-box-shadow', '0 4px 8px rgba(0, 0, 0, 0.1)');
        }

        // Update modal elements
        document.querySelectorAll('.modal-content').forEach(modal => {
            if (document.body.classList.contains('dark-mode')) {
                modal.style.backgroundColor = '#1f1f1f';
                modal.style.color = '#ffffff';
                modal.style.zIndex = '2'; 
            } else {
                modal.style.backgroundColor = '#ffffff';
                modal.style.color = '#000000';
                modal.style.zIndex = '2';
            }
        });
        const carouselContent = document.getElementById('carousel-content');
        if (carouselContent) {
            carouselContent.style.zIndex = '3'; 
        }
    });

    // Courses List from db.json
    fetch('db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const coursesList = document.getElementById('courses-container');

            data.courses.forEach(course => {
                // Add course to the courses container
                const courseBox = document.createElement('div');
                courseBox.classList.add('course-box');

                const courseTitle = document.createElement('h3');
                courseTitle.textContent = course.name;
                courseBox.appendChild(courseTitle);

                const courseDescription = document.createElement('p');
                courseDescription.textContent = course.description;
                courseBox.appendChild(courseDescription);

                const courseButton = document.createElement('button');
                courseButton.textContent = 'More Details';
                courseButton.classList.add('btn', 'btn-info');
                courseButton.addEventListener('click', () => showCourseDetails(course));
                courseBox.appendChild(courseButton);

                coursesList.appendChild(courseBox);
            });
        })
        .catch(error => console.error('Error fetching course data:', error));

    // Show course details in a modal
    function showCourseDetails(course) {
        document.getElementById('course-title').textContent = course.name;
        document.getElementById('course-description').textContent = course.description;
        document.getElementById('course-duration').textContent = `Duration: ${course.duration}`;

        const modulesList = document.getElementById('course-modules');
        modulesList.innerHTML = '';
        course.modules.forEach(module => {
            const moduleItem = document.createElement('li');
            moduleItem.textContent = module;
            modulesList.appendChild(moduleItem);
        });

        document.getElementById('course-modal').style.display = 'block';
    }

    // Close course modal
    document.getElementById('close-modal').addEventListener('click', () => {
        document.getElementById('course-modal').style.display = 'none';
    });

    // Fetch and Display Current Weather with Individual Containers
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=5d655b2fc2fc94c367e6b53c620cf870&units=metric')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const weatherContainer = document.getElementById('weather-container');
            weatherContainer.innerHTML = ''; // Clear existing content

            if (data.weather && data.weather.length > 0) {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const pressure = data.main.pressure;
                const feelsLike = data.main.feels_like;
                const minTemp = data.main.temp_min;
                const maxTemp = data.main.temp_max;

                // Create Containers for Weather Info
                const createWeatherBox = (iconClass, value, description, additionalClass) => {
                    const box = document.createElement('div');
                    box.className = `weather-box ${additionalClass}`;
                    
                    const icon = document.createElement('i');
                    icon.className = `weather-icon ${iconClass}`;
                    box.appendChild(icon);

                    const info = document.createElement('div');
                    info.className = 'weather-info';
                    info.textContent = `${description}: ${value}`;
                    box.appendChild(info);

                    weatherContainer.appendChild(box);
                };

                // Add Weather Info Containers
                createWeatherBox('fas fa-cloud', weatherDescription, 'Condition', 'cloudy');
                createWeatherBox('fas fa-temperature-high', `${temperature}°C`, 'Temperature', 'sunny');
                createWeatherBox('fas fa-tint', `${humidity}%`, 'Humidity', 'rainy');
                createWeatherBox('fas fa-wind', `${windSpeed} m/s`, 'Wind Speed', 'windy');
                createWeatherBox('fas fa-tachometer-alt', `${pressure} hPa`, 'Pressure', 'cloudy');
                createWeatherBox('fas fa-thermometer-half', `${feelsLike}°C`, 'Feels Like', 'sunny');
                createWeatherBox('fas fa-thermometer-quarter', `${minTemp}°C`, 'Min Temperature', 'rainy');
                createWeatherBox('fas fa-thermometer-full', `${maxTemp}°C`, 'Max Temperature', 'sunny');
            } else {
                weatherContainer.innerHTML = '<p>Weather data unavailable</p>';
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));

    // Bootstrap Dropdown Fix
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.matches('.dropdown-toggle')) {
            const dropdownMenus = document.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                if (menu.classList.contains('show')) {
                    menu.classList.remove('show');
                }
            });
        }
    });

    // Center Modals and Ensure They Don't Cover Navbar
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.zIndex = '1000';
        modal.style.width = '80%';
        modal.style.maxWidth = '500px';
    });

    const modalContent = document.querySelectorAll('.modal-content');
    modalContent.forEach(content => {
        content.style.padding = '20px';
        content.style.backgroundColor = '#fff';
        content.style.borderRadius = '10px';
        content.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});
