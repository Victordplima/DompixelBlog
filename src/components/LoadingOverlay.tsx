import React from 'react';

const LoadingOverlay: React.FC = () => {
    return (
        <div style={{
            position: 'fixed', // Fixar na tela
            top: 0,
            left: 0,
            width: '100vw', // Ocupa a largura total da tela
            height: '100vh', // Ocupa a altura total da tela
            display: 'flex', // Usar flexbox
            justifyContent: 'center', // Centraliza horizontalmente
            alignItems: 'center', // Centraliza verticalmente
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo escuro com transparência
            zIndex: 1000, // Z-index alto para ficar acima de outros conteúdos
            flexDirection: 'column', // Alinha ícone e texto em coluna
        }}>
            <img src="/loading.svg" alt="Carregando..." style={{ width: '100px', height: '100px' }} /> {/* Ajuste o tamanho do ícone conforme necessário */}
            <p style={{ color: 'white', marginTop: '10px' }}>Carregando...</p> {/* Margem acima do texto */}
        </div>
    );
};

export default LoadingOverlay;
