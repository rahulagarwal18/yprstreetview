// Initialize the Panolens viewer
const viewer = new PANOLENS.Viewer({
  container: document.querySelector('#viewer'),
  autoHideInfospot: false,
  controlBar: true,
  horizontalView: true
});

// Array to hold all panoramas
const panoramas = [];
let currentIndex = 0; // Global tracker for the current panorama

// Dynamically load images into panoramas
const imageNames = [
  "1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG", "6.JPG", "7.JPG",
  "50.JPG", "8.JPG", "9.JPG", "10.JPG", "11.JPG", "12.JPG", "12.1.JPG", "0.JPG"
];

imageNames.forEach((imageName, index) => {
  const panorama = new PANOLENS.ImagePanorama(`static/images/${imageName}`);
  panorama.index = index + 1; // Store the image index in the panorama object

  // Add event for entering a panorama
  panorama.addEventListener('enter', function () {
    const label = document.getElementById('label');
    label.style.display = 'block';
    label.textContent = getLabelForImage(this.index);
    // Update the global currentIndex (convert 1-indexed to 0-indexed)
    currentIndex = this.index - 1;
  });

  // Add event for leaving a panorama
  panorama.addEventListener('leave', function () {
    const label = document.getElementById('label');
    label.style.display = 'none';
  });

  panoramas.push(panorama);
  viewer.add(panorama);
});

// Add navigation hotspots based on the provided navigation map
panoramas.forEach((panorama, index) => {
  // Entrance navigation (1 to 7)
  if (index >= 0 && index <= 5) {
    const hotspotNext = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotNext.position.set(500, -500, 1000); // Adjust position as needed
    hotspotNext.addHoverText('Next');
    hotspotNext.addEventListener('click', () => {
      viewer.setPanorama(panoramas[index + 1], 1000); // Smooth transition with 1000ms duration
      currentIndex = index + 1;
    });
    panorama.add(hotspotNext);
  }

  // Navigation from 7.jpg
  if (index === 6) {
    const hotspotRight = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotRight.position.set(1000, -500, 500); // Adjust position as needed
    hotspotRight.addHoverText('Right');
    hotspotRight.addEventListener('click', () => {
      viewer.setPanorama(panoramas[7], 1000); // Smooth transition to 50.jpg with 1000ms duration
      currentIndex = 7;
    });
    panorama.add(hotspotRight);

    const hotspotForward = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotForward.position.set(2000, -500, 500); // Adjust position as needed
    hotspotForward.addHoverText('Forward');
    hotspotForward.addEventListener('click', () => {
      viewer.setPanorama(panoramas[8], 1000); // Smooth transition to 9.jpg with 1000ms duration
      currentIndex = 8;
    });
    panorama.add(hotspotForward);
  }

  // Forward navigation (8 to 12)
  if (index >= 8 && index <= 11) {
    const hotspotNext = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotNext.position.set(2000, -500, 500); // Adjust position as needed
    hotspotNext.addHoverText('Next');
    hotspotNext.addEventListener('click', () => {
      viewer.setPanorama(panoramas[index + 1], 1000); // Smooth transition with 1000ms duration
      currentIndex = index + 1;
    });
    panorama.add(hotspotNext);
  }

  // Connecting 9.jpg to 0.jpg and 12.1.jpg
  if (index === 8) {
    const hotspotZero = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotZero.position.set(2000, -500, 500); // Adjust position as needed
    hotspotZero.addHoverText('Enter');
    hotspotZero.addEventListener('click', () => {
      viewer.setPanorama(panoramas[12], 1000); // Smooth transition with 1000ms duration
      currentIndex = 12;
    });
    panorama.add(hotspotZero);
  }

  if (index === 12) {
    const hotspotPrev = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotPrev.position.set(-2000, -500, 500); // Adjust position as needed
    hotspotPrev.addHoverText('Previous');
    hotspotPrev.addEventListener('click', () => {
      viewer.setPanorama(panoramas[8], 1000); // Smooth transition with 1000ms duration
      currentIndex = 8;
    });
    panorama.add(hotspotPrev);

    const hotspotNext = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotNext.position.set(2000, -500, 500); // Adjust position as needed
    hotspotNext.addHoverText('Next');
    hotspotNext.addEventListener('click', () => {
      viewer.setPanorama(panoramas[13], 1000); // Smooth transition with 1000ms duration
      currentIndex = 13;
    });
    panorama.add(hotspotNext);
  }

  if (index === 13) {
    const hotspotLeft = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotLeft.position.set(-2000, -500, 500); // Adjust position as needed
    hotspotLeft.addHoverText('Left');
    hotspotLeft.addEventListener('click', () => {
      viewer.setPanorama(panoramas[12], 1000); // Smooth transition with 1000ms duration
      currentIndex = 12;
    });
    panorama.add(hotspotLeft);

    const hotspotRight = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
    hotspotRight.position.set(2000, -500, 500); // Adjust position as needed
    hotspotRight.addHoverText('Right');
    hotspotRight.addEventListener('click', () => {
      viewer.setPanorama(panoramas[14], 1000); // Smooth transition with 1000ms duration
      currentIndex = 14;
    });
    panorama.add(hotspotRight);
  }
});

// Add keyboard navigation for panning and switching panoramas
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
      viewer.OrbitControls.getInstance().rotateUp(0.05); // Pan up
      break;
    case 's':
      viewer.OrbitControls.getInstance().rotateUp(-0.05); // Pan down
      break;
    case 'a':
      viewer.OrbitControls.getInstance().rotateLeft(0.05); // Pan left
      break;
    case 'd':
      viewer.OrbitControls.getInstance().rotateLeft(-0.05); // Pan right
      break;
    case 'ArrowRight':
      if (currentIndex < panoramas.length - 1) {
        currentIndex++;
        viewer.setPanorama(panoramas[currentIndex], 1000); // Smooth transition with 1000ms duration
      }
      break;
    case 'ArrowLeft':
      if (currentIndex > 0) {
        currentIndex--;
        viewer.setPanorama(panoramas[currentIndex], 1000); // Smooth transition with 1000ms duration
      }
      break;
  }
});

// Helper function to return labels for specific images
function getLabelForImage(imageIndex) {
  // Customize these cases to match your campus locations
  switch (imageIndex) {
    case 1: return 'Entrance';
    case 10: return 'Library';
    case 20: return 'Canteen';
    case 33: return 'Exit';
    default: return `Location ${imageIndex}`;
  }
}
