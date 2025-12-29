'use client';

import { Form, Input, Button, Card } from 'antd';
import { usePosts } from '@/lib/hooks/usePosts';
import { CreatePostData } from '@/types';

const { TextArea } = Input;

export default function PostForm() {
  const [form] = Form.useForm();
  const { createPost, isCreating } = usePosts();

  const onFinish = async (values: CreatePostData) => {
    try {
      await createPost(values);
      form.resetFields();
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <Card title="Create New Post">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="content"
          label="Post Content"
          rules={[
            { required: true, message: 'Please enter post content' },
            { min: 1, message: 'Post cannot be empty' },
            { max: 500, message: 'Post cannot exceed 500 characters' },
          ]}
        >
          <TextArea
            rows={6}
            placeholder="What's on your mind?"
            showCount
            maxLength={500}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating}
            block
          >
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

