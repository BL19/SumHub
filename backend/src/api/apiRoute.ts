import express from 'express'

export interface ApiRoute {
    register(app: express.Express): void;
}