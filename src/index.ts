import DBManager from './manager/databaseManager';
import express from 'express';
import {join} from 'path';

const posts = DBManager.getDatabase('posts');
const app = express();

app.set('views', join(__dirname, './views/'));
app.set('view engine', 'twig');

app.get('/posts/:url', async (req, res) => {
  const requestedUrl = req.params.url;
  const postId = Number(requestedUrl.split('-').pop());

  if (!postId || isNaN(postId)) {
    return res
      .status(404)
      .json({success: false, message: 'Resource not found!'});
  }

  try {
    const post = await posts?.findOneAsync({post_id: postId});

    if (!post) {
      // If post not found, redirect to the URL in the database
      const postFromId = await posts?.findOneAsync({url: requestedUrl});

      if (postFromId) {
        return res.redirect(postFromId.url);
      }

      return res.status(404).json({success: false, message: 'Post not found!'});
    }

    // If the URL matches the stored URL, display the post data
    if (post.url === requestedUrl) {
      const postData = post.post;
      return res.render('post', {
        post: {
          title: `Post ${postId}`,
          data: postData,
        },
      });
    }

    // Redirect to the URL in the database if the URLs don't match
    res.redirect(post.url);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({success: false, message: 'Internal Server Error'});
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
