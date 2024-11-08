import * as mongoose from 'mongoose';
import { removeUnderscoreFieldsDeep } from '../../api/utilities';

const PaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  abstract: { type: String, required: true },
  publishDate: { type: Date, required: true },
  category: { type: String, required: true },
  url: { type: String, required: true },
  subjects: { type: [String], required: true },
  links: { type: [{
    type: { type: String, required: true },
    url: { type: String, required: true },
  }], required: true },
}, {
    methods: {
        toJSON() {
            let obj = this.toObject();
            let newObj = removeUnderscoreFieldsDeep({
                id: obj._id.toString(),
                ...obj,
            });
            return newObj;
        }
    }
});

export type Paper = mongoose.InferSchemaType<typeof PaperSchema>;
export const Paper = mongoose.model<Paper>('Paper', PaperSchema);