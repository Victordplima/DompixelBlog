"use client";

import React, { useEffect, useState } from 'react';
import { Title, Loader, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { fetchPosts } from '../api/api';
import BlogCard from '@/components/BlogCard';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import FeaturedPost from '@/components/FeaturedPost';

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

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const featuredPost = posts.find(post => post.id === 1);
    const smallerPosts = posts.filter(post => post.id > 1).slice(0, 2);

    return (
        <>
            <Header />
            <Container style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                {featuredPost && (
                    <FeaturedPost
                        post={featuredPost}
                        smallerPosts={smallerPosts}
                        onClick={() => handlePostClick(featuredPost.id)}
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
                    {filteredPosts.map((post) => (
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
