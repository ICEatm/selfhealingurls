import UseAssetsRoute from './routes/assetsRoute';
import UsePostsRoute from './routes/postsRoute';
import UseIndexRoute from './routes/indexRoute';
import DefaultConfig from './config/default';
import express from 'express';

const app = express();

app.set('views', DefaultConfig.viewsPath);
app.set('view engine', 'twig');

UseAssetsRoute(app);
UseIndexRoute(app);
UsePostsRoute(app);

app.listen(DefaultConfig.port, () => {
  console.log(`Server is running on port ${DefaultConfig.port}`);
});
