import { Customer } from '../types';

export const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await fetch('https://randomuser.me/api/?results=1000');
    const data = await response.json();
    return data.results.map((user: any) => ({
      id: user.id.value,
      name: `${user.name.first} ${user.name.last}`,
      title: user.name.title,
      address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}`,
      photos: []
    }));
  };

export const fetchPhotos = async (): Promise<string[]> => {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=500`);
        const data = await response.json();
        const squarePhotoUrls = data.map((photo: any) => {
            const photoId = photo.id;
            return `https://picsum.photos/id/${photoId}/300/300`;
        });
        const shuffledUrls = shuffleArray(squarePhotoUrls);
        return shuffledUrls.slice(0, 9);
    } catch (error) {
        console.error("Error fetching photos:", error);
        return [];
    }
};

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Function for periodic fetching of photos
export const startPeriodicPhotoFetch = (callback: (photos: string[]) => void): NodeJS.Timeout => {
    const fetchAndUpdatePhotos = async () => {
        try {
            const photos = await fetchPhotos(); // Fetch photos without seed
            callback(photos.slice(0, 9)); // Ensure only 9 photos are passed to the callback
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    // Initial fetch
    fetchAndUpdatePhotos();

    // Start periodic fetching every 10 seconds
    const intervalId = setInterval(fetchAndUpdatePhotos, 10000);
    return intervalId; 
};
