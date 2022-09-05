document.querySelector("input").addEventListener("input", update);
let color;

function update() {
  color = document.querySelector("input").value;
  document.querySelector("#color").style.background = color;
  document.querySelector("#hex").textContent = `HEX: ${color.toUpperCase()}`;
  hexToRGB(color);
}

function hexToRGB(color) {
  let r = parseInt(color.substring(1, 3), 16).toString(10);
  let g = parseInt(color.substring(3, 5), 16).toString(10);
  let b = parseInt(color.substring(5), 16).toString(10);
  document.querySelector("#rgb").textContent = `RGB: ${r}, ${g}, ${b}`;
  hexToHSL(r, g, b);
}

function hexToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  document.querySelector("#hsl").textContent = `HSL: ${h}, ${s}%, ${l}%`;
}
