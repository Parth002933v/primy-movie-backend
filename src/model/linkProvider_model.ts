// this model us use for Cloud hosting provider where all movies are uploaded

import { Document, model, Schema } from "mongoose";

interface IlinkProvider extends Document {
  providerName: string;
  link: string;
}

const linkProviderSchema = new Schema<IlinkProvider>({
  providerName: {
    type: String,
    required: [true, "please enter providerName"],
    unique: true,
  },
  link: { type: String, required: [true, "link the required"], unique: true },
});

const LinkProviderModel = model<IlinkProvider>(
  "linkProviders",
  linkProviderSchema
);

export default LinkProviderModel;
