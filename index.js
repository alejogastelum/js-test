const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

const generateSquare = (size) => {
  const square = document.createElement('div');
  square.style.cssText = `
        height: ${size}px;
        width: ${size}px;
        opacity: 1;
        background-color: ${generateRandomColor()};
    `;
  return square;
};

const drawContainer = (containerSize, childSize, numberOfChildren) => {
  const container = document.createElement('div');
  container.style.cssText = `
  position: relative;
  width: ${containerSize}px;
  height: ${containerSize}px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border: 0.1px solid #ccc;
`;
  const maxSlotsPerRow = Math.floor(containerSize / childSize);
  const totalSlots = maxSlotsPerRow * maxSlotsPerRow;
  for (let index = 0; index < numberOfChildren; index++) {
    const _child = generateSquare(childSize);
    _child.addEventListener('mouseenter', () => {
      let timeout;
      _child.animate(
        { backgroundColor: generateRandomColor() },
        { duration: 200, iterations: 1, easing: 'ease-in-out', fill: 'both' }
      );
      timeout = setTimeout(() => {
        _child.animate(
          { opacity: 0 },
          { duration: 500, iterations: 1, easing: 'ease-in-out', fill: 'both' }
        );
      }, 2000);
      _child.addEventListener('mouseleave', () => {
        clearTimeout(timeout);
      });
    });

    if (index < totalSlots) {
      container.appendChild(_child);
    }
  }
  const mainSquare = document.querySelector('#mainSquare');
  const slotsNumber = document.createElement('h1');
  slotsNumber.innerText = Math.min(
    Math.max(numberOfChildren - totalSlots, numberOfChildren),
    totalSlots
  );
  slotsNumber.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    font-family: Helvetica, Arial, sans-serif;
    font-size: 5rem;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0,0,0,.5);
    `;
  container.appendChild(slotsNumber);
  mainSquare.append(container);
};

drawContainer(200, 50, 17);
drawContainer(310, 200, 4);
drawContainer(413, 42, 30);
drawContainer(200, 300, 2);
drawContainer(800, 300, 20);
