
 
  
  // Dynamically load images
  const panoramas = [];
  for (let i = 1; i <= 33; i++) {
    const panorama = new PANOLENS.ImagePanorama(`static/images/${i}.jpg`);
    panoramas.push(panorama);
    viewer.add(panorama);
  
    panorama.addEventListener('enter', () => {
      const label = document.getElementById('label');
      label.style.display = 'block';
      label.textContent = getLabelForImage(i);
    });
  
    panorama.addEventListener('leave', () => {
      const label = document.getElementById('label');
      label.style.display = 'none';
    });
  }
  
  // Add navigation between panoramas
  panoramas.forEach((panorama, index) => {
    if (index < panoramas.length - 1) {
      const hotspotNext = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
      hotspotNext.position.set(2000, -500, 500);
      hotspotNext.addHoverText('Next');
      hotspotNext.addEventListener('click', () => {
        viewer.setPanorama(panoramas[index + 1]);
      });
      panorama.add(hotspotNext);
    }
  
    if (index > 0) {
      const hotspotPrev = new PANOLENS.Infospot(300, PANOLENS.DataImage.Arrow);
      hotspotPrev.position.set(-2000, -500, 500);
      hotspotPrev.addHoverText('Previous');
      hotspotPrev.addEventListener('click', () => {
        viewer.setPanorama(panoramas[index - 1]);
      });
      panorama.add(hotspotPrev);
    }
  });
  
  // Helper function for labels
  function getLabelForImage(imageIndex) {
    switch (imageIndex) {
      case 1: return 'Entrance';
      case 10: return 'Library';
      case 20: return 'Canteen';
      case 33: return 'Exit';
      default: return '';
    }
  }
  