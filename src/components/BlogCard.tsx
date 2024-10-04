"use client";

import React from 'react';
import { Card, Image, Text, Avatar, Group } from '@mantine/core';

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
            style={{
                flex: '1 1 30%',
                margin: '0 1.5% 20px',
                minWidth: '300px',
                cursor: 'pointer',
                textAlign: 'left',
            }}
            onClick={() => onClick(id)}
        >
            <Card
                padding="lg"
                shadow="md" // Adiciona sombra ao card
                withBorder   // Adiciona uma borda ao card
                style={{ borderRadius: '10px', overflow: 'hidden' }} // Garante que o conteúdo não passe do limite
            >
                <Card.Section>
                    <Image src={coverImage} alt={title} height={180} style={{ borderRadius: '10px 10px 0 0' }} />
                </Card.Section>

                <Text
                    size="md"
                    fw={700}
                    style={{
                        margin: '10px 0',
                        whiteSpace: 'nowrap',      // Não permite quebra de linha
                        overflow: 'hidden',        // Esconde texto que passar do limite
                        textOverflow: 'ellipsis'   // Adiciona reticências se o texto for muito longo
                    }}
                >
                    {title}
                </Text>

                <Text
                    size="sm"
                    color="dimmed"
                    style={{
                        display: '-webkit-box',     // Para cortar o texto após duas linhas
                        WebkitLineClamp: 2,         // Limita a descrição a 2 linhas
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',         // Esconde o conteúdo extra
                        textOverflow: 'ellipsis'
                    }}
                >
                    {description}
                </Text>

                <Group mt="md" style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="https://picsum.photos/50/50" radius="xl" alt="Author's Avatar" />
                    <div>
                        <Text size="sm">Elsa Gardenowl</Text>
                        <Text size="sm" color="dimmed">{date}</Text>
                    </div>
                </Group>
            </Card>
        </div>
    );
};

export default BlogCard;
