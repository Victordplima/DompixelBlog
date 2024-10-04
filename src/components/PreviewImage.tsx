import { Image } from '@mantine/core';

interface PreviewImageProps {
    src: string | null;
}

const PreviewImage = ({ src }: PreviewImageProps) => {
    return (
        <div style={{ marginBottom: '15px', textAlign: 'center' }}>
            {src ? (
                <Image
                    src={src}
                    alt="Preview"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                />
            ) : (
                <p>Selecione uma imagem para ver a pré-visualização.</p>
            )}
        </div>
    );
};

export default PreviewImage;
