"use client";

import React, { useEffect, useState } from 'react';
import { Title, Loader, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { fetchPosts } from '../api/api';
import BlogCard from '@/components/BlogCard';
import Header from '@/components/Header';

interface Post {
    id: number;
    title: string;
    date: string;
    coverImage: string;
    description?: string;
    featured?: boolean;
}

const Home: React.FC = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchPosts()
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar posts:', error);
            });
    }, []);

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loader />
            </Container>
        );
    }

    const handlePostClick = (id: number) => {
        router.push(`/post/${id}`);
    };

    return (
        <>
            <Header /> {/* Adicionando o Header aqui */}
            <Container style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                <Title order={2} style={{ textAlign: 'left', margin: '40px 0' }}>Todos artigos</Title>

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: '20px',
                    }}
                >
                    {posts.map((post) => (
                        <BlogCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            date={post.date}
                            description={post.description || 'Descrição não disponível.'}
                            coverImage={post.coverImage}
                            onClick={handlePostClick}
                        />
                    ))}
                </div>
            </Container>
        </>
    );
};

export default Home;
