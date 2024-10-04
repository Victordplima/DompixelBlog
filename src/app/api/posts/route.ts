import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const jsonFilePath = path.join(process.cwd(), 'src', 'app', 'api', 'posts.json');

const readPosts = () => {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        throw error; // Re-throw para que o erro seja capturado na rota
    }
};

const writePosts = (posts: any) => {
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Erro ao escrever o arquivo JSON:', error);
        throw error; // Re-throw para que o erro seja capturado na rota
    }
};

export async function GET() {
    const posts = readPosts();
    console.log('Posts lidos:', posts); // Adicione esta linha
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const newPost = await request.json();
    const posts = readPosts();

    newPost.id = posts.length + 1;
    posts.push(newPost);

    writePosts(posts);
    console.log('Novo post adicionado:', newPost); // Adicione esta linha

    return NextResponse.json(newPost, { status: 201 });
}

