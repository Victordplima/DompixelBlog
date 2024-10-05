"use client";

import React, { useEffect, useState } from 'react';
import { Title, Loader, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { fetchPosts } from '../api/api';
import BlogCard from '@/components/BlogCard';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FeaturedPost from '@/components/FeaturedPost';
import LoadingOverlay from '@/components/LoadingOverlay';

interface Post {
    id: number;
    title: string;
    date: string;
    coverImage: string;
    description?: string;
}

const Home: React.FC = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetchPosts()
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar posts:', error);
                setLoading(false);
            });
    }, []);

    const handlePostClick = async (postId: number) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 200));
        router.push(`/post/${postId}`);
    };

    return (
        <>
            <Header />
            {loading && <LoadingOverlay />}
            <Container style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                {posts.length === 0 && !loading ? (
                    <Title order={3} style={{ textAlign: 'center' }}>Nenhum artigo encontrado.</Title>
                ) : (
                    <>
                        {posts.find(post => post.id === 1) && (
                            <FeaturedPost
                                post={posts.find(post => post.id === 1)!}
                                smallerPosts={posts.filter(post => post.id > 1).slice(0, 2)}
                                onClick={() => handlePostClick(posts.find(post => post.id === 1)!.id)}
                            />
                        )}

                        <Title order={2} style={{ textAlign: 'left', marginTop: '20px 0' }}>Todos artigos</Title>

                        <div style={{ width: '100%' }}>
                            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        </div>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            gap: '20px',
                        }}>
                            {posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => (
                                <BlogCard
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    date={post.date}
                                    description={post.description || 'Descrição não disponível.'}
                                    coverImage={post.coverImage}
                                    onClick={() => handlePostClick(post.id)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </Container>
        </>
    );
};

export default Home;
