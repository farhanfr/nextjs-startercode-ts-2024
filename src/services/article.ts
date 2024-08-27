import { IAddArticle, IArticle, IEditArticle } from "@/types/article"
import { URL_CLIENT } from "@/utils/constants"

export const fetchArticles = async () => {

    const response = await fetch(`/api/admin/article`, {
        method: 'GET',
    })
    return await response.json()
}

export const addArticle = async (data: IAddArticle) => {

    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", data.content)
    formData.append("picture", data.picture)

    console.log(formData)

    const response = await fetch(`/api/admin/article`, {
        method: 'POST',
        body: formData,
    })
    return await response.json()
}

export const editArticle = async (data: IEditArticle) => {

    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", data.content)

    const response = await fetch(`/api/admin/article/${data.id}`, {
        method: 'PUT',
        body: formData,
    })
    return await response.json()
}

export const deleteArticle = async (articleId: number) => {

    const response = await fetch(`/api/admin/article/${articleId}`, {
        method: 'DELETE',
    })
    return await response.json()
}


export const fetchDetailArticle = async (slug: string) => {

    const response = await fetch(`/api/admin/article/${slug}`, {
        method: 'GET',
    })
    return await response.json()
}

export const getSlugsArticle = async () => {

    const response = await fetch(`${URL_CLIENT}/api/admin/article`, {
        method: 'GET',
    })
    const article = await response.json()

    return article.data.map((article: IArticle) => article.slug)
}