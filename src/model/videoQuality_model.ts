import { Document, model, Schema } from "mongoose";

export interface IVideoQuality extends Document {
  Quality: string;
  Nickname: string;
}

const videoQualitySchema = new Schema<IVideoQuality>({
  Quality: {
    type: String,
    unique: true,
    required: [true, "Please provide video quality"],
  },
  Nickname: { type: String, required: false },
});

const VideoQualityModel = model<IVideoQuality>(
  "videoQualitys",
  videoQualitySchema
);
export default VideoQualityModel;
