"use client"

import { useState } from 'react';
import { Container, TextInput, Textarea, Button, Title, Paper, Image } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { createPost } from '../../api/api';
import '../../../styles/CreatePost.css';
import Header from '@/components/Header';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!title || !content || !coverImage) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('content', content);
        formData.append('coverImage', coverImage);

        try {
            await createPost(formData);
            router.push('/');
        } catch (error) {
            console.error('Erro ao criar postagem:', error);
        }
    };

    return (
        <>
            <Header />

            <Container className="create-post-container" size="sm">
                <Title order={2} className="form-title">Criar Nova Postagem</Title>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        required
                        label="Título"
                        placeholder="Digite o título da postagem"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        styles={{
                            input: {
                                width: '100%',
                                padding: '12px 0',
                                marginBottom: '15px',
                                borderRadius: '10px',
                                border: `2px solid ${isFocused ? '#002d9c' : '#002d9c'}`,
                                backgroundColor: '#ffffff',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                boxShadow: isFocused ? '0 0 5px rgba(0, 7, 110, 0.5)' : 'none',
                                '&::placeholder': {
                                    color: '#4a4a4a',
                                },
                                textAlign: 'left',
                                textIndent: '10px',
                            },
                        }}
                    />
                    <TextInput
                        label="Descrição"
                        placeholder="Digite uma descrição"
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        styles={{
                            input: {
                                width: '100%',
                                padding: '12px 0',
                                marginBottom: '15px',
                                borderRadius: '10px',
                                border: `2px solid ${isFocused ? '#002d9c' : '#002d9c'}`,
                                backgroundColor: '#ffffff',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                boxShadow: isFocused ? '0 0 5px rgba(0, 7, 110, 0.5)' : 'none',
                                '&::placeholder': {
                                    color: '#4a4a4a',
                                },
                                textAlign: 'left',
                                textIndent: '10px',
                            },
                        }}
                    />
                    <Textarea
                        required
                        label="Conteúdo"
                        placeholder="Digite o conteúdo da postagem"
                        value={content}
                        onChange={(e) => setContent(e.currentTarget.value)}
                        minRows={5}
                        styles={{
                            input: {
                                width: '100%',
                                padding: '12px 0',
                                marginBottom: '15px',
                                borderRadius: '10px',
                                border: `2px solid ${isFocused ? '#002d9c' : '#002d9c'}`,
                                backgroundColor: '#ffffff',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                boxShadow: isFocused ? '0 0 5px rgba(0, 7, 110, 0.5)' : 'none',
                                '&::placeholder': {
                                    color: '#4a4a4a',
                                },
                                textAlign: 'left',
                                textIndent: '10px',
                            },
                        }}
                    />
                    <TextInput
                        required
                        label="Imagem de Capa (URL)"
                        placeholder="Cole o link da imagem"
                        value={coverImage || ''}
                        onChange={(e) => setCoverImage(e.currentTarget.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        styles={{
                            input: {
                                width: '100%',
                                padding: '12px 0',
                                marginBottom: '15px',
                                borderRadius: '10px',
                                border: `2px solid ${isFocused ? '#002d9c' : '#002d9c'}`,
                                backgroundColor: '#ffffff',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                boxShadow: isFocused ? '0 0 5px rgba(0, 7, 110, 0.5)' : 'none',
                                '&::placeholder': {
                                    color: '#4a4a4a',
                                },
                                textAlign: 'left',
                                textIndent: '10px',
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '50px',
                            backgroundColor: '#002d9c',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '16px',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#0056b3';
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 7, 110, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#002d9c';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Criar Postagem
                    </Button>

                </form>

                {title && description && content && coverImage && (
                    <Paper p="md" className="preview-container">
                        <Title order={3}>Pré-visualização:</Title>
                        <Image src={coverImage} alt="Imagem de Capa" className="preview-image" />
                        <Title order={4}>{title}</Title>
                        <p>{description}</p>
                        <p>{content}</p>
                    </Paper>
                )}

            </Container>
        </>
    );
};

export default CreatePost;
