import multer from 'multer';
import path from 'path';

// Set up multer storage to store files in the 'uploads' folder with a unique name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Upload files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Generate a unique file name using the current timestamp and file extension
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Initialize multer with storage options
const upload = multer({ storage: storage });

// The actual uploadImg function
export const uploadImg = async (req, res) => {
    try {
        // Use multer to handle the image upload
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.error('Error during file upload:', err);
                return res.status(500).json({ message: "Error uploading image" });
            }

            // If upload is successful, respond with the file path or URL
            const uploadedImage = req.file;

            if (!uploadedImage) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const imagePath = `uploads/${uploadedImage.filename}`;
            return res.status(200).json({ message: 'Image uploaded successfully', imagePath });
        });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ message: "Error uploading image" });
    }
};
