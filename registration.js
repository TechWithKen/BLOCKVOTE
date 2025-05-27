document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('registrationForm');
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const walletOptions = document.querySelectorAll('input[name="walletOption"]');
    const walletAddressGroup = document.getElementById('walletAddressGroup');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const fileInput = document.getElementById('profilePhoto');
    const fileName = document.querySelector('.file-name');
    const regTypeRadios = document.querySelectorAll('input[name="regType"]');
    
    // State
    let currentStep = 0;
    let walletAddress = '';
    
    // Initialize
    updateFormNavigation();
    
    // Event Listeners
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    submitBtn.addEventListener('click', submitForm);
    
    walletOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'existing') {
                walletAddressGroup.classList.add('show');
            } else {
                walletAddressGroup.classList.remove('show');
            }
        });
    });
    
    connectWalletBtn.addEventListener('click', connectWallet);
    sendCodeBtn.addEventListener('click', sendVerificationCode);
    fileInput.addEventListener('change', handleFileUpload);
    
    // Functions
    function updateFormNavigation() {
        // Update steps UI
        steps.forEach((step, index) => {
            if (index === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update form steps
        formSteps.forEach((step, index) => {
            if (index === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update buttons
        prevBtn.disabled = currentStep === 0;
        
        if (currentStep === formSteps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
        
        // Update verification summary on last step
        if (currentStep === 3) {
            updateVerificationSummary();
        }
    }
    
    function nextStep() {
        // Validate current step before proceeding
        if (validateStep(currentStep)) {
            currentStep++;
            updateFormNavigation();
        }
    }
    
    function prevStep() {
        currentStep--;
        updateFormNavigation();
    }
    
    function validateStep(stepIndex) {
        let isValid = true;
        const currentFormStep = formSteps[stepIndex];
        const inputs = currentFormStep.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--danger-color)';
                isValid = false;
                
                // Reset border color when user starts typing
                input.addEventListener('input', function() {
                    this.style.borderColor = 'var(--light-gray)';
                });
            }
        });
        
        if (stepIndex === 2) {
            const walletOption = document.querySelector('input[name="walletOption"]:checked').value;
            if (walletOption === 'existing' && !walletAddress) {
                alert('Please connect your wallet');
                isValid = false;
            }
            
            if (!document.getElementById('agreeTerms').checked) {
                alert('You must agree to the terms');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function connectWallet() {
        // In a real app, this would connect to MetaMask or other wallet
        // This is a simulation
        setTimeout(() => {
            walletAddress = '0x' + Math.random().toString(16).substr(2, 40);
            document.getElementById('walletAddress').value = walletAddress;
            connectWalletBtn.textContent = 'Connected';
            connectWalletBtn.style.backgroundColor = 'var(--success-color)';
            connectWalletBtn.style.color = 'white';
            connectWalletBtn.disabled = true;
        }, 1000);
    }
    
    function sendVerificationCode() {
        // Simulate sending verification code
        sendCodeBtn.textContent = 'Code Sent';
        sendCodeBtn.style.backgroundColor = 'var(--success-color)';
        sendCodeBtn.style.color = 'white';
        sendCodeBtn.disabled = true;
        
        // In a real app, this would send to the user's email
        alert('Verification code sent to your email');
    }
    
    function handleFileUpload() {
        if (fileInput.files.length > 0) {
            fileName.textContent = fileInput.files[0].name;
        } else {
            fileName.textContent = 'No file chosen';
        }
    }
    
    function updateVerificationSummary() {
        // Personal Info
        document.getElementById('summaryName').textContent = document.getElementById('fullName').value;
        document.getElementById('summaryEmail').textContent = document.getElementById('email').value;
        document.getElementById('summaryPhone').textContent = document.getElementById('phone').value;
        
        // Academic Info
        document.getElementById('summaryStudentId').textContent = document.getElementById('studentId').value;
        document.getElementById('summaryDept').textContent = document.getElementById('department').options[document.getElementById('department').selectedIndex].text;
        document.getElementById('summaryLevel').textContent = document.getElementById('level').options[document.getElementById('level').selectedIndex].text;
        
        // Wallet Info
        const walletOption = document.querySelector('input[name="walletOption"]:checked').value;
        if (walletOption === 'new') {
            document.getElementById('summaryWallet').textContent = 'New wallet will be created';
            document.getElementById('summaryWalletAddress').textContent = '';
        } else {
            document.getElementById('summaryWallet').textContent = 'Using existing wallet';
            document.getElementById('summaryWalletAddress').textContent = walletAddress;
        }
    }
    
    function submitForm(e) {
        e.preventDefault();
    
        if (validateStep(currentStep)) {
            // Simulate form submission
            setTimeout(() => {
                alert('Registration successful! You can now participate in elections.');
                window.location.href = 'index.html';
            }, 1500);
        }
    }
    
});
