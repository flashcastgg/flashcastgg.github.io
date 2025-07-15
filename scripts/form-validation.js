document.addEventListener('submit', async function (e) {
  if (!e.target.matches('#email-form')) return;

  e.preventDefault();
  const form = e.target;
  const notif = document.getElementById('success-notif');

  form.querySelectorAll('.error').forEach(el => {
    el.textContent = '';
    el.classList.remove('visible');
  });

  let valid = true;
  ['message', 'from'].forEach(name => {
    const field = form.elements[name];
    const error = form.querySelector(`.error[data-for="${name}"]`);
    if (!field.value.trim()) {
      error.textContent = 'This field is required.';
      error.classList.add('visible');
      valid = false;
    }
  });

  const emailField = form.elements['from'];
  const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  const emailError = form.querySelector(`.error[data-for="from"]`);
  if (emailField.value && !emailPattern.test(emailField.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.classList.add('visible');
    valid = false;
  }

  if (!valid) return;

  try {
    await fetch('https://formspree.io/f/mzzvplly', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
  } catch (err) {
    console.error('Email send failed:', err);
  }

  document.getElementById('email-modal').hidden = true;
  notif.hidden = false;
  notif.classList.add('show', 'fadeout');
  setTimeout(() => {
    notif.classList.remove('show', 'fadeout');
    notif.hidden = true;
  }, 5000);
});
