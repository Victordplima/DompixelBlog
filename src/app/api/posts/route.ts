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

const writePosts = (posts: any) => {
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

// Rota para adicionar um novo post
export async function POST(request: Request) {
    const formData = await request.formData(); // Use formData para pegar dados do formulário
    const title = formData.get('title');
    const description = formData.get('description');
    const content = formData.get('content');
    const coverImage = formData.get('coverImage');

    const posts = readPosts();

    const newPost = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        title,
        description,
        content,
        coverImage, // Salvar a imagem como um caminho
        createdAt: new Date().toISOString(),
    };

    posts.push(newPost);
    writePosts(posts);
    console.log('Novo post adicionado:', newPost);

    return NextResponse.json(newPost, { status: 201 });
}
