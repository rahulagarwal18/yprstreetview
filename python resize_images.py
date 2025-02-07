import cv2
import os

image_folder = "static/images"
images = []

for i in range(1, 34):  # Loop through 1.jpg to 33.jpg
    img_path = os.path.join(image_folder, f"{i}.jpg")  # Corrected filename format
    if os.path.exists(img_path):  # Check if file exists
        img = cv2.imread(img_path)
        if img is not None:
            images.append(img)
        else:
            print(f"Warning: Could not read {img_path}")
    else:
        print(f"Error: File {img_path} does not exist")

if len(images) < 2:
    print("Not enough valid images for stitching.")
else:
    stitcher = cv2.Stitcher_create()
    status, panorama = stitcher.stitch(images)

    if status == cv2.Stitcher_OK:
        print("Panorama created successfully!")
        cv2.imwrite("panorama.jpg", panorama)
    else:
        print("Error during stitching:", status)
