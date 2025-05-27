// DOM Elements
const candidatesContainer = document.getElementById('candidatesContainer');
const confirmationModal = document.getElementById('confirmationModal');
const successModal = document.getElementById('successModal');
const selectedCandidateSpan = document.getElementById('selectedCandidate');
const selectedPositionSpan = document.getElementById('selectedPosition');
const txHashSpan = document.getElementById('txHash');
const cancelVoteBtn = document.getElementById('cancelVote');
const confirmVoteBtn = document.getElementById('confirmVote');
const viewReceiptBtn = document.getElementById('viewReceipt');
const electionTitle = document.getElementById('electionTitle');
const electionDescription = document.getElementById('electionDescription');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const currentDate = document.getElementById('currentDate');
const votingProgress = document.getElementById('votingProgress');
const progressText = document.getElementById('progressText');

// State
// Voting system data
let votes = {};
let currentCategory = 'president';

// Category switching functionality
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const category = this.getAttribute('data-category');
        switchCategory(category);
    });
});

function switchCategory(category) {
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    document.querySelectorAll('.category-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(category).classList.add('active');

    currentCategory = category;
}

// Voting functionality
document.querySelectorAll('.btn-vote').forEach(button => {
    button.addEventListener('click', function () {
        const candidateName = this.getAttribute('data-candidate');
        const position = this.getAttribute('data-position');
        const category = currentCategory;

        if (votes[category]) {
            alert(`You have already voted for ${votes[category].candidate} as ${votes[category].position}!`);
            return;
        }

        showConfirmationModal(candidateName, position, category);
    });
});

function showConfirmationModal(candidate, position, category) {
    const modal = document.getElementById('confirmationModal');
    const selectedCandidate = document.getElementById('selectedCandidate');
    const selectedPosition = document.getElementById('selectedPosition');

    selectedCandidate.textContent = candidate;
    selectedPosition.textContent = position;
    modal.classList.add('active');

    modal.setAttribute('data-candidate', candidate);
    modal.setAttribute('data-position', position);
    modal.setAttribute('data-category', category);
}

// Confirmation modal handlers
document.getElementById('cancelVote').addEventListener('click', function () {
    document.getElementById('confirmationModal').classList.remove('active');
});

document.getElementById('confirmVote').addEventListener('click', function () {
    const modal = document.getElementById('confirmationModal');
    const candidate = modal.getAttribute('data-candidate');
    const position = modal.getAttribute('data-position');
    const category = modal.getAttribute('data-category');

    votes[category] = {
        candidate: candidate,
        position: position,
        timestamp: new Date().toISOString()
    };

    updateVoteUI(category, candidate);
    modal.classList.remove('active');
    showSuccessModal(candidate, position);
});

function updateVoteUI(category, candidate) {
    const categoryContent = document.getElementById(category);
    const candidateCards = categoryContent.querySelectorAll('.candidate-card');

    candidateCards.forEach(card => {
        const cardCandidate = card.querySelector('.candidate-name').textContent;
        const voteButton = card.querySelector('.btn-vote');

        if (cardCandidate === candidate) {
            card.classList.add('voted');
            voteButton.textContent = 'Voted ✓';
            voteButton.disabled = true;
        } else {
            voteButton.textContent = 'Voting Closed';
            voteButton.disabled = true;
            voteButton.style.background = '#6c757d';
        }
    });

    const categoryTab = document.querySelector(`[data-category="${category}"]`);
    if (!categoryTab.querySelector('.fas')) {
        categoryTab.innerHTML += ' <i class="fas fa-check" style="margin-left: 5px;"></i>';
    }
}

function showSuccessModal(candidate, position) {
    const modal = document.getElementById('successModal');
    const txHash = document.getElementById('txHash');

    const mockHash = '0x' + Math.random().toString(16).substr(2, 64);
    txHash.textContent = mockHash;

    modal.classList.add('active');

    setTimeout(() => {
        modal.classList.remove('active');
    }, 5000);
}

document.getElementById('viewReceipt').addEventListener('click', function () {
    document.getElementById('successModal').classList.remove('active');
    generateReceipt();
});

function generateReceipt() {
    const voteCount = Object.keys(votes).length;
    const totalCategories = document.querySelectorAll('.category-tab').length;

    let receiptContent = `
        <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px; margin: 2rem auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h2 style="text-align: center; color: #1a1a2e; margin-bottom: 1rem;">Voting Receipt</h2>
            <p style="text-align: center; color: #6c757d; margin-bottom: 2rem;">LASUSU Elections 2025</p>
            <div style="border-top: 2px solid #e9ecef; padding-top: 1rem;">
                <h3 style="color: #4e54c8; margin-bottom: 1rem;">Your Votes:</h3>
    `;

    for (const [category, vote] of Object.entries(votes)) {
        receiptContent += `
            <div style="margin-bottom: 1rem; padding: 0.5rem; background: #f8f9fa; border-radius: 6px;">
                <strong>${vote.position}:</strong> ${vote.candidate}
                <br><small style="color: #6c757d;">Voted at: ${new Date(vote.timestamp).toLocaleString()}</small>
            </div>
        `;
    }

    receiptContent += `
            </div>
            <div style="text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e9ecef;">
                <p><strong>Progress: ${voteCount}/${totalCategories} categories completed</strong></p>
                <p style="font-size: 0.8rem; color: #6c757d;">Secured by Blockchain Technology</p>
            </div>
        </div>
    `;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.8); z-index: 2000; 
        display: flex; align-items: center; justify-content: center;
        padding: 1rem; overflow-y: auto;
    `;
    overlay.innerHTML = receiptContent + `
        <button onclick="this.parentElement.remove()" 
                style="position: absolute; top: 20px; right: 20px; 
                       background: white; border: none; border-radius: 50%; 
                       width: 40px; height: 40px; cursor: pointer; 
                       font-size: 1.2rem; color: #6c757d;">×</button>
    `;

    document.body.appendChild(overlay);
}

// Close modals when clicking outside
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('voting-confirmation') ||
        e.target.classList.contains('voting-success')) {
        e.target.classList.remove('active');
    }
});

// Logout functionality
document.querySelector('.logout-btn').addEventListener('click', function () {
    if (confirm('Are you sure you want to logout? Your votes have been saved.')) {
        alert('Thank you for participating in LASUSU Elections 2025!');
        // Redirect logic here if needed
    }
});

// Initialization
document.addEventListener('DOMContentLoaded', function () {
    console.log('BlockVote Election System Initialized');

    const voteCount = Object.keys(votes).length;
    const totalCategories = document.querySelectorAll('.category-tab').length;
    const progressText = document.getElementById('progressText');

    if (voteCount === 0) {
        progressText.textContent = '11 days remaining';
    } else if (voteCount === totalCategories) {
        progressText.textContent = 'All votes cast! Thank you for participating.';
    } else {
        progressText.textContent = `${totalCategories - voteCount} categories remaining`;
    }
});


document.getElementById("logbtn").addEventListener("click", function() {
    window.location.href = "index.html";
});
document.getElementById("homeBtn").addEventListener("click", function() {
    window.location.href = "home.html";
});