import express, {Application} from 'express';
import DefaultConfig from '../config/default';

export default function (server: Application): void {
  server.use('/assets', express.static(DefaultConfig.assetsPath));
}
