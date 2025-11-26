// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
      };

      // Store in localStorage (in production, send to server)
      let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
      messages.push(formData);
      localStorage.setItem('contactMessages', JSON.stringify(messages));

      // Show success message
      contactForm.style.display = 'none';
      const successMessage = document.getElementById('form-success');
      successMessage.style.display = 'block';

      // Reset form after 3 seconds
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        successMessage.style.display = 'none';

        // Show notification
        if (typeof showNotification === 'function') {
          showNotification('Message sent successfully!', 'success');
        } else {
          alert('Thank you for contacting us! We will get back to you soon.');
        }
      }, 3000);

      // In production, you would send this data to your backend
      console.log('Form submitted:', formData);
    });
  }
});