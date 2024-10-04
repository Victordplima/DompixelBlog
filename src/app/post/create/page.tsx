"use client";

import { useState } from 'react';
import { Container, TextInput, Textarea, Button, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { createPost } from '../../api/api';

const CreatePost = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>(''); // Para o conteúdo longo
    const [coverImage, setCoverImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Para tratar erros

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reseta o erro ao iniciar o envio

        const newPost = {
            title,
            description: content, // Alterado para 'description'
            content, // Mantém o conteúdo longo
            coverImage,
        };

        try {
            await createPost(newPost); // Chama a função de criação
            router.push('/'); // Redireciona após a criação
        } catch (error) {
            console.error('Erro ao criar a postagem:', error);
            setError('Erro ao criar a postagem. Tente novamente.'); // Define a mensagem de erro
        } finally {
            setLoading(false); // Finaliza o loading
        }
    };

    return (
        <Container>
            <h1>Criar Nova Postagem</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Título"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    placeholder="Digite o título da postagem"
                />
                <Textarea
                    label="Conteúdo"
                    required
                    value={content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                    placeholder="Digite o conteúdo da postagem"
                    minRows={4}
                    mt="md"
                />
                <TextInput
                    label="URL da Imagem de Capa"
                    required
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.currentTarget.value)}
                    placeholder="Cole a URL da imagem de capa"
                    mt="md"
                />
                {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>} {/* Exibe a mensagem de erro */}
                {loading ? (
                    <Loader mt="md" />
                ) : (
                    <Button type="submit" mt="md">
                        Criar Postagem
                    </Button>
                )}
            </form>
        </Container>
    );
};

export default CreatePost;
