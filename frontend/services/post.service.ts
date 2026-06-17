import { API_ROUTES } from "@/constants/apiRoutes";
import api from "@/lib/api";

interface CreatePostData {
  title: string;
  content: string;
}

class PostService {
    async getAll() {
        return await api.get(API_ROUTES.POSTS.GET_ALL);
    }

    async getById(postId: string) {
        return await api.get(API_ROUTES.POSTS.GET_BY_ID(postId));
    }

    async create(data: CreatePostData, image?: File) {

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("content", data.content);

        if (image) {
            formData.append("image", image);
        }

        return await api.post(API_ROUTES.POSTS.CREATE, formData, {
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

        return await api.put(API_ROUTES.POSTS.UPDATE(postId), formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
    }

    async delete(postId: string) {
        return await api.delete(API_ROUTES.POSTS.DELETE(postId));
    }
}

export const postService = new PostService();