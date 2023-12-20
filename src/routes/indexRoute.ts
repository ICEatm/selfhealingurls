import {Application, Request, Response} from 'express';
import DBManager from '../manager/databaseManager';

const POSTS = DBManager.getDatabase('posts');

export default function (server: Application): void {
  server.get('/', async (_: Request, res: Response) => {
    try {
      const allPosts = await POSTS?.findAsync({}).sort({post_id: 1});
      return res.status(200).render('index', {allPosts: allPosts});
    } catch (error) {
      return res
        .status(500)
        .json({success: false, message: 'Internal Server Error!'});
    }
  });
}
