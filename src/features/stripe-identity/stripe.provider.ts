import Stripe from "stripe";
import {
  downloadAndStoreFile,
  getExtensionFromMimeType,
} from "./stripe.helper";
import { GenResObj } from "../../utils/responseFormater";
import { HttpStatusCodes as Code } from "../../utils/statusCodeInfo";

const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY!);

export const getStripeFile = async (fileId: string) => {
  try {
    const storedFiles: { [key: string]: any } = {};

    const file = await stripe.files.retrieve(fileId);

    const fileLink = await stripe.fileLinks.create({
      file: file.id,
      expires_at: Math.floor(Date.now() / 1000) + 30,
    });

    if (!file.type)
      return GenResObj(Code.UNPROCESSABLE, false, "invalid file type");

    const extension = getExtensionFromMimeType(file.type);
    const fileUrl = fileLink?.url;

    if (!fileUrl || !file?.filename)
      return GenResObj(Code.UNPROCESSABLE, false, "invalid fileurl or filename");

    const fileData = await downloadAndStoreFile(
      fileUrl,
      file.filename,
      extension
    );

    storedFiles[file.filename] = fileData;

    const result = {
      fileUrl,
      fileName: file.filename,
      type: extension,
      fileData: fileData.base64Data,
    };

    return GenResObj(Code.OK, false, "sucessfully retrieved stripe sensitive file", result);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching file");
  }
};
