/**
 * Utility functions for handling profile images in the application
 */

/**
 * Determines which profile image to display based on custom settings and session
 * @param {Object} options - Options object
 * @param {boolean} options.customImageSet - Whether user has set a custom image
 * @param {string|null} options.customImage - The custom image if available
 * @param {string|null} options.googleImage - Google profile image from session
 * @param {string} options.fallbackImage - Default image to use if no others available
 * @returns {string} - URL of image to display
 */
export const getDisplayImage = ({ 
  customImageSet, 
  customImage, 
  googleImage, 
  fallbackImage = "/placeholder-user.jpg" 
}) => {
  // If user has set a custom image, use that
  if (customImageSet && customImage) {
    return customImage;
  }
  
  // Otherwise try to use their Google profile image
  if (googleImage) {
    return googleImage;
  }
  
  // Fall back to the default placeholder
  return fallbackImage;
};

/**
 * Creates a data URL from a File object
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} - A promise resolving to the data URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
