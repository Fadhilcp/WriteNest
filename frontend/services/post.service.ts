import api from "@/lib/api";

interface CreatePostData {
  title: string;
  content: string;
}

class PostService {
    async getAll() {
        return await api.get("/posts");
    }

    async getById(postId: string) {
        return await api.get(`/posts/${postId}`);
    }

    async create(data: CreatePostData, image?: File) {

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("content", data.content);

        if (image) {
            formData.append("image", image);
        }

        return await api.post("/posts", formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
    }

    async update(postId: string, data: Partial<CreatePostData>, image?: File) {
        const formData = new FormData();

        if (data.title) {
            formData.append("title", data.title);
        }
        if (data.content) {
            formData.append("content", data.content);
        }
        if (image) {
            formData.append("image", image);
        }

        return await api.put(`/posts/${postId}`, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
    }

    async delete(postId: string) {
        return await api.delete(`/posts/${postId}`);
    }
}

export const postService = new PostService();