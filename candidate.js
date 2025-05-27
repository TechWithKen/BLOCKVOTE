document.addEventListener('DOMContentLoaded', function() {
    // Sample candidate data (in a real app, this would come from an API)
    const candidatesData = [
        {
            id: 1,
            name: "Kehinde Ajasa",
            position: "President",
            department: "Computer Science",
            level: "400",
            bio: "4th year Computer Science student with leadership experience in multiple student organizations. Committed to improving campus facilities and student services.",
            //image: "https://randomuser.me/api/portraits/men/32.jpg",
            manifesto: "If elected, I will focus on three key areas: improving student housing conditions, increasing transparency in student union finances, and expanding mental health services on campus. With my experience as current Vice President, I have the knowledge to implement these changes effectively.",
            social: {
                twitter: "https://twitter.com/kehindeajasa",
                instagram: "https://instagram.com/kehindeajasa"
            },
            votes: 1245,
            iconClass: "fas fa-user"  // Add this

        },
        {
            id: 2,
            name: "Funmi Olamide",
            position: "President",
            department: "Political Science",
            level: "300",
            bio: "3rd year Political Science student. Class representative for 2 years. Organized several successful campus events.",
            //image: "https://randomuser.me/api/portraits/women/44.jpg",
            iconClass: "fas fa-user", // Add this,,
            manifesto: "My platform centers on student empowerment through better representation. I will establish weekly town halls, create a more accessible complaint system, and fight for lower tuition fees. Together, we can make our voices heard!",
            social: {
                twitter: "https://twitter.com/sarahj",
                linkedin: "https://linkedin.com/in/sarahj"
            },
            votes: 987
        },
        {
            id: 3,
            name: "Adeoye Adeseni",
            position: "Vice President",
            department: "Economics",
            level: "400",
            iconClass: "fas fa-user", // Add this

            bio: "Head of Finance Committee with experience managing budgets for student organizations.",
            //image: "https://randomuser.me/api/portraits/men/67.jpg",
            manifesto: "As your VP, I'll ensure responsible budgeting while expanding funding for student clubs. My economic background gives me the skills to maximize our resources for all students.",
            social: {
                instagram: "https://instagram.com/michaelc"
            },
            votes: 876
        },
        {
            id: 4,
            name: "Blessing Okoro",
            position: "Vice President",
            department: "Engineering",
            level: "400",
            bio: "Head of Finance Committee with experience managing budgets for student organizations.",
            //image: "https://randomuser.me/api/portraits/men/67.jpg",
            iconClass: "fas fa-user",  // Add this

            manifesto: "As your VP, I'll ensure responsible budgeting while expanding funding for student clubs. My economic background gives me the skills to maximize our resources for all students.",
            social: {
                instagram: "https://instagram.com/Okoroviccylc"
            },
            votes: 900
        },
        {
            id: 5,
            name: "Ibrahim Lawal",
            position: "General Secretary",
            department: "Law",
            level: "300",
            iconClass: "fas fa-user",// Add this

            bio: "Organized 5 major campus events. Passionate about student engagement.",
            //image: "https://randomuser.me/api/portraits/women/63.jpg",
            manifesto: "Transparency and communication will be my top priorities. I'll implement a new digital notice board system, ensure meeting minutes are published promptly, and make union documents more accessible.",
            social: {
                twitter: "https://twitter.com/ibrahimi",
                facebook: "https://facebook.com/lawalibrahim"
            },
            votes: 765
        },
        {
            id: 6,
            name: "Chioma Nwanko",
            position: "General Secretary",
            department: "Computer Science",
            level: "300",
            iconClass: "fas fa-user", // Add this

            bio: "Organized 5 major campus events. Passionate about student engagement.",
            //image: "https://randomuser.me/api/portraits/women/63.jpg",
            manifesto: "Transparency and communication will be my top priorities. I'll implement a new digital notice board system, ensure meeting minutes are published promptly, and make union documents more accessible.",
            social: {
                twitter: "https://twitter.com/Chioma",
                facebook: "https://facebook.com/chioma"
            },
            votes: 700
        },
        {
            id: 7,
            name: "Fatima Bello",
            position: "Treasurer",
            department: "Accounting",
            level: "400",
            iconClass: "fas fa-user",  // Add this

            bio: "Former class treasurer with experience in financial management.",
            //image: "https://randomuser.me/api/portraits/men/22.jpg",
            manifesto: "I'll introduce quarterly financial reports that every student can understand, create a grant system for student initiatives, and work to reduce unnecessary spending.",
        },
        {
            id: 8,
            name: "David Okafor",
            position: "Treasurer",
            department: "Economics",
            level: "300",
            iconClass: "fas fa-user",  // Add this

            bio: "Former class treasurer with experience in financial management.",
            //image: "https://randomuser.me/api/portraits/men/22.jpg",
            manifesto: "I'll introduce quarterly financial reports that every student can understand, create a grant system for student initiatives, and work to reduce unnecessary spending.",
        },
        {
            id: 9,
            name: "Grace Emeka",
            position: "Welfare Director",
            department: "Psychology",
            level: "300",
            iconClass: "fas fa-user",  // Add this

            bio: "Mental health advocate with counseling training.",
            //image: "https://randomuser.me/api/portraits/women/33.jpg",
            manifesto: "Student wellbeing is my top priority. I'll expand peer support programs, improve counseling services, and create safe spaces across campus for all students.",
            social: {
                instagram: "https://instagram.com/priyap"
            },
        },
        {
            id: 10,
            name: "Michael Adamu",
            position: "Welfare Director",
            department: "Sociology",
            level: "400",
            iconClass: "fas fa-user", // Add this

            bio: "Mental health advocate with counseling training.",
            //image: "https://randomuser.me/api/portraits/women/33.jpg",
            manifesto: "Student wellbeing is my top priority. I'll expand peer support programs, improve counseling services, and create safe spaces across campus for all students.",
            social: {
                instagram: "https://instagram.com/priyap"
            },
        }
    ];

    // DOM Elements
    const positionList = document.getElementById('positionList');
    const candidatesGrid = document.getElementById('candidatesGrid');
    const candidateModal = document.getElementById('candidateModal');
    const modalBody = document.getElementById('modalBody');
    const positionFilter = document.getElementById('positionFilter');
    const departmentFilter = document.getElementById('departmentFilter');
    const searchInput = document.querySelector('.search-bar input');

    // State
    let currentPosition = 'all';
    let currentDepartment = 'all';
    let searchQuery = '';

    // Initialize
    renderPositionFilters();
    renderCandidates();
    setupEventListeners();

    // Functions
    function renderPositionFilters() {
        // Get unique positions from candidates data
        const positions = [...new Set(candidatesData.map(candidate => candidate.position))];
        
        // Add "All Positions" option
        positionList.innerHTML = `
            <li class="position-item active" data-position="all">All Positions</li>
        `;
        
        // Add each position to the sidebar
        positions.forEach(position => {
            const li = document.createElement('li');
            li.className = 'position-item';
            li.textContent = position;
            li.dataset.position = position.toLowerCase().replace(/\s+/g, '_');
            positionList.appendChild(li);
        });
    }

    function renderCandidates() {
        candidatesGrid.innerHTML = '';
        
        // Filter candidates based on current filters
        const filteredCandidates = candidatesData.filter(candidate => {
            const matchesPosition = currentPosition === 'all' || 
                candidate.position.toLowerCase().replace(/\s+/g, '_') === currentPosition;
            
            const matchesDepartment = currentDepartment === 'all' || 
                candidate.department.toLowerCase().replace(/\s+/g, '_') === currentDepartment;
            
            const matchesSearch = searchQuery === '' || 
                candidate.name.toLowerCase().includes(searchQuery) || 
                candidate.position.toLowerCase().includes(searchQuery) || 
                candidate.department.toLowerCase().includes(searchQuery) ||
                candidate.bio.toLowerCase().includes(searchQuery);
            
            return matchesPosition && matchesDepartment && matchesSearch;
        });
        
        // Display message if no candidates found
        if (filteredCandidates.length === 0) {
            candidatesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-user-slash"></i>
                    <h3>No candidates found</h3>
                    <p>Try adjusting your filters or search query</p>
                </div>
            `;
            return;
        }
        
        // Render each candidate card
        filteredCandidates.forEach(candidate => {
            const card = document.createElement('div');
            card.className = 'candidate-card';
            card.dataset.id = candidate.id;
            
            card.innerHTML = `
                <img src="${candidate.image}" alt="${candidate.name}" class="candidate-image">
                <div class="candidate-info">
                    <span class="candidate-position">${candidate.position}</span>
                    <h3 class="candidate-name">${candidate.name}</h3>
                    <p class="candidate-department">
                        <i class="fas fa-graduation-cap"></i>
                        ${candidate.department}, ${candidate.level} Level
                    </p>
                    <p class="candidate-bio">${candidate.bio}</p>
                    <button class="view-profile-btn" data-id="${candidate.id}">
                        <i class="fas fa-user"></i> View Full Profile
                    </button>
                </div>
            `;
            
            candidatesGrid.appendChild(card);
        });
    }

    function openCandidateModal(candidateId) {
        const candidate = candidatesData.find(c => c.id === candidateId);
        if (!candidate) return;
        
        // Format social links
        let socialLinks = '';
        if (candidate.social) {
            socialLinks = Object.entries(candidate.social).map(([platform, url]) => {
                return `<a href="${url}" target="_blank" class="social-link ${platform}">
                    <i class="fab fa-${platform}"></i>
                </a>`;
            }).join('');
        }
        
        // Populate modal
        modalBody.innerHTML = `
            <div class="modal-candidate">
                <div class="candidate-header">
                    <img src="${candidate.image}" alt="${candidate.name}" class="modal-image">
                    <div class="candidate-meta">
                        <h2>${candidate.name}</h2>
                        <p class="position">${candidate.position} Candidate</p>
                        <p class="department">
                            <i class="fas fa-graduation-cap"></i>
                            ${candidate.department}, ${candidate.level} Level
                        </p>
                        <div class="social-links">
                            ${socialLinks}
                        </div>
                        <div class="vote-count">
                            <i class="fas fa-vote-yea"></i>
                            <span>${candidate.votes.toLocaleString()} votes</span>
                        </div>
                    </div>
                </div>
                <div class="candidate-details">
                    <div class="manifesto-section">
                        <h3><i class="fas fa-scroll"></i> Manifesto</h3>
                        <p>${candidate.manifesto}</p>
                    </div>
                    <div class="key-points">
                        <h3><i class="fas fa-bullseye"></i> Key Points</h3>
                        <ul>
                            <li>Increase student engagement through regular forums</li>
                            <li>Improve campus facilities and resources</li>
                            <li>Enhance mental health support services</li>
                            <li>Promote transparency in student union decisions</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        candidateModal.classList.add('active');
    }

    function setupEventListeners() {
        // Position filter in sidebar
        positionList.addEventListener('click', function(e) {
            if (e.target.classList.contains('position-item')) {
                document.querySelectorAll('.position-item').forEach(item => {
                    item.classList.remove('active');
                });
                e.target.classList.add('active');
                
                currentPosition = e.target.dataset.position;
                renderCandidates();
                
                // Sync with dropdown filter
                positionFilter.value = currentPosition === 'all' ? '' : currentPosition;
            }
        });
        
        // Dropdown filters
        positionFilter.addEventListener('change', function() {
            currentPosition = this.value || 'all';
            
            // Update sidebar active item
            document.querySelectorAll('.position-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.position === currentPosition) {
                    item.classList.add('active');
                }
            });
            
            renderCandidates();
        });
        
        departmentFilter.addEventListener('change', function() {
            currentDepartment = this.value || 'all';
            renderCandidates();
        });
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            searchQuery = this.value.toLowerCase().trim();
            renderCandidates();
        });
        
        // Candidate card clicks
        candidatesGrid.addEventListener('click', function(e) {
            if (e.target.closest('.view-profile-btn')) {
                const candidateId = parseInt(e.target.closest('.view-profile-btn').dataset.id);
                openCandidateModal(candidateId);
            }
        });
        
        // Modal close button
        candidateModal.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-modal') || e.target === candidateModal) {
                candidateModal.classList.remove('active');
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && candidateModal.classList.contains('active')) {
                candidateModal.classList.remove('active');
            }
        });
    }
});

candidatesData.forEach(candidate => {
    // Create container div or something
    const div = document.createElement('div');

    // Create <i> element for the icon
    const icon = document.createElement('i');

    // Split the iconClass string and add each class
    candidate.iconClass.split(' ').forEach(cls => icon.classList.add(cls));

    // Add the icon and candidate name to the div
    div.appendChild(icon);
    div.appendChild(document.createTextNode(' ' + candidate.name));

    // Append div to your container on the page
    document.getElementById('candidates-container').appendChild(div);
});
