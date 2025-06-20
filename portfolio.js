// Initialize EmailJS
emailjs.init("uydE84u4gGUyhr-65"); // Replace with your actual EmailJS public key

// Typewriter effect for roles
(() => {
  const roles = ['Software Developer', 'Full Stack Engineer', 'Tech Enthusiast'];
  const roleElem = document.getElementById('roles');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  roleElem.appendChild(cursor);

  let roleIndex = 0;
  let charIndex = 0;
  let typing = true;
  let pause = 2000;

  function type() {
    if (typing) {
      if (charIndex < roles[roleIndex].length) {
        roleElem.textContent = roles[roleIndex].substring(0, charIndex + 1);
        roleElem.appendChild(cursor);
        charIndex++;
        setTimeout(type, 120);
      } else {
        typing = false;
        setTimeout(type, pause);
      }
    } else {
      if (charIndex > 0) {
        roleElem.textContent = roles[roleIndex].substring(0, charIndex - 1);
        roleElem.appendChild(cursor);
        charIndex--;
        setTimeout(type, 60);
      } else {
        typing = true;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 400);
      }
    }
  }
  type();
})();

// Contact form with EmailJS
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', e => {
  e.preventDefault();
  formMessage.textContent = '';
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill all fields.';
    formMessage.style.color = '#ff5555';
    return;
  }
  if (!validateEmail(email)) {
    formMessage.textContent = 'Please enter a valid email.';
    formMessage.style.color = '#ff5555';
    return;
  }

  formMessage.style.color = '#00ff99';
  formMessage.textContent = 'Sending message...';

  // Send email via EmailJS
  emailjs.sendForm("service_v5v92mc", "template_o0km8eq", form).then(
    function () {
      formMessage.textContent = '✅ Thanks for reaching out! I will get back to you soon.';
      formMessage.style.color = '#00ff99';
      form.reset();
    },
    function (error) {
      formMessage.textContent = '❌ Failed to send message. Try again later.';
      formMessage.style.color = '#ff5555';
    }
  );
});

function validateEmail(email) {
  const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return re.test(email.toLowerCase());
}

// Star background animation
(() => {
  const starsCount = [100, 70, 50];
  const starsElements = [
    document.getElementById('stars'),
    document.getElementById('stars2'),
    document.getElementById('stars3')
  ];
  starsElements.forEach((canvas, index) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const stars = [];
    const count = starsCount[index];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (index + 0.2) + 0.3,
        alpha: Math.random(),
        phase: Math.random() * 6.28
      });
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.phase += 0.02 + index * 0.005;
        star.alpha = 0.5 + 0.5 * Math.sin(star.phase);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(150, 150, 255, ${star.alpha})`;
        ctx.shadowBlur = star.radius * 4;
        ctx.shadowColor = 'rgba(100, 100, 255, 0.7)';
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  });
  window.addEventListener('resize', () => {
    starsElements.forEach(canvas => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  });
})();
