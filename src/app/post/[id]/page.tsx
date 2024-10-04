"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Title, Text, Loader, Image } from '@mantine/core';
import { fetchPostDetails } from '../../api/api';

interface Post {
    id: number;
    title: string;
    content: string;
    coverImage: string;
}

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            fetchPostDetails(id)
                .then((data) => {
                    setPost(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Erro ao buscar detalhes do post:', error);
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
        <Container>
            <Title order={1} style={{ textAlign: 'center', marginBottom: '20px' }}>
                {post?.title}
            </Title>
            <Image src={post?.coverImage} alt={post?.title} />
            <Text size="md" style={{ marginTop: '20px' }}>
                {post?.content}
            </Text>
        </Container>
    );
};

export default PostDetail;
