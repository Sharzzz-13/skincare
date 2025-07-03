// Premium Skin Genius - Luxury JavaScript

// Global variables
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserFromStorage();
    setupScrollEffects();

    // Minimal Account Modal logic
    const openAccountBtn = document.getElementById('open-account');
    const closeAccountBtn = document.getElementById('close-account');
    const accountModal = document.getElementById('account-modal');
    const tabSignin = document.getElementById('tab-signin');
    const tabSignup = document.getElementById('tab-signup');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    if (openAccountBtn && closeAccountBtn && accountModal && tabSignin && tabSignup && signinForm && signupForm) {
      openAccountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        accountModal.classList.add('open');
      });
      closeAccountBtn.addEventListener('click', function() {
        accountModal.classList.remove('open');
      });
      window.addEventListener('click', function(e) {
        if (accountModal.classList.contains('open') && !document.querySelector('.account-modal-content').contains(e.target) && e.target !== openAccountBtn) {
          accountModal.classList.remove('open');
        }
      });
      tabSignin.addEventListener('click', function() {
        tabSignin.classList.add('active');
        tabSignup.classList.remove('active');
        signinForm.style.display = '';
        signupForm.style.display = 'none';
      });
      tabSignup.addEventListener('click', function() {
        tabSignup.classList.add('active');
        tabSignin.classList.remove('active');
        signupForm.style.display = '';
        signinForm.style.display = 'none';
      });
      // Prevent form submission (demo only)
      signinForm.addEventListener('submit', function(e) { e.preventDefault(); alert('Sign in (demo)'); });
      signupForm.addEventListener('submit', function(e) { e.preventDefault(); alert('Sign up (demo)'); });
    }
});

// Initialize the application
function initializeApp() {
    console.log('Skin Genius - Premium Skincare Experience');
    
    // Add loading animation to body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
}

// Setup event listeners
function setupEventListeners() {
    // Back to top button
    window.addEventListener('scroll', function() {
        const backToTopBtn = document.getElementById('backToTopBtn');
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Auth modal close on outside click
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                hideAuthModal();
            }
        });
    }

    // Menu close on outside click
    const mainMenu = document.getElementById('mainMenu');
    if (mainMenu) {
        mainMenu.addEventListener('click', function(e) {
            if (e.target === mainMenu) {
                toggleMenu();
            }
        });
    }
}

// Setup scroll effects
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.product, .about-card, .testimonial-card, .result-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Menu functionality
function toggleMenu() {
    const menu = document.getElementById('mainMenu');
    if (menu) {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
}

// Auth modal functionality
function showAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        showLoginForm();
    }
}

function hideAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        clearAuthErrors();
    }
}

function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    clearAuthErrors();
}

function showSignupForm() {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    clearAuthErrors();
}

function clearAuthErrors() {
    document.getElementById('loginError').textContent = '';
    document.getElementById('signupError').textContent = '';
}

// Authentication functions
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorElement = document.getElementById('loginError');

    if (!email || !password) {
        errorElement.textContent = 'Please fill in all fields';
        return;
    }

    // Simulate login process
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Signing in...';
    button.disabled = true;

    setTimeout(() => {
        // For demo purposes, accept any email/password
        currentUser = { email, name: email.split('@')[0] };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        hideAuthModal();
        updateAuthUI();
        
        // Show success message
        showNotification('Welcome back! You have successfully signed in.', 'success');
        
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const errorElement = document.getElementById('signupError');

    if (!name || !email || !password) {
        errorElement.textContent = 'Please fill in all fields';
        return;
    }

    if (password.length < 6) {
        errorElement.textContent = 'Password must be at least 6 characters';
        return;
    }

    // Simulate signup process
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Creating account...';
    button.disabled = true;

    setTimeout(() => {
        currentUser = { email, name };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        hideAuthModal();
        updateAuthUI();
        
        // Show success message
        showNotification('Account created successfully! Welcome to Skin Genius.', 'success');
        
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('You have been signed out successfully.', 'info');
}

function loadUserFromStorage() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
}

function updateAuthUI() {
    const authBtn = document.querySelector('.header-btn');
    if (authBtn) {
        if (currentUser) {
            authBtn.textContent = `Hi, ${currentUser.name}`;
            authBtn.onclick = logout;
        } else {
            authBtn.textContent = 'Sign In';
            authBtn.onclick = showAuthModal;
        }
    }
}

// Newsletter functionality
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate newsletter subscription
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(() => {
        showNotification('Thank you for subscribing to Skin Genius! You\'ll receive our latest updates and exclusive offers.', 'success');
        e.target.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Cart functionality
function addToCart(productId, button) {
    console.log('addToCart called for', productId);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Show success message
    const originalText = button.textContent;
    button.textContent = "Added! ✓";
    button.style.background = "var(--sage)";
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
    }, 1500);

    // Show notification
    showNotification('Added to bag', 'success');
    renderCartDrawer();
    updateCartCountBadge();
}

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message.toLowerCase()}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #222;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-strong);
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1);
        max-width: 350px;
        backdrop-filter: blur(10px);
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 400);
        }
    }, 5000);
}

// Enhanced product loading for featured products - Rhode Style
function loadFeaturedProducts() {
    fetch('../data/product.json')
        .then(res => res.json())
        .then(data => {
            const featuredProducts = data.slice(0, 3); // Show first 3 products
            const container = document.getElementById('featured-products');
            
            if (container) {
                container.innerHTML = ''; // Clear existing content
                
                featuredProducts.forEach((product, index) => {
                    const card = document.createElement("div");
                    card.className = "product";
                    
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-content">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <strong>₹${product.price}</strong>
                            <div class="product-actions">
                                <button class="add-to-cart-btn" onclick="addToCart('${product.id}', this)">Add to Cart</button>
                                <a href="product.html?id=${product.id}" class="view-btn">View Details</a>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('Error loading featured products:', error);
            showNotification('Failed to load products. Please try again later.', 'error');
        });
}

// Initialize featured products if on home page
if (document.getElementById('featured-products')) {
    loadFeaturedProducts();
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-message {
        flex: 1;
        font-size: 0.9rem;
        font-weight: 500;
        color: #7c4a1e;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #7c4a1e;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        padding: 0;
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0;
        transition: background-color 0.2s, color 0.2s;
        box-shadow: none;
    }
    
    .notification-close:hover {
        background: rgba(124, 74, 30, 0.08);
        color: #5a3212;
    }
`;
document.head.appendChild(notificationStyles);

// -----------------------------
// Cart Drawer Logic
// -----------------------------
// Handles adding, increasing, decreasing products in cart, and rendering the cart drawer.

// ... (cart logic code here) ...

// -----------------------------
// Cart Badge Logic
// -----------------------------
// Updates the cart icon badge to show the total quantity of items in the cart.

// ... (cart badge code here) ...

// -----------------------------
// Inline Product Card Quantity Selector
// -----------------------------
// Handles the plus/minus and quantity display on product cards.

// ... (inline quantity code here) ...

// -----------------------------
// Account Modal Logic
// -----------------------------
// Handles opening, closing, and toggling between sign in/sign up tabs in the account modal.

// ... (account modal code here) ...

// -----------------------------
// Cart Drawer Open/Close Logic
// -----------------------------
// Handles opening and closing the cart drawer from the cart icon.

// ... (cart drawer open/close code here) ...

// -----------------------------
// Social Popup Logic
// -----------------------------
// Handles the 'coming soon' popup for social media links in the footer.

// ... (social popup code here) ...
