import {Application, Request, Response} from 'express';
import DBManager from '../manager/databaseManager';

const POSTS = DBManager.getDatabase('posts');

async function fetchPostById(postId: number) {
  try {
    return await POSTS?.findOneAsync({post_id: postId});
  } catch (error) {
    throw new Error('Error fetching post by ID');
  }
}

async function fetchPostByUrl(url: string) {
  try {
    return await POSTS?.findOneAsync({url});
  } catch (error) {
    throw new Error('Error fetching post by URL');
  }
}

export default function (server: Application): void {
  server.get('/posts/:url', async (req: Request, res: Response) => {
    const requestedUrl = req.params.url;
    const postId = Number(requestedUrl.split('-').pop());

    if (!postId || isNaN(postId)) {
      return res
        .status(404)
        .json({success: false, message: 'Resource not found!'});
    }

    try {
      const post = await fetchPostById(postId);

      if (!post) {
        const postFromId = await fetchPostByUrl(requestedUrl);

        if (postFromId) {
          return res.redirect(postFromId.url);
        }

        return res
          .status(404)
          .json({success: false, message: 'Post not found!'});
      }

      if (post.url === requestedUrl) {
        return res.render('post', {
          post: {
            title: `Post ${postId}`,
            data: post.post,
          },
        });
      }

      res.redirect(post.url);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({success: false, message: 'Internal Server Error'});
    }
  });
}
