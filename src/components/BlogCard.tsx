"use client";

import React from 'react';
import { Card, Image, Text, Avatar, Group } from '@mantine/core';
import '../app/styles/BlogCard.css';

interface BlogCardProps {
    id: number;
    title: string;
    date: string;
    coverImage: string;
    description: string;
    onClick: (id: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, date, coverImage, description, onClick }) => {
    return (
        <div
            className="custom-card"
            onClick={() => onClick(id)}
        >
            <Card
                padding="lg"
                shadow="md"
                withBorder
                style={{ width: '100%' }}
            >
                <Card.Section style={{ overflow: 'hidden' }}>
                    <Image
                        src={coverImage}
                        alt={title}
                        height={180}
                        width="100%"
                        style={{ objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                    />
                </Card.Section>

                <Text size="md" fw={700} className="card-title">
                    {title}
                </Text>

                <Text
                    size="sm"
                    className="card-description"
                >
                    {description}
                </Text>

                <Group mt="md" className="card-footer">
                    <Avatar src="https://picsum.photos/50/50" radius="xl" alt="Foto do criador do post" />
                    <div>
                        <Text size="sm" fw={700}>João da silva</Text>
                        <Text size="sm">04/10/2024</Text>
                    </div>
                </Group>
            </Card>
        </div>
    );
};

export default BlogCard;
