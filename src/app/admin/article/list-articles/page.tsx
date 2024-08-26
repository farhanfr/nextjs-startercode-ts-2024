"use client"

import React, { useEffect, useState } from 'react'
import { Button, Modal, Space, Spin, Table, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import { IArticle } from '@/types/article';
import Image from 'next/image';
import { deleteArticle, fetchArticles } from '@/services/article';
import { AlertError, AlertSuccess } from '@/utils/extension';
import { useRouter } from 'next/navigation';


const { Title, Text } = Typography

const ListArticlesPage = () => {

  const router = useRouter()

  const columns: TableProps<IArticle>['columns'] = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, text) => (
        <Image alt="image" width={100} height={100} src={text?.images[0]?.url} className='rounded-xl' />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, article) => (
        <Space size="middle">
          <Button type="primary" className='bg-green-700' onClick={() => router.push(`/admin/article/${article.slug}`)}>View Detail</Button>
          <Button type="primary" onClick={() => router.push(`/admin/article/form-edit/${article.slug}`)}>Edit</Button>
          <Button type='primary' className='bg-red-500' onClick={() => {
            setArticleSelected(article)
            setIsModalOpen(true)
          }}>Delete</Button>
        </Space>
      ),
    },
  ];

  const [articles, setArticles] = useState<IArticle[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleSelected, setArticleSelected] = useState<IArticle>({} as IArticle)

  const handleFetchArticles = async () => {
    setLoading(true)
    const result = await fetchArticles()
    if (result.success) {
      setArticles(result.data)
    } else {
      AlertError("Failed to fetch articles")
    }
    setLoading(false)

  }

  const handleDeleteArticle = async () => {
    setIsModalOpen(false)
    setLoading(true)
    const result = await deleteArticle(articleSelected.id)
    if (result.success) {
      AlertSuccess("Article deleted successfully")
      handleFetchArticles()
    } else {
      AlertError("Failed to delete article")
    }
    setLoading(false)
  }

  useEffect(() => {
    handleFetchArticles()
  }, [])

  return (
    <>
      <div className='flex flex-row justify-between'>
        <Title level={3}>List Of Article</Title>
        <Button type='primary' size='middle' onClick={() => {
          router.push('/admin/article/form-add')
        }}>Add Article</Button>
      </div>
      <Table rowKey={(articles) => articles.id} columns={columns} dataSource={articles} loading={{
        indicator: <span><Spin /></span>,
        spinning: loading
      }} />


      {/* Modal */}
      <Modal title="Delete Article" open={isModalOpen} onOk={handleDeleteArticle} onCancel={() => setIsModalOpen(false)}>
        <Text>Are you sure you want to delete this article?</Text>
      </Modal>


    </>
  )
}

export default ListArticlesPage