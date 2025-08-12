import { Schema, model} from "mongoose"

export interface ITask {
    titel: string
    status: string
    prioritaet: number
}

const taskModelSchema = new Schema<ITask> (
    {
        titel: { type: String, required: true },
        status: { type: String, enum:["offen",  "in Bearbeitung", "erledigt"], default: "offen"},
        prioritaet: { type: Number, min: 1, max:5, default: 3}
    }, {
    timestamps: true
})

export const Task = model<ITask>("Task", taskModelSchema);