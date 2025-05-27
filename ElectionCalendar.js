document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Election data
    const elections = [
        {
            id: '1',
            title: 'Student Union Presidential Election',
            type: 'University-wide • Presidential Race',
            category: 'active',
            dates: [
                { label: 'Voting Period', value: 'Dec 1-3, 2023', icon: 'calendar' },
                { label: 'Candidates', value: '4 Candidates', icon: 'users' },
                { label: 'Votes cast', value: '1,247 votes cast so far', icon: 'chart-bar' }
            ],
            countdown: {
                label: 'Time Remaining',
                end: '2023-12-03T23:59:59'
            },
            progress: 44,
            target: '2,847 voters',
            actions: [
                { text: 'Vote Now', type: 'primary', url: 'voting.html' },
                { text: 'View Results', type: 'outline', url: 'candidate.html' }
            ]
        },
        {
            id: '2',
            title: 'Engineering Faculty Representative',
            type: 'Faculty-specific • Representative Election',
            category: 'active',
            dates: [
                { label: 'Voting Period', value: 'Nov 30 - Dec 2, 2023', icon: 'calendar' },
                { label: 'Candidates', value: '3 Candidates', icon: 'users' },
                { label: 'Votes cast', value: '456 votes cast so far', icon: 'chart-bar' }
            ],
            countdown: {
                label: 'Time Remaining',
                end: '2023-12-02T23:59:59'
            },
            progress: 67,
            target: '680 voters',
            actions: [
                { text: 'Vote Now', type: 'primary', url: 'voting.html' },
                { text: 'View Candidates', type: 'outline', url: 'candidate.html' }
            ]
        },
        {
            id: '3',
            title: 'Sports Committee Elections',
            type: 'Committee • Multiple Positions',
            category: 'upcoming',
            dates: [
                { label: 'Voting', value: 'Dec 10-12, 2023', icon: 'calendar' },
                { label: 'Candidates', value: '12 Candidates (6 positions)', icon: 'users' },
                { label: 'Registration', value: 'Registration closes Dec 8', icon: 'clipboard-list' }
            ],
            countdown: {
                label: 'Voting Starts In',
                start: '2023-12-10T09:00:00'
            },
            actions: [
                { text: 'View Candidates', type: 'outline', url: 'candidate.html' },
                { text: 'Set Reminder', type: 'outline', url: '#' }
            ]
        },
        {
            id: '4',
            title: 'Cultural Society Leadership',
            type: 'Society • Executive Positions',
            category: 'upcoming',
            dates: [
                { label: 'Voting', value: 'Dec 15-17, 2023', icon: 'calendar' },
                { label: 'Candidates', value: '8 Candidates (4 positions)', icon: 'users' },
                { label: 'Campaign', value: 'Campaign period active', icon: 'bullhorn' }
            ],
            countdown: {
                label: 'Voting Starts In',
                start: '2023-12-15T09:00:00'
            },
            actions: [
                { text: 'View Campaigns', type: 'outline', url: 'candidate.html' },
                { text: 'Set Reminder', type: 'outline', url: '#' }
            ]
        },
        {
            id: '5',
            title: 'Dormitory Council Elections',
            type: 'Residential • Council Positions',
            category: 'completed',
            dates: [
                { label: 'Completed', value: 'Nov 25-27, 2023', icon: 'calendar' },
                { label: 'Results', value: '15 Candidates elected', icon: 'users' },
                { label: 'Turnout', value: 'Final turnout: 78%', icon: 'chart-bar' }
            ],
            actions: [
                { text: 'View Results', type: 'outline', url: 'candidate.html' },
                { text: 'Download Report', type: 'outline', url: 'home.html' }
            ]
        },
        {
            id: '6',
            title: 'Academic Senate Student Reps',
            type: 'Academic • Senate Representation',
            category: 'completed',
            dates: [
                { label: 'Completed', value: 'Nov 20-22, 2023', icon: 'calendar' },
                { label: 'Results', value: '6 Representatives elected', icon: 'users' },
                { label: 'Turnout', value: 'Final turnout: 52%', icon: 'chart-bar' }
            ],
            actions: [
                { text: 'View Results', type: 'outline', url: 'candidate.html' },
                { text: 'Contact Reps', type: 'outline', url: '#' }
            ]
        }
    ];

    // Render election cards
    const electionGrid = document.getElementById('electionGrid');
    
    function renderElections(filter = 'all') {
        electionGrid.innerHTML = '';
        
        const filteredElections = filter === 'all' 
            ? elections 
            : elections.filter(election => election.category === filter);
        
        filteredElections.forEach(election => {
            const electionCard = document.createElement('div');
            electionCard.className = `election-card ${election.category}`;
            electionCard.dataset.category = election.category;
            
            // Status badge
            let statusText = '';
            let statusClass = '';
            
            switch(election.category) {
                case 'active':
                    statusText = 'Live Now';
                    statusClass = 'status-active';
                    break;
                case 'upcoming':
                    statusText = 'Upcoming';
                    statusClass = 'status-upcoming';
                    break;
                case 'completed':
                    statusText = 'Completed';
                    statusClass = 'status-completed';
                    break;
            }
            
            // Date calculation for countdown
            let countdownTime = '';
            if (election.countdown) {
                const targetDate = election.countdown.end 
                    ? new Date(election.countdown.end) 
                    : new Date(election.countdown.start);
                const now = new Date();
                const diff = targetDate - now;
                
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    
                    countdownTime = `${days}d ${hours}h ${minutes}m`;
                } else {
                    countdownTime = '0d 0h 0m';
                }
            }
            
            // Build card HTML
            electionCard.innerHTML = `
                <div class="election-header">
                    <div class="election-status ${statusClass}">${statusText}</div>
                </div>
                <h3 class="election-title">${election.title}</h3>
                <p class="election-type">${election.type}</p>
                
                <div class="election-details">
                    ${election.dates.map(date => `
                        <div class="detail-item">
                            <i class="fas fa-${date.icon}"></i>
                            <span>${date.label}: ${date.value}</span>
                        </div>
                    `).join('')}
                </div>
                
                ${election.countdown ? `
                <div class="countdown">
                    <div class="countdown-label">${election.countdown.label}</div>
                    <div class="countdown-time">${countdownTime}</div>
                </div>
                ` : ''}
                
                ${election.progress ? `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${election.progress}%"></div>
                </div>
                <div class="participation-stats">
                    <span>Turnout: ${election.progress}%</span>
                    <span>Target: ${election.target}</span>
                </div>
                ` : ''}
                
                <div class="election-actions">
                    ${election.actions.map(action => `
                        <a href="${action.url}" class="btn btn-${action.type}">${action.text}</a>
                    `).join('')}
                </div>
            `;
            
            electionGrid.appendChild(electionCard);
        });
    }
    
    // Initial render
    renderElections();
    
    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            renderElections(filter);
        });
    });
    
    // View toggle functionality
    const monthViewBtn = document.getElementById('monthView');
    const listViewBtn = document.getElementById('listView');
    
    monthViewBtn.addEventListener('click', function() {
        // In a real implementation, this would switch to a calendar month view
        alert('Month view would be displayed here. This would show a traditional calendar layout with election dates marked.');
    });
    
    listViewBtn.addEventListener('click', function() {
        // We're already in list view
        alert('You are already viewing the list layout.');
    });
    
    // Update countdowns every minute
    setInterval(() => {
        const countdownElements = document.querySelectorAll('.countdown-time');
        
        countdownElements.forEach(el => {
            const endDate = new Date(el.dataset.end || el.dataset.start);
            const now = new Date();
            const diff = endDate - now;
            
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                
                el.textContent = `${days}d ${hours}h ${minutes}m`;
            } else {
                el.textContent = '0d 0h 0m';
                // You might want to trigger a refresh here if the election has ended
            }
        });
    }, 60000);
    
    // Add animation to election cards
    const animateElectionCards = function() {
        const cards = document.querySelectorAll('.election-card');
        
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
    document.querySelectorAll('.election-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    // Run once on page load
    animateElectionCards();
    
    // Run on scroll
    window.addEventListener('scroll', animateElectionCards);
});