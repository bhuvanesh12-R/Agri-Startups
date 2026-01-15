// Mock Data for Startups
const startups = [
    {
        id: 1,
        name: "CropIn",
        logo: "ri-plant-line",
        description: "SaaS based farm management software to digitize farms.",
        tech: "IoT",
        state: "Karnataka",
        funding: "Series B+",
        founder: "Krishna Kumar",
        lat: 12.9716,
        lng: 77.5946
    },
    {
        id: 2,
        name: "Ninjacart",
        logo: "ri-truck-line",
        description: "Tech-driven supply chain for fresh produce.",
        tech: "Marketplace",
        state: "Karnataka",
        funding: "Series B+",
        founder: "Thirukumaran Nagarajan",
        lat: 13.0,
        lng: 77.6
    },
    {
        id: 3,
        name: "DeHaat",
        logo: "ri-store-2-line",
        description: "Full-stack agricultural service provider.",
        tech: "Marketplace",
        state: "Delhi",
        funding: "Series B+",
        founder: "Shashank Kumar",
        lat: 28.6139,
        lng: 77.2090
    },
    {
        id: 4,
        name: "Fasal",
        logo: "ri-sensor-line",
        description: "AI-powered IoT platform for precision agriculture.",
        tech: "IoT",
        state: "Karnataka",
        funding: "Series A",
        founder: "Ananda Verma",
        lat: 12.93,
        lng: 77.62
    },
    {
        id: 5,
        name: "AgroStar",
        logo: "ri-smartphone-line",
        description: "Direct-to-farmer digital platform.",
        tech: "Marketplace",
        state: "Maharashtra",
        funding: "Series B+",
        founder: "Shardul Sheth",
        lat: 18.5204,
        lng: 73.8567
    },
    {
        id: 6,
        name: "BharatAgri",
        logo: "ri-android-line",
        description: "Algorithmic farming advisory.",
        tech: "Biotech",
        state: "Maharashtra",
        funding: "Series A",
        founder: "Siddharth Dialani",
        lat: 18.55,
        lng: 73.88
    },
    {
        id: 7,
        name: "General Aeronautics",
        logo: "ri-flight-takeoff-line",
        description: "Drones for precision crop protection.",
        tech: "Drones",
        state: "Karnataka",
        funding: "Series A",
        founder: "Abhishek Burman",
        lat: 13.05,
        lng: 77.55
    },
    {
        id: 8,
        name: "WayCool",
        logo: "ri-fridge-line",
        description: "Farm-to-fork supply chain.",
        tech: "Marketplace",
        state: "Tamil Nadu",
        funding: "Series B+",
        founder: "Karthik Jayaraman",
        lat: 13.0827,
        lng: 80.2707
    },
    {
        id: 9,
        name: "Bijak",
        logo: "ri-money-dollar-circle-line",
        description: "B2B marketplace for agricultural commodities.",
        tech: "Marketplace",
        state: "Delhi",
        funding: "Series B+",
        founder: "Nukul Upadhye",
        lat: 28.7041,
        lng: 77.1025
    },
    {
        id: 10,
        name: "Intello Labs",
        logo: "ri-eye-line",
        description: "AI-based quality grading of commodities.",
        tech: "Robotics",
        state: "Haryana",
        funding: "Series A",
        founder: "Milan Sharma",
        lat: 28.4595,
        lng: 77.0266
    },
    {
        id: 11,
        name: "Aibono",
        logo: "ri-seedling-line",
        description: "Seed-to-plate platform for perishables.",
        tech: "Biotech",
        state: "Tamil Nadu",
        funding: "Seed",
        founder: "Vivek Rajkumar",
        lat: 12.98,
        lng: 80.25
    },
    {
        id: 12,
        name: "Tartar Sense",
        logo: "ri-robot-line",
        description: "Small agricultural robots for weed control.",
        tech: "Robotics",
        state: "Karnataka",
        funding: "Seed",
        founder: "Jaisimha Rao",
        lat: 12.95,
        lng: 77.65
    }
];

// State
let comparisonList = [];

// DOM Elements
const grid = document.getElementById('startup-grid');
const searchInput = document.getElementById('search-input');
const filterState = document.getElementById('filter-state');
const filterTech = document.getElementById('filter-tech');
const filterFunding = document.getElementById('filter-funding');
const comparisonBar = document.getElementById('comparison-bar');
const compareCountSpan = document.getElementById('compare-count');
const compareBarCountSpan = document.getElementById('compare-bar-count');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderStartups(startups);
    initMap();
    initCharts();
    setupEventListeners();
});

