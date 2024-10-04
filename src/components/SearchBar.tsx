"use client";

import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import '../app/styles/SearchBar.css';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            placeholder="Pesquisar pelo título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            styles={(theme) => ({
                input: {
                    padding: '12px 20px',
                    marginBottom: '15px',
                    borderRadius: '50px',
                    border: `2px solid ${isFocused ? '#002d9c' : '#002d9c'}`,
                    backgroundColor: '#ffffff',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxShadow: isFocused ? '0 0 5px rgba(0, 7, 110, 0.5)' : 'none',
                    '&::placeholder': {
                        color: '#4a4a4a',
                    },
                },
            })}
        />
    );
};

export default SearchBar;
