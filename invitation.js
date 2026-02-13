document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    const particlesContainer = document.getElementById('particles');
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // DOM Elements
    const chiefGuestSection = document.getElementById('chief-guest-section');
    const welcomeMessage = document.getElementById('welcome-message');
    const signatureSection = document.getElementById('signature-section');
    const guestNameElement = document.getElementById('guest-name');
    const typewriterText = document.getElementById('typewriter-text');
    const nextBtn = document.getElementById('next-btn');
    const clearBtn = document.getElementById('clear-btn');
    const revealBtn = document.getElementById('reveal-btn');
    const invitationDetails = document.getElementById('invitation-details');
    const chiefGuestInput = document.getElementById('chief-guest');
    const finalMessage = document.getElementById('final-message');
    
    // Signature Pad variables
    let signaturePad;
    let canvas;
    
    // Next button functionality
    nextBtn.addEventListener('click', () => {
        const guestName = chiefGuestInput.value.trim();
        
        if (guestName === '') {
            alert('Please enter the chief guest\'s name!');
            chiefGuestInput.focus();
            return;
        }
        
        // Hide chief guest section
        chiefGuestSection.style.display = 'none';
        
        // Show welcome message
        guestNameElement.textContent = guestName;
        welcomeMessage.style.display = 'block';
        
        // Typewriter effect for welcome message
        const message = `The Electronics Student Association is thrilled to invite you as the chief guest for our annual Science Fiesta. Your presence could inspire our students, and we would be honored by your presence on this special occasion.`;
        
        typeText(typewriterText, message, 30, () => {
            // After typing is complete, show signature section
            setTimeout(() => {
                signatureSection.style.display = 'block';
                
                // Initialize signature pad now that it's visible
                initSignaturePad();
                
                // Scroll to signature section
                signatureSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        });
    });
    
    // Initialize signature pad
    function initSignaturePad() {
        canvas = document.getElementById('signature-pad');
        if (canvas) {
            signaturePad = new SignaturePad(canvas, {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                penColor: '#00c6ff',
                minWidth: 1.5,
                maxWidth: 4
            });
            
            // Make canvas responsive
            function resizeCanvas() {
                const ratio = Math.max(window.devicePixelRatio || 1, 1);
                canvas.width = canvas.offsetWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                canvas.getContext('2d').scale(ratio, ratio);
                signaturePad.clear();
            }
            
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            // Clear signature
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    signaturePad.clear();
                    invitationDetails.classList.remove('revealed');
                    finalMessage.style.display = 'none';
                });
            }
            
            // Reveal invitation
            if (revealBtn) {
                revealBtn.addEventListener('click', () => {
                    if (!signaturePad.isEmpty()) {
                        invitationDetails.classList.add('revealed');
                        finalMessage.style.display = 'block';
                        createConfetti();
                        // Scroll to invitation details
                        invitationDetails.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        alert('Please provide your signature to reveal the invitation!');
                    }
                });
            }
        }
    }
    
    // Typewriter effect function
    function typeText(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }
    
    // Create confetti effect
    function createConfetti() {
        const colors = ['#00c6ff', '#ff2d75', '#00ff9d', '#ffcc00', '#7e57c2'];
        const confettiCount = 150;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            // Animate confetti
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${Math.random() * 100 + 50}vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0,0.9,0.57,1)'
            });
            
            // Remove element after animation
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }

});
