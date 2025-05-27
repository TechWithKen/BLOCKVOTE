// DOM Elements
const createElectionBtn = document.getElementById('createElectionBtn');
const electionsTableBody = document.getElementById('electionsTableBody');
const createElectionModal = document.getElementById('createElectionModal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const electionForm = document.getElementById('electionForm');
const activeElectionsSpan = document.getElementById('activeElections');
const totalCandidatesSpan = document.getElementById('totalCandidates');
const registeredStudentsSpan = document.getElementById('registeredStudents');
const avgParticipationSpan = document.getElementById('avgParticipation');

// State
let elections = [];
let candidates = [];
let students = [];

// Initialize the page
async function init() {
    loadMockData();
    renderElectionsTable();
    setupEventListeners();
    
    // In a real app, you would fetch this from your backend/blockchain
    updateStats();
}

function loadMockData() {
    // Mock data - replace with actual API/blockchain calls
    elections = [
        {
            id: 1,
            name: "Student Council 2023",
            startDate: new Date('2023-10-01'),
            endDate: new Date('2023-10-20'),
            candidates: 4,
            status: "active"
        },
        {
            id: 2,
            name: "Class Representatives",
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-15'),
            candidates: 12,
            status: "completed"
        },
        {
            id: 3,
            name: "Sports Committee",
            startDate: new Date('2023-11-01'),
            endDate: new Date('2023-11-10'),
            candidates: 6,
            status: "upcoming"
        }
    ];
    
    candidates = [
        { id: 1, electionId: 1, name: "John Doe", position: "President" },
        { id: 2, electionId: 1, name: "Jane Smith", position: "Vice President" },
        // ... more candidates
    ];
    
    students = [
        { id: 1, name: "Student 1", email: "student1@example.edu" },
        { id: 2, name: "Student 2", email: "student2@example.edu" },
        // ... more students
    ];
}

function renderElectionsTable() {
    electionsTableBody.innerHTML = '';
    
    elections.forEach(election => {
        const row = document.createElement('tr');
        
        // Status badge
        let statusBadge;
        if (election.status === "active") {
            statusBadge = `<span class="badge badge-active">Active</span>`;
        } else if (election.status === "completed") {
            statusBadge = `<span class="badge badge-completed">Completed</span>`;
        } else {
            statusBadge = `<span class="badge badge-upcoming">Upcoming</span>`;
        }
        
        // Action buttons
        const actions = `
            <div class="action-buttons">
                <button class="btn-icon btn-view" data-id="${election.id}" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon btn-edit" data-id="${election.id}" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-results" data-id="${election.id}" title="Results">
                    <i class="fas fa-chart-bar"></i>
                </button>
            </div>
        `;
        
        row.innerHTML = `
            <td>${election.name}</td>
            <td>${formatDate(election.startDate)}</td>
            <td>${formatDate(election.endDate)}</td>
            <td>${election.candidates}</td>
            <td>${statusBadge}</td>
            <td>${actions}</td>
        `;
        
        electionsTableBody.appendChild(row);
    });
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function updateStats() {
    // Mock data - replace with actual calculations
    activeElectionsSpan.textContent = elections.filter(e => e.status === "active").length;
    totalCandidatesSpan.textContent = candidates.length;
    registeredStudentsSpan.textContent = students.length;
    avgParticipationSpan.textContent = "78%";
}

function setupEventListeners() {
    // Modal toggle
    createElectionBtn.addEventListener('click', () => {
        createElectionModal.classList.add('active');
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            createElectionModal.classList.remove('active');
        });
    });
    
    // Form submission
    electionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const electionName = document.getElementById('electionName').value;
        const electionDescription = document.getElementById('electionDescription').value;
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);
        
        // Validate dates
        if (startDate >= endDate) {
            alert('End date must be after start date');
            return;
        }
        
        try {
            // In a real app, this would create the election on your backend/blockchain
            // This is a mock implementation
            const newElection = {
                id: elections.length + 1,
                name: electionName,
                startDate,
                endDate,
                candidates: 0,
                status: startDate > new Date() ? "upcoming" : "active"
            };
            
            elections.push(newElection);
            renderElectionsTable();
            updateStats();
            
            // Reset form and close modal
            electionForm.reset();
            createElectionModal.classList.remove('active');
            
            // Show success message
            alert('Election created successfully!');
            
        } catch (error) {
            console.error('Error creating election:', error);
            alert('There was an error creating the election. Please try again.');
        }
    });
    
    // Table action buttons
    electionsTableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;
        
        const electionId = parseInt(target.getAttribute('data-id'));
        const election = elections.find(e => e.id === electionId);
        if (!election) return;
        
        if (target.classList.contains('btn-view')) {
            viewElection(election);
        } else if (target.classList.contains('btn-edit')) {
            editElection(election);
        } else if (target.classList.contains('btn-results')) {
            viewResults(election);
        }
    });
}

function viewElection(election) {
    alert(`Viewing election: ${election.name}\nStart: ${formatDate(election.startDate)}\nEnd: ${formatDate(election.endDate)}`);
    // In a real app, this would navigate to an election detail page
}

function editElection(election) {
    alert(`Editing election: ${election.name}`);
    // In a real app, this would open an edit form with the election data
}

function viewResults(election) {
    alert(`Viewing results for: ${election.name}`);
    // In a real app, this would show the election results
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);