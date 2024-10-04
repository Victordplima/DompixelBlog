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
        throw error;
    }
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const posts = readPosts();
    const postId = parseInt(params.id, 10);
    const post = posts.find((post: { id: number }) => post.id === postId);

    if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('Post encontrado:', post);
    return NextResponse.json(post);
}
