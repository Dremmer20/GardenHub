// Sidebar Navigation Control Functions
const menuBtn = document.getElementById('menuBtn');
const sideNav = document.getElementById('sideNav');
const closeBtn = document.getElementById('closeBtn');

function openNav() {
    sideNav.style.width = "250px";
}

function closeNav() {
    sideNav.style.width = "0";
}

// Attach cross-platform touch and click handlers to menu interface
if (menuBtn && sideNav && closeBtn) {
    menuBtn.addEventListener('click', openNav);
    menuBtn.addEventListener('touchstart', openNav);

    closeBtn.addEventListener('click', closeNav);
    closeBtn.addEventListener('touchstart', closeNav);

    document.addEventListener('click', (event) => {
        if (!sideNav.contains(event.target) && !menuBtn.contains(event.target)) {
            closeNav();
        }
    });

    document.addEventListener('touchstart', (event) => {
        if (!sideNav.contains(event.target) && !menuBtn.contains(event.target)) {
            closeNav();
        }
    });
}

// Hardcoded Location-Locked Weather Processing Engine
async function processGardenWeather() {
    const loadingLabel = document.getElementById('weather-loading');
    const displayGrid = document.getElementById('weather-forecast-container');
    
    if (!loadingLabel || !displayGrid) return;
    
    // Explicit geographical coordinates mapped to: 7831 N Jordan Lake Rd, Lake Odessa, MI 48849
    const latitude = 42.7845;
    const longitude = -85.1386;
    
    const apiEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`;

    try {
        const networkResponse = await fetch(apiEndpoint);
        if (!networkResponse.ok) throw new Error('Data sync failure');
        const telemetry = await networkResponse.json();
        
        const metrics = telemetry.daily;
        displayGrid.innerHTML = ''; 
        
        // Populate exactly 5 distinct chronological steps
        for (let i = 0; i < 5; i++) {
            const calendarDate = metrics.time[i];
            const peakTemp = Math.round(metrics.temperature_2m_max[i]);
            const floorTemp = Math.round(metrics.temperature_2m_min[i]);
            const moistureChance = metrics.precipitation_probability_max[i];
            const systemCode = metrics.weathercode[i];
            
            // Format chronological data labels
            const dateParser = new Date(calendarDate + 'T00:00:00');
            const visualDayLabel = dateParser.toLocaleDateString('en-US', { weekday: 'short' });
            
            // Map meteorological classifications to active design iconography classes
            let layoutIconClass = 'fas fa-sun';
            if (systemCode >= 1 && systemCode <= 3) {
                layoutIconClass = 'fas fa-cloud-sun';
            } else if (systemCode === 45 || systemCode === 48) {
                layoutIconClass = 'fas fa-smog';
            } else if ((systemCode >= 51 && systemCode <= 55) || (systemCode >= 61 && systemCode <= 65) || (systemCode >= 80 && systemCode <= 82)) {
                layoutIconClass = 'fas fa-cloud-showers-heavy';
            } else if ((systemCode >= 71 && systemCode <= 77) || (systemCode >= 85 && systemCode <= 86)) {
                layoutIconClass = 'fas fa-snowflake';
            } else if (systemCode >= 95) {
                layoutIconClass = 'fas fa-bolt';
            }

            // Assemble component card template instances
            const cardModule = document.createElement('div');
            cardModule.className = 'weather-day-card';
            cardModule.innerHTML = `
                <div class="day-name">${visualDayLabel}</div>
                <div class="weather-icon"><i class="${layoutIconClass}"></i></div>
                <div class="temp-range">${peakTemp}° / ${floorTemp}°F</div>
                <div class="rain-chance"><i class="fas fa-umbrella"></i> ${moistureChance}%</div>
            `;
            displayGrid.appendChild(cardModule);
        }
        
        loadingLabel.style.display = 'none';
        displayGrid.style.display = 'grid';
        
    } catch (processingError) {
        console.error(processingError);
        loadingLabel.innerHTML = `<p style="color: #c62828; font-weight: bold;"><i class="fas fa-exclamation-triangle"></i> Local meteorological sync offline. Please refresh.</p>`;
    }
}

// Launch data acquisition protocols upon frame confirmation
document.addEventListener('DOMContentLoaded', () => {
    processGardenWeather();
});
