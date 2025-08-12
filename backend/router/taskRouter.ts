import express from "express";
import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

import { Task } from "../model/TaskModel";

export const taskRouter = express.Router();

export function validation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array()});
        return;
    }
    next();
}
taskRouter.get("/", 
    [param("id").isMongoId(), validation] ,
    async (_req, res) => {
        const tasks = await Task.find();
        res.send(tasks);
    });

taskRouter.post("/",
    async (req, res) => {     
        const newTask = new Task (req.body) ;
        await newTask.save();
        res.status(200).send(newTask);
    });

taskRouter.put("/:id",
    param("id").isMongoId(),
    body("id").isMongoId(),
    body("titel").exists().isString().isLength({ min: 1, max: 1000}),

    async (req, res) => {
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id
        )
    });