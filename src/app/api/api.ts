export interface Post {
    id: number;
    title: string;
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('/api/posts');
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
    const response = await fetch(`/api/posts/${postId}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do post');
    }
    const data = await response.json();
    console.log('Post Details:', data);

    return {
        id: data.id,
        title: data.title,
        description: data.description,
        content: data.content,
        coverImage: data.coverImage,
        date: data.date,
    };
};

export const fetchRecommendedPosts = async (excludeId: number, limit: number = 3): Promise<Post[]> => {
    const response = await fetch('/api/posts');
    if (!response.ok) {
        throw new Error('Erro ao buscar posts recomendados');
    }
    const data = await response.json();

    const recommendedPosts = data
        .filter((post: Post) => post.id !== excludeId)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);

    return recommendedPosts;
};

export const createPost = async (formData: FormData) => {
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Erro ao criar postagem');
    }

    return await response.json();
};

