document.addEventListener('DOMContentLoaded', function() {
    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendar');
    const upcomingElectionsContainer = document.querySelector('.election-cards');
    
    // Sample election data (in a real app, this would come from an API)
    const elections = [
        {
            id: '1',
            title: 'Student Union Elections',
            start: new Date(new Date().setDate(new Date().getDate() + 5)),
            end: new Date(new Date().setDate(new Date().getDate() + 7)),
            type: 'student-union',
            description: 'Annual elections for Student Union President, Vice President, and other executive positions.',
            location: 'Online',
            color: '#4361ee'
        },
        {
            id: '2',
            title: 'Computer Science Dept. Elections',
            start: new Date(new Date().setDate(new Date().getDate() + 12)),
            end: new Date(new Date().setDate(new Date().getDate() + 14)),
            type: 'department',
            description: 'Vote for your department representatives and faculty board members.',
            location: 'Computer Science Building',
            color: '#3a0ca3'
        },
        {
            id: '3',
            title: 'Sports Council Elections',
            start: new Date(new Date().setDate(new Date().getDate() + 20)),
            end: new Date(new Date().setDate(new Date().getDate() + 21)),
            type: 'sports',
            description: 'Elections for Sports Council Chair and various sports club captains.',
            location: 'Sports Center',
            color: '#f72585'
        },
        {
            id: '4',
            title: 'Music Society Committee',
            start: new Date(new Date().setDate(new Date().getDate() + 25)),
            end: new Date(new Date().setDate(new Date().getDate() + 25)),
            type: 'societies',
            description: 'Elect the new committee members for the Music Society.',
            location: 'Arts Building',
            color: '#4cc9f0'
        },
        {
            id: '5',
            title: 'Debating Society Elections',
            start: new Date(new Date().setDate(new Date().getDate() + 30)),
            end: new Date(new Date().setDate(new Date().getDate() + 30)),
            type: 'societies',
            description: 'Vote for the new president and committee of the Debating Society.',
            location: 'Humanities Building',
            color: '#4cc9f0'
        }
    ];
    
    // Initialize calendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
        },
        events: elections,
        eventClick: function(info) {
            // In a real app, this would show more details about the event
            alert('Election: ' + info.event.title + '\n' +
                  'Start: ' + info.event.start.toLocaleDateString() + '\n' +
                  'End: ' + (info.event.end ? info.event.end.toLocaleDateString() : 'Same day'));
            info.jsEvent.preventDefault();
        },
        eventContent: function(arg) {
            // Custom event rendering
            const eventType = arg.event.extendedProps.type;
            let icon = 'fa-users';
            
            switch(eventType) {
                case 'department':
                    icon = 'fa-graduation-cap';
                    break;
                case 'sports':
                    icon = 'fa-futbol';
                    break;
                case 'societies':
                    icon = 'fa-music';
                    break;
            }
            
            return {
                html: `<div class="fc-event-main">
                    <i class="fas ${icon}"></i> ${arg.event.title}
                </div>`
            };
        }
    });
    
    calendar.render();
    
    // Filter elections by type
    const electionFilter = document.getElementById('election-filter');
    electionFilter.addEventListener('change', function() {
        const filterValue = this.value;
        
        if (filterValue === 'all') {
            calendar.removeAllEvents();
            calendar.addEventSource(elections);
        } else {
            const filteredEvents = elections.filter(event => event.type === filterValue);
            calendar.removeAllEvents();
            calendar.addEventSource(filteredEvents);
        }
        
        updateUpcomingElections(filterValue);
    });
    
    // View toggle buttons
    const monthViewBtn = document.getElementById('month-view');
    const listViewBtn = document.getElementById('list-view');
    
    monthViewBtn.addEventListener('click', function() {
        calendar.changeView('dayGridMonth');
        this.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', function() {
        calendar.changeView('listMonth');
        this.classList.add('active');
        monthViewBtn.classList.remove('active');
    });
    
    // Function to update upcoming elections cards
    function updateUpcomingElections(filter = 'all') {
        let filteredElections = elections;
        
        if (filter !== 'all') {
            filteredElections = elections.filter(election => election.type === filter);
        }
        
        // Sort by date (soonest first)
        filteredElections.sort((a, b) => a.start - b.start);
        
        // Clear existing cards
        upcomingElectionsContainer.innerHTML = '';
        
        // Create cards for each election
        filteredElections.forEach(election => {
            const electionCard = document.createElement('div');
            electionCard.className = 'election-card';
            
            // Format dates
            const startDate = election.start.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const endDate = election.end ? election.end.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }) : null;
            
            // Set type display text
            let typeText = '';
            switch(election.type) {
                case 'student-union':
                    typeText = 'Student Union';
                    break;
                case 'department':
                    typeText = 'Departmental';
                    break;
                case 'sports':
                    typeText = 'Sports Council';
                    break;
                case 'societies':
                    typeText = 'Societies';
                    break;
            }
            
            electionCard.innerHTML = `
                <span class="election-type">${typeText}</span>
                <h4>${election.title}</h4>
                <div class="election-date">
                    <i class="far fa-calendar-alt"></i>
                    ${startDate}${endDate ? ' - ' + endDate : ''}
                </div>
                <p>${election.description}</p>
                <a href="#" class="btn btn-outline">View Details</a>
            `;
            
            upcomingElectionsContainer.appendChild(electionCard);
        });
        
        // If no elections match the filter
        if (filteredElections.length === 0) {
            upcomingElectionsContainer.innerHTML = `
                <div class="no-elections">
                    <p>No upcoming elections match your filter.</p>
                </div>
            `;
        }
    }
    
    // Initial load of upcoming elections
    updateUpcomingElections();
    
    // Add animation to election cards
    const animateElectionCards = function() {
        const cards = document.querySelectorAll('.election-card, .type-card');
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.election-card, .type-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Run once on page load
    animateElectionCards();
    
    // Run on scroll
    window.addEventListener('scroll', animateElectionCards);
});