// Render Startups
function renderStartups(data) {
    grid.innerHTML = '';
    
    if(data.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No startups found matching your criteria.</div>';
        return;
    }

    data.forEach(startup => {
        const isSelected = comparisonList.includes(startup.id);
        const card = document.createElement('div');
        card.className = 'startup-card glass';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-logo">
                    <i class="${startup.logo}"></i>
                </div>
                <span class="funding-tag">${startup.funding}</span>
            </div>
            <div class="card-body">
                <h3>${startup.name}</h3>
                <span class="tech-stack">${startup.tech}</span>
                <p>${startup.description}</p>
                <div class="meta-info">
                    <span><i class="ri-map-pin-line"></i> ${startup.state}</span>
                    <span><i class="ri-user-line"></i> ${startup.founder}</span>
                </div>
            </div>
            <div class="card-actions">
                <label class="compare-checkbox">
                    <input type="checkbox" onchange="toggleCompare(${startup.id})" ${isSelected ? 'checked' : ''}>
                    Compare
                </label>
                <a href="#" class="btn-primary" style="padding: 6px 16px; font-size: 0.9rem;">View Profile</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtering Logic
function filterStartups() {
    const query = searchInput.value.toLowerCase();
    const state = filterState.value;
    const tech = filterTech.value;
    const funding = filterFunding.value;

    const filtered = startups.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(query) || 
                              s.description.toLowerCase().includes(query) ||
                              s.founder.toLowerCase().includes(query);
        const matchesState = state ? s.state === state : true;
        const matchesTech = tech ? s.tech === tech : true;
        const matchesFunding = funding ? s.funding === funding : true;

        return matchesSearch && matchesState && matchesTech && matchesFunding;
    });

    renderStartups(filtered);
}

function setupEventListeners() {
    searchInput.addEventListener('input', filterStartups);
    filterState.addEventListener('change', filterStartups);
    filterTech.addEventListener('change', filterStartups);
    filterFunding.addEventListener('change', filterStartups);
}

// Comparison Logic
window.toggleCompare = function(id) {
    if (comparisonList.includes(id)) {
        comparisonList = comparisonList.filter(item => item !== id);
    } else {
        if (comparisonList.length >= 3) {
            alert("You can compare up to 3 startups only.");
            // Revert checkbox
            filterStartups(); // Lazy re-render to fix checkbox state
            return;
        }
        comparisonList.push(id);
    }
    updateComparisonUI();
};

function updateComparisonUI() {
    compareCountSpan.innerText = comparisonList.length;
    compareBarCountSpan.innerText = comparisonList.length;

    if (comparisonList.length > 0) {
        comparisonBar.classList.remove('hidden');
    } else {
        comparisonBar.classList.add('hidden');
    }
}

window.clearComparison = function() {
    comparisonList = [];
    updateComparisonUI();
    filterStartups(); // Re-render to clear checkboxes
};

window.showComparisonModal = function() {
    if (comparisonList.length < 2) {
        alert("Select at least 2 startups to compare.");
        return;
    }

    const modal = document.getElementById('comparison-modal');
    const container = document.getElementById('comparison-table-container');
    
    // Get selected startup objects
    const selectedStartups = startups.filter(s => comparisonList.includes(s.id));

    let html = '<table class="comparison-table">';
    
    // Headers
    html += '<tr><th>Feature</th>';
    selectedStartups.forEach(s => html += `<td>${s.name}</td>`);
    html += '</tr>';

    // Rows
    const fields = [
        { label: 'Technology', key: 'tech' },
        { label: 'Funding Stage', key: 'funding' },
        { label: 'Location', key: 'state' },
        { label: 'Founder', key: 'founder' },
        { label: 'Description', key: 'description' }
    ];

    fields.forEach(field => {
        html += `<tr><th>${field.label}</th>`;
        selectedStartups.forEach(s => html += `<td>${s[field.key]}</td>`);
        html += '</tr>';
    });

    html += '</table>';
    container.innerHTML = html;
    openModal('comparison-modal');
};

// Modal Handling
window.openModal = function(id) {
    document.getElementById(id).style.display = 'flex';
};

window.closeModal = function(id) {
    document.getElementById(id).style.display = 'none';
};

// Close modal on click outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Initialize Map
function initMap() {
    // Centered on India
    const map = L.map('india-map').setView([20.5937, 78.9629], 5);

    // Dark styled tiles using CartoDB Dark Matter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Add Markers
    startups.forEach(s => {
        L.circleMarker([s.lat, s.lng], {
            color: '#00dc82',
            fillColor: '#00dc82',
            fillOpacity: 0.8,
            radius: 8
        }).addTo(map)
        .bindPopup(`<b>${s.name}</b><br>${s.tech}<br>${s.state}`);
    });
}

// Initialize Charts
function initCharts() {
    // Chart defaults for consistency
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.1)';

    // 1. Funding Distribution
    const fundingCtx = document.getElementById('fundingChart').getContext('2d');
    new Chart(fundingCtx, {
        type: 'doughnut',
        data: {
            labels: ['Seed', 'Series A', 'Series B+', 'Bootstrapped'],
            datasets: [{
                data: [2, 4, 5, 1], // Mock counts based on data
                backgroundColor: ['#f1c40f', '#3498db', '#9b59b6', '#2ecc71'],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                legend: { position: 'bottom', labels: { color: '#fff' } }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });

    // 2. Tech Focus
    const techCtx = document.getElementById('techChart').getContext('2d');
    new Chart(techCtx, {
        type: 'bar',
        data: {
            labels: ['IoT', 'Marketplace', 'Drones', 'Biotech', 'Robotics'],
            datasets: [{
                label: 'Startups',
                data: [3, 4, 1, 2, 2],
                backgroundColor: '#00dc82',
                borderRadius: 4
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#fff' } },
                x: { grid: { display: false }, ticks: { color: '#fff' } }
            },
            plugins: { legend: { display: false } },
            responsive: true,
            maintainAspectRatio: true
        }
    });

    // 3. Growth (Mock)
    const growthCtx = document.getElementById('growthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'New Startups',
                data: [12, 19, 30, 45, 60, 85],
                borderColor: '#36d1dc',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(54, 209, 220, 0.2)'
            }]
        },
        options: {
            scales: {
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#fff' }, grid: { display: false } }
            },
            plugins: { legend: { display: false } },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}
