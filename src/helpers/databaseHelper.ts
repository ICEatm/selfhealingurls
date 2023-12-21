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

export {fetchPostById, fetchPostByUrl};
