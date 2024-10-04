"use client";

import React from 'react';
import { Card, Text } from '@mantine/core';
import '../styles/FeaturedPosts.css';

interface Post {
    id: number;
    title: string;
    date: string;
    coverImage: string;
    description?: string;
}

interface FeaturedPostProps {
    post: Post;
    onClick: (id: number) => void;
    smallerPosts: Post[];
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, onClick, smallerPosts }) => {
    return (
        <div>
            <h2>Artigos em destaque</h2>
            <div className="featured-post-container">
                <Card onClick={() => onClick(post.id)} className="card featured-left">
                    <img src={post.coverImage} alt={post.title} />
                    <Text fw={700}>{post.title}</Text>
                </Card>
                <div className="featured-right">
                    {smallerPosts.map((smallerPost) => (
                        <Card key={smallerPost.id} onClick={() => onClick(smallerPost.id)} className="card smaller-card">
                            <img src={smallerPost.coverImage} alt={smallerPost.title} />
                            <Text fw={700}>{smallerPost.title}</Text>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedPost;
