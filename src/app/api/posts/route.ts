import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const jsonFilePath = path.join(process.cwd(), 'src', 'app', 'api', 'posts.json');

interface Post {
    id: number;
    title: string;
    description: string;
    content: string;
    coverImage: string;
    createdAt: string;
}

const readPosts = () => {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        return JSON.parse(jsonData) as Post[];
    } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        throw error;
    }
};

const writePosts = (posts: Post[]) => {
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Erro ao escrever o arquivo JSON:', error);
        throw error;
    }
};

export async function GET() {
    const posts = readPosts();
    console.log('Posts lidos:', posts);
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const content = formData.get('content');
    const coverImage = formData.get('coverImage');

    const posts = readPosts();

    const newPost: Post = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        title: title as string,
        description: description as string,
        content: content as string,
        coverImage: coverImage as string,
        createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    writePosts(posts);
    console.log('Novo post adicionado:', newPost);

    return NextResponse.json(newPost, { status: 201 });
}
