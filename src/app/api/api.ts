export interface Post {
    id: number;
    title: string;
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('/api/posts'); // Mudei para a nova rota
    if (!response.ok) {
        throw new Error('Erro ao buscar posts');
    }
    const data = await response.json();

    const postsWithDate = data.map((post: Post) => ({
        ...post,
        date: new Date().toISOString().split('T')[0],
    }));

    return postsWithDate;
};

export const fetchPostDetails = async (postId: string | string[]): Promise<Post> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const data = await response.json();

    return {
        id: data.id,
        title: data.title,
        description: data.body,
        content: data.body,
        coverImage: `https://example.com/imagens/imagem${postId}.jpg`,
        date: new Date().toISOString().split('T')[0],
    };
};

export const createPost = async (newPost: { title: string; description: string; content: string; coverImage: string }) => {
    const response = await fetch('/api/posts', { // Mudei para a nova rota
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar a postagem: ' + response.statusText);
    }

    return response.json();
};
