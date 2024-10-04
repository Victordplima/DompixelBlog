"use client";

import React from 'react';
import { Container, Text, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IconPlus } from '@tabler/icons-react';

const Header: React.FC = () => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    };

    const handleCreatePost = () => {
        router.push('/post/create');
    };

    return (
        <div
            style={{
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#002d9c',
                borderBottom: '1px solid #eaeaea',
                padding: '0 20px',
            }}
        >
            <Container>
                <Text
                    onClick={handleLogoClick}
                    style={{ color: 'white', cursor: 'pointer', fontSize: '24px', fontWeight: 'bold' }}
                >
                    DompixelBlog
                </Text>
            </Container>
            <Button
                onClick={handleCreatePost}
                style={{
                    backgroundColor: '#ffffff',
                    color: '#002d9c',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    cursor:"pointer",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                    e.currentTarget.style.color = '#002d9c';
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.color = '#002d9c';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconPlus size={16} />
                    <span style={{ lineHeight: 1 }}>Criar Post</span>
                </div>
            </Button>
        </div>
    );
};

export default Header;
