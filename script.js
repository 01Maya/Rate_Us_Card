document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const submitBtn = document.querySelector('.submit-btn');
    const textarea = document.querySelector('textarea');
    const charCount = document.querySelector('.char-count');
    const ratingLabel = document.querySelector('.rating-label');
    const cardContent = document.querySelector('.card-content');
    const successMessage = document.querySelector('.success-message');
    const rateAgainBtn = document.querySelector('.rate-again-btn');
    
    let currentRating = 0;
    
    const ratingLabels = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
    };
    
    // Function to update stars display with wave animation
    function updateStars(rating) {
        stars.forEach((star, index) => {
            const value = parseInt(star.dataset.rating);
            
            setTimeout(() => {
                if (value <= rating) {
                    star.textContent = '★';
                    star.classList.add('active');
                    star.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        star.style.transform = 'scale(1)';
                    }, 150);
                } else {
                    star.textContent = '☆';
                    star.classList.remove('active');
                }
            }, index * 50);
        });
        
        // Update rating label
        if (rating > 0) {
            ratingLabel.textContent = ratingLabels[rating];
        } else {
            ratingLabel.textContent = '';
        }
        
        // Enable/disable submit button
        submitBtn.disabled = rating === 0;
    }
    
    // Add hover effect
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            updateStars(rating);
        });
        
        star.addEventListener('mouseout', function() {
            updateStars(currentRating);
        });
        
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            updateStars(currentRating);
        });
    });
    
    // Character count update
    textarea.addEventListener('input', function() {
        const remaining = this.value.length;
        charCount.textContent = `${remaining} / 500`;
    });
    
    // Handle form submission
    submitBtn.addEventListener('click', async function() {
        if (currentRating === 0) return;
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Prepare review data
        const reviewData = {
            rating: currentRating,
            comment: textarea.value.trim()
        };
        
        console.log('Review submitted:', reviewData);
        
        // Show success message
        cardContent.classList.add('hide');
        successMessage.classList.add('show');
    });
    
    // Handle rate again button
    rateAgainBtn.addEventListener('click', function() {
        // Reset form
        currentRating = 0;
        updateStars(0);
        textarea.value = '';
        charCount.textContent = '0 / 500';
        submitBtn.classList.remove('loading');
        
        // Hide success message and show form
        cardContent.classList.remove('hide');
        successMessage.classList.remove('show');
    });
});