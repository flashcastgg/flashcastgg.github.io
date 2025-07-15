const cta = document.getElementById('email-cta');
const modal = document.getElementById('email-modal');
const notif = document.getElementById('success-notif');

cta?.addEventListener('click', () => {
  modal.innerHTML = `
    <div class="modal">
      <button class="modal-close" aria-label="Close form">&times;</button>
      <h3>Contact Danson</h3>
      <form id="email-form" novalidate>
        <label>
          Subject
          <input type="text" name="subject" value="Contact Danson" readonly>
          <small class="error" data-for="subject"></small>
        </label>
        <label>
          Message
          <textarea name="message" placeholder="Type your message here…" required></textarea>
          <small class="error" data-for="message"></small>
        </label>
        <label>
          Your Email
          <input type="email" name="from" placeholder="you@example.com" required>
          <small class="error" data-for="from"></small>
        </label>
        <button type="submit" class="submit-btn">Send</button>
      </form>
    </div>
  `;
  modal.hidden = false;

  const closeBtn = modal.querySelector('.modal-close');
  closeBtn?.addEventListener('click', () => {
    modal.hidden = true;
    modal.innerHTML = '';
  });
});
