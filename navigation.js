// Initialize the Panolens viewer
const viewer = new PANOLENS.Viewer({
  container: document.querySelector('#viewer'),
  autoHideInfospot: false,
  controlBar: true,
  horizontalView: true
});

// Image sequence
const imageNames = [
  "1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG", "6.JPG", "7.JPG",
  "50.JPG", "8.JPG", "9.JPG", "10.JPG", "100.JPG", "11.JPG", "0.JPG",
  "k1.JPG", "k2.JPG", "k3.JPG", "k4.JPG", "k5.JPG", "k6.JPG", "k7.JPG",
  "k8.JPG", "k9.JPG", "k10.JPG", "k11.JPG", "k12.JPG", "k13.JPG",
  "k14.JPG", "k15.JPG", "k16.JPG", "12.JPG"
];

// Create and store panoramas
const panoramas = imageNames.map((image, index) => {
  const panorama = new PANOLENS.ImagePanorama(`images/${image}`);
  panorama.index = index;
  viewer.add(panorama);
  return panorama;
});

let currentIndex = 0; // Track current panorama

// Function to update navigation buttons dynamically
function updateNavButtons() {
  const visibility = { left: 'none', right: 'none', forward: 'none', back: 'none' };

  const index100 = imageNames.indexOf("100.JPG");
  const index0 = imageNames.indexOf("0.JPG");
  const index9 = imageNames.indexOf("9.JPG");
  const index10 = imageNames.indexOf("10.JPG");
  const index11 = imageNames.indexOf("11.JPG");
  const index12 = imageNames.indexOf("12.JPG");
  const indexK14 = imageNames.indexOf("k14.JPG");
  const indexK15 = imageNames.indexOf("k15.JPG");

  // Define when each button should be visible
  if (currentIndex === 0) visibility.forward = 'block';
  if (currentIndex >= 1 && currentIndex <= 6) visibility.forward = visibility.back = 'block';
  if (currentIndex === 6) visibility.forward = visibility.right = visibility.back = 'block';
  if (currentIndex === 7) visibility.left = visibility.forward = 'block';
  if (currentIndex === 8) visibility.forward = visibility.back = 'block';
  if (currentIndex === 9) visibility.left = visibility.forward = visibility.back = 'block';
  if (currentIndex === 10) visibility.back = visibility.left = visibility.right = 'block';
  if (currentIndex === 11) visibility.forward = visibility.back = 'block';
  if (currentIndex === 12) visibility.back = visibility.right = 'block';
  if (currentIndex === indexK15) visibility.forward = visibility.back = 'block'; // ✅ Added Forward & Back for k15.JPG
  if (currentIndex === 13) visibility.left = visibility.right = 'block';

  if (currentIndex === 14) {  // k1.JPG
    visibility.forward = 'none';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'block';
  }
  
  if (currentIndex === 15) {  // k2.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 16) {  // k3.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 17) {  // k4.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 18) {  // k5.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 19) {  // k6.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 20) {  // k7.JPG
    visibility.forward = 'none';
    visibility.back = 'block';
    visibility.left = 'block';
    visibility.right = 'none';
  }
  
  if (currentIndex === 21) {  // k8.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 22) {  // k9.JPG
    visibility.forward = 'none';
    visibility.back = 'block';
    visibility.left = 'block';
    visibility.right = 'none';
  }
  
  if (currentIndex === 23) {  // k10.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 24) {  // k11.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 25) {  // k12.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 26) {  // k13.JPG
    visibility.forward = 'block';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'none';
  }
  
  if (currentIndex === 27) {  // k14.JPG
    visibility.forward = 'none';
    visibility.back = 'block';
    visibility.left = 'none';
    visibility.right = 'block';
  } 

  if (currentIndex === index100) visibility.forward = 'none';
  if (currentIndex === index100) visibility.left = 'block';
  if (currentIndex === index0) visibility.left = 'block';
  if (currentIndex === index0) visibility.right = 'block';
  if (currentIndex === index10) visibility.right = 'block';
  if (currentIndex === index11) visibility.back = 'block';
  if (currentIndex === index11) visibility.forward = 'block';
  if (currentIndex === index11) visibility.right = 'none';
  if (currentIndex === index12) visibility.back = 'block';
  if (currentIndex === index12) visibility.right = 'block';

  // Apply visibility changes to buttons
  document.querySelector('.nav-button.left').style.display = visibility.left;
  document.querySelector('.nav-button.right').style.display = visibility.right;
  document.querySelector('.nav-button.forward').style.display = visibility.forward;
  document.querySelector('.nav-button.back').style.display = visibility.back;
}

// Navigation function
function navigate(direction) {
  const index100 = imageNames.indexOf("100.JPG");
  const index0 = imageNames.indexOf("0.JPG");
  const index9 = imageNames.indexOf("9.JPG");
  const index10 = imageNames.indexOf("10.JPG");
  const index11 = imageNames.indexOf("11.JPG");
  const index12 = imageNames.indexOf("12.JPG");
  const indexK14 = imageNames.indexOf("k14.JPG");
  const indexK15 = imageNames.indexOf("k15.JPG");

  const transitions = {
    forward: { 
      0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 8, 7: 14, 
      8: 9,  
      9: 10,  
      [index11]: index12,
      [indexK15]: index12, // ✅ k15.JPG → Forward → 12.JPG (FIXED)
      14: 15, 15: 16, 16: 17, 17: 18, 18: 19, 19: 20, 
      21:22, 23:24,24: 25, 25: 26, 26:27, 27: 28  
    },
    right: { 
      6: 7, 13: 14, 26: 27, 27:28,
      [index0]: index100,
      [index10]: index11,
      [index12]: indexK15,
      14:15
    },
    left: { 
      7: 6,20:21, 22:23,
      [index0]: index9,
      [index100]: index0,
      [index9]: index0,
      [index10] : index100
    },
    back: { 
      1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 
      8: 6,  
      9: 8,  
      10: 9,  
      [index100]: 10,
      [index11]: index10,
      [index12]: index11,
      [indexK15]: indexK14, // ✅ k15.JPG → Back → k14.JPG (FIXED)
      13: 7, 14: 7, 15: 14, 16: 15, 17: 16, 18: 17, 
      19: 18, 20: 19, 21: 20, 22:21, 27: 26, 26: 25, 25:24 , 24:23 , 23:22 
    }
  };

  if (transitions[direction]?.[currentIndex] !== undefined) {
    currentIndex = transitions[direction][currentIndex];
    viewer.setPanorama(panoramas[currentIndex], 1000);
    updateNavButtons();
  }
}

// Add all panoramas to the viewer
panoramas.forEach(pano => viewer.add(pano));

// Initial button update
updateNavButtons();