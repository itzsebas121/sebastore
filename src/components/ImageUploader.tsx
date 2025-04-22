import { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleImageUpload = async () => {
        if (!image) {
            alert('Por favor selecciona una imagen');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', image);

        try {
            // Enviar imagen al backend para cargarla a Cloudinary
            const response = await axios.post('https://api-images-topaz.vercel.app/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Obtener la URL de la imagen subida
            setImageUrl(response.data.imageUrl);
            setUploading(false);
            alert('Imagen subida con éxito');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setUploading(false);
            alert('Hubo un error al subir la imagen');
        }
    };

    return (
        <div>
            <h1>Sube tu imagen</h1>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload} disabled={uploading}>
                {uploading ? 'Subiendo...' : 'Subir Imagen'}
            </button>

            {imageUrl && (
                <div>
                    <h2>Imagen subida con éxito!</h2>
                    <img src={imageUrl} alt="Imagen subida" width="300" />
                    <p>URL de la imagen: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
