// Variables
const grid = document.getElementById('grid-holder');
const shapes = ['circle', 'square', 'triangle', 'wedge', 'curved-square'];

const devWidth = document.getElementById('width');
const devHeight = document.getElementById('height');
const devScale = document.getElementById('scale');
const devWhite = document.getElementById('white');

console.log('Width:', window.innerWidth);
console.log('Height:', window.innerHeight);

// Get factor pairs
const factorPairs = (n) => {
  const check = Math.sqrt(n);
  let pairs = [];

  for (let x = 1; x <= check; x++) {
    if (n % x === 0) {
      pairs.push([x, n / x]);
    }
  }

  return pairs;
};

// make shapes function
const buildGrid = () => {
  clearGrid();

  const pairs = factorPairs(window.innerWidth * window.innerHeight);
  const closest = pairs[pairs.length - 1];

  console.log('Closest:', closest);

  const cellWidth = window.innerWidth / Math.floor(window.innerWidth / 100);
  const cellHeight = window.innerHeight / Math.floor(window.innerHeight / 100);

  for (let i = 0; i < closest[0] / devScale.value; i++) {
    for (let j = 0; j < closest[1] / devScale.value; j++) {
      const shape = new Shape(cellWidth, cellHeight);
      shape.addToGrid();
    }
  }
};

const rotateRandom = (svg) => {
  svg.style.transform = `rotate(${Math.ceil(Math.random() * 3) * 90}deg)`;
  svg.children[0].style.transition = 'fill 0s';
  svg.children[0].setAttribute(
    'fill',
    `hsl(${Math.ceil(Math.random() * 360)}, 100%, 50%)`
  );
  setTimeout(() => {
    svg.children[0].style.transition = 'fill 10s';
    svg.children[0].setAttribute('fill', 'var(--shape-colour)');
  }, 500);
  // img.style.filter = `hue-rotate(${Math.ceil(Math.random() * 360)}deg)`;

  // img.style.animationName = `rotate-${String(
  //   Math.ceil(Math.random() * 3) * 90
  // )}`;
  // img.style.pointerEvents = 'none';
  // setTimeout(() => {
  //   img.style.pointerEvents = 'auto';
  // }, 500);
  // img.style.transform =
};

// Shape class
class Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.colour = Math.random() * 0xffffff;
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
  }

  addToGrid() {
    switch (this.shape) {
      case 'circle':
        this.addCircle();
        break;
      case 'square':
        this.addSquare();
        break;
      case 'triangle':
        this.addTriangle();
        break;
      case 'wedge':
        this.addWedge();
        break;
      case 'curved-square':
        this.addCurvedSquare();
        break;
      default:
        break;
    }
  }
  addCircle() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('shape');
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    svg.setAttribute('viewBox', '0 0 100 100');
    let circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    circle.setAttribute('cx', 50);
    circle.setAttribute('cy', 50);
    circle.setAttribute('r', 50);
    circle.setAttribute('fill', 'var(--shape-colour)');
    circle.addEventListener('mouseover', () => {
      rotateRandom(svg);
    });
    svg.appendChild(circle);
    grid.appendChild(svg);
  }

  addSquare() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('shape');
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    svg.setAttribute('viewBox', '0 0 100 100');
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', 0);
    rect.setAttribute('y', 0);
    rect.setAttribute('width', 100);
    rect.setAttribute('height', 100);
    rect.setAttribute('fill', 'var(--shape-colour)');
    rect.addEventListener('mouseover', () => {
      rotateRandom(svg);
    });
    svg.appendChild(rect);
    grid.appendChild(svg);
  }

  addTriangle() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('shape');
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    svg.setAttribute('viewBox', '0 0 100 100');
    let polygon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );
    polygon.setAttribute('points', '50,0 100,100 0,100');
    polygon.setAttribute('fill', 'var(--shape-colour)');
    polygon.addEventListener('mouseover', () => {
      rotateRandom(svg);
    });
    svg.appendChild(polygon);
    grid.appendChild(svg);
  }

  addWedge() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('shape');
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    svg.setAttribute('viewBox', '0 0 100 100');
    let polygon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    );
    polygon.setAttribute('points', '100 100 0 100 0 0 100 100');
    polygon.setAttribute('fill', 'var(--shape-colour)');
    polygon.addEventListener('mouseover', () => {
      rotateRandom(svg);
    });
    svg.appendChild(polygon);
    grid.appendChild(svg);
  }

  addCurvedSquare() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('shape');
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.addEventListener('onmouseover', () => {
      rotateRandom(svg);
    });
    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M100,100H0V0h0c55.23,0,100,44.77,100,100h0Z');
    path.setAttribute('fill', 'var(--shape-colour)');
    path.addEventListener('mouseover', () => {
      rotateRandom(svg);
    });
    svg.appendChild(path);
    grid.appendChild(svg);
  }
}

const clearGrid = () => {
  grid.innerHTML = '';
};

const switchColour = (colour) => {
  document.body.style.backgroundColor = colour;
  document.documentElement.style.setProperty(
    '--invert',
    colour === 'white' ? '1' : '0'
  );
};

devWhite.addEventListener('change', () => {
  if (devWhite.checked) {
    switchColour('black');
  } else {
    switchColour('white');
  }
});

buildGrid();

window.addEventListener('resize', () => {
  buildGrid();
});

devWidth.addEventListener('change', () => {
  buildGrid();
});

devHeight.addEventListener('change', () => {
  buildGrid();
});
