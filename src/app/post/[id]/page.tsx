"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Title, Text, Loader, Image, Card } from '@mantine/core';
import { fetchPostDetails, fetchRecommendedPosts } from '../../api/api'; // Certifique-se de que a rota para a API também esteja correta
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
        console.log(id); // Verifique se o ID está correto
        if (id) {
            fetchPostDetails(id)
                .then((data) => {
                    setPost(data);
                    setLoading(false);

                    // Fetching recommended posts excluding the current post
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
                    <Image src={post?.coverImage} alt={post?.title} className="post-image" style={{ width: '100%', height: 'auto' }} />
                    <Title order={1} className="post-title" style={{ marginTop: '20px', textAlign: 'center' }}>
                        {post?.title}
                    </Title>
                    <Text size="sm" className="post-description" color="dimmed" style={{ marginTop: '10px', textAlign: 'center' }}>
                        {post?.description}
                    </Text>
                    <Text size="md" className="post-text" style={{ marginTop: '20px' }}>
                        {post?.content}
                    </Text>
                </div>

                <div className="recommended-posts" style={{ flex: '1' }}>
                    <Title order={2}>Artigos Recomendados</Title>
                    {recommendedPosts.map((recommendedPost) => (
                        <Card key={recommendedPost.id} className="recommended-card" style={{ marginTop: '10px' }}>
                            <Image src={recommendedPost.coverImage} alt={recommendedPost.title} />
                            <Text fw={700} mt="xs">{recommendedPost.title}</Text>
                            <Text size="sm">{recommendedPost.description}</Text>
                        </Card>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default PostDetail;
