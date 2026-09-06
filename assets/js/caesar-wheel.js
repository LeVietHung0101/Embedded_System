// assets/js/caesar-wheel.js
(function () {
  window.caesarShift = 0;

  window.rotateCaesarWheel = function (step) {
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const TOTAL = ALPHABET.length;

    window.caesarShift = (window.caesarShift + step + TOTAL) % TOTAL;
    const anglePerLetter = 360 / TOTAL;
    const rotationAngle = window.caesarShift * anglePerLetter;

    const innerWheel = document.getElementById("innerWheel");
    const shiftDisplay = document.getElementById("shiftDisplay");

    if (innerWheel) {
      innerWheel.style.transform = `rotate(${rotationAngle}deg)`;
    }
    if (shiftDisplay) {
      shiftDisplay.innerHTML = `<b>(Shift) K = ${window.caesarShift}</b>`;
    }
  };

  window.initCaesarWheel = function () {
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const TOTAL = ALPHABET.length;

    function renderLetters() {
      const outerContainer = document.getElementById("outerWheel");
      const innerContainer = document.getElementById("innerWheel");
      
      if (!outerContainer || !innerContainer) return;
      outerContainer.innerHTML = "";
      innerContainer.innerHTML = "";

      for (let i = 0; i < TOTAL; i++) {
        const angle = (i * 360) / TOTAL;
        const rad = (angle - 90) * (Math.PI / 180);

        // 1. Render chữ cái vòng ngoài (Plaintext)
        const outerSpan = document.createElement("span");
        outerSpan.className = "letter";
        outerSpan.innerText = ALPHABET[i];
        const xOuter = 142 * Math.cos(rad);
        const yOuter = 142 * Math.sin(rad);
        outerSpan.style.transform = `translate(${xOuter}px, ${yOuter}px) rotate(${angle}deg)`;
        outerContainer.appendChild(outerSpan);

        // 2. Render chữ cái vòng trong (Ciphertext)
        const innerSpan = document.createElement("span");
        innerSpan.className = "letter";
        innerSpan.innerText = ALPHABET[i];
        const xInner = 92 * Math.cos(rad);
        const yInner = 92 * Math.sin(rad);
        innerSpan.style.transform = `translate(${xInner}px, ${yInner}px) rotate(${angle}deg)`;
        innerContainer.appendChild(innerSpan);

        // // 3. Render số chỉ số (0 - 25) ở vòng trong
        // const numSpan = document.createElement("span");
        // numSpan.className = "index-num";
        // numSpan.innerText = i;
        // const xNum = 64 * Math.cos(rad);
        // const yNum = 64 * Math.sin(rad);
        // numSpan.style.transform = `translate(${xNum}px, ${yNum}px) rotate(${angle}deg)`;
        // innerContainer.appendChild(numSpan);
      }
    }

    renderLetters();
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(window.initCaesarWheel, 100);
  } else {
    document.addEventListener("DOMContentLoaded", window.initCaesarWheel);
  }

  document.addEventListener("pjax:complete", window.initCaesarWheel);
  document.addEventListener("turbolinks:load", window.initCaesarWheel);
})();