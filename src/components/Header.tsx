"use client";

import React from 'react';
import { Container, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push('/');
    };

    return (
        <div
            style={{
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#002d9c',
                borderBottom: '1px solid #eaeaea',
            }}
        >
            <Container>
                <Text
                    onClick={handleLogoClick}
                    style={{ color: 'white', cursor: 'pointer', fontSize: '24px', fontWeight: 'bold', paddingLeft:50}}
                >
                    DompixelBlog
                </Text>
            </Container>
        </div>
    );
};

export default Header;
