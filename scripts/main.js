// main.js

// Smooth scroll with header offset and section animation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const headerHeight = document.querySelector('header').offsetHeight;
    const extraOffset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--offset-extra')) || 0;

    const scrollPosition = target.offsetTop - headerHeight - extraOffset;
    window.scrollTo({
      top: Math.max(scrollPosition, 0),
      behavior: 'smooth'
    });

    const heading = target.querySelector('h2');
    if (heading) {
      heading.classList.remove('h2-highlight');
      void heading.offsetWidth; // force reflow
      heading.classList.add('h2-highlight');
      setTimeout(() => heading.classList.remove('h2-highlight'), 1200);
    }
  });
});

// Elements
const modal        = document.getElementById('email-modal');
const form         = document.getElementById('email-form');
const cta          = document.getElementById('email-cta');
const closeBtn     = modal.querySelector('.modal-close');
const notif        = document.getElementById('success-notif');
const notifClose   = document.getElementById('notif-close');

// Open modal
cta.addEventListener('click', () => {
  modal.hidden = false;
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.hidden = true;
  clearForm();
});

// Close notification
notifClose.addEventListener('click', () => {
  notif.classList.remove('show', 'fadeout');
  notif.hidden = true;
});

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;
  const requiredFields = ['subject', 'message', 'from'];

  requiredFields.forEach(name => {
    const field = form.elements[name];
    const error = form.querySelector(`.error[data-for="${name}"]`);
    if (!field.value.trim()) {
      error.textContent = 'This field is required.';
      error.classList.add('visible');
      valid = false;
    }
  });

  const email = form.elements['from'].value.trim();
  const emailError = form.querySelector('.error[data-for="from"]');
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 // if (email && !pattern.test(email)) {
 //   emailError.textContent = 'Please enter a valid email address.';
 //   emailError.classList.add('visible');
 //   valid = false;
 // }


  if (!valid) return;

  try {
    await fetch('https://formspree.io/f/mzzvplly', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });

    modal.hidden = true;
    clearForm();

    notif.hidden = false;
    notif.classList.add('show', 'fadeout');

    setTimeout(() => {
      notif.classList.remove('show', 'fadeout');
      notif.hidden = true;
    }, 5000);

  } catch (err) {
    console.error('Formspree submission failed:', err);
  }
});

// Helpers
function clearErrors() {
  form.querySelectorAll('.error').forEach(el => {
    el.textContent = '';
    el.classList.remove('visible');
  });
}

function clearForm() {
  clearErrors();
  form.reset();
}

