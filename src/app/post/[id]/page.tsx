"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Title, Text, Loader, Image, Card } from '@mantine/core';
import { fetchPostDetails, fetchRecommendedPosts } from '../../api/api';
import Header from '@/components/Header';
import '../../../styles/PostDetails.css';

interface Post {
    id: number;
    title: string;
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (id) {
            fetchPostDetails(id)
                .then((data) => {
                    setPost(data);
                    setLoading(false);
                    return fetchRecommendedPosts(data.id);
                })
                .then((recommended) => {
                    setRecommendedPosts(recommended);
                })
                .catch((error) => {
                    console.error('Erro ao buscar detalhes do post:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loader />
            </Container>
        );
    }

    return (
        <>
            <Header />

            <Container className="post-detail-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div className="post-content" style={{ flex: '2', marginRight: '20px' }}>
                    <Image
                        src={post?.coverImage}
                        alt={post?.title}
                        className="post-image"
                        style={{ width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '20px' }}
                    />
                    <Title order={1} className="post-title" style={{ marginTop: '20px', textAlign: 'left' }}>
                        {post?.title}
                    </Title>
                    <Text size="sm" className="post-description" color="dimmed" style={{ marginTop: '10px', textAlign: 'left' }}>
                        {post?.description}
                    </Text>
                    <Text size="md" className="post-text" style={{ marginTop: '20px', textAlign: 'justify' }}>
                        {post?.content}
                    </Text>
                </div>

                <div className="recommended-posts" style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Title order={2} style={{ textAlign: 'left' }}>Artigos Recomendados</Title>
                    {recommendedPosts.map((recommendedPost) => (
                        <Card key={recommendedPost.id} className="recommended-card" style={{ marginTop: '10px', width: '90%', maxWidth: '300px' }}>
                            <Image src={recommendedPost.coverImage} alt={recommendedPost.title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                            <Text fw={700} mt="xs" style={{ textAlign: 'left', marginBottom: '5px' }}>{recommendedPost.title}</Text>
                            <Text size="sm" style={{ textAlign: 'left' }}>{recommendedPost.description}</Text>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default PostDetail;
