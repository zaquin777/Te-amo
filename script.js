
    const canvas = document.getElementById('clickParticles');
    const ctx = canvas.getContext('2d');
    const message = document.getElementById('message');
    const teAmoText = document.getElementById('teAmoText');
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function createParticles(x, y) {
      for (let i = 0; i < 20; i++) {
        particles.push({
          x,
          y,
          size: Math.random() * 5 + 2,
          speedX: (Math.random() - 0.5) * 5,
          speedY: (Math.random() - 0.5) * 5,
          alpha: 1
        });
      }
    }

    document.addEventListener('click', e => {
      createParticles(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', e => {
      for (let touch of e.touches) {
        createParticles(touch.clientX, touch.clientY);
      }
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= 0.02;
        if (p.alpha <= 0) particles.splice(i, 1);
        else {
          ctx.fillStyle = `rgba(255, 105, 180, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      requestAnimationFrame(animate);
    }
    animate();

    function createRain() {
      const rain = document.createElement('div');
      rain.classList.add('rain');
      rain.innerText = 'TE AMO';
      rain.style.left = Math.random() * window.innerWidth + 'px';
      rain.style.animationDuration = (2 + Math.random() * 3) + 's';
      rain.style.fontSize = (16 + Math.random() * 8) + 'px';
      document.body.appendChild(rain);
      setTimeout(() => rain.remove(), 6000);
    }

    setInterval(createRain, 150);

    // Quando clica no "TE AMO 💔"
    teAmoText.addEventListener('click', (e) => {
      message.style.opacity = 1;
      setTimeout(() => {
        message.style.opacity = 0;
      }, 1000); // Esconde depois de 3 segundos
    });

    // Toque em celulares
    teAmoText.addEventListener('touchstart', (e) => {
      message.style.opacity = 1;
      setTimeout(() => {
        message.style.opacity = 0;
      }, 3000);
    });
