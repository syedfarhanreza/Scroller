const listItems = document.querySelectorAll('.list-items li');
const totalItems = listItems.length;
const rotationFactor = 360 / totalItems; // Distribute items evenly in the circle
let currentRotation = 0;

// Initialize circular layout, displaying all items
function initializeCircularLayout() {
  listItems.forEach((item, index) => {
    const rotationAngle = index * rotationFactor;
    item.style.transform = `translate(-50%, -50%) rotateX(${rotationAngle}deg) translateZ(300px)`; // Adjust Z distance to fit screen
    item.style.opacity = 1; // Show all items
    item.classList.remove('active'); // Remove active class
  });
}

// Function to handle scroll event
function handleScroll(event) {
  const delta = event.deltaY;

  // Update the rotation
  if (delta > 0) {
    currentRotation += rotationFactor;
  } else {
    currentRotation -= rotationFactor;
  }

  // Apply rotation to all items and update active item
  listItems.forEach((item, index) => {
    const rotationAngle = currentRotation + (index * rotationFactor);
    item.style.transform = `translate(-50%, -50%) rotateX(${rotationAngle}deg) translateZ(300px)`; // Keep Z value same for all
    
    // Normalize the rotation angle to find the active item
    const normalizedRotation = (rotationAngle % 360 + 360) % 360;

    // Check if the item is in the front-facing position (active)
    if (normalizedRotation >= 345 || normalizedRotation <= 15) {
      item.classList.add('active'); // Add active class to make the text black
    } else {
      item.classList.remove('active'); // Remove active class
    }
  });
}

// Attach the scroll event listener to the window
window.addEventListener('wheel', handleScroll);

// Initialize circular layout on page load
initializeCircularLayout();
