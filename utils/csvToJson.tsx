const csv = require("csvtojson");
import path from "path";

export async function convertCsvToJson(csvFileName: string) {
  const csvFilePath = path.resolve("public/data", csvFileName);

  try {
    const jsonObj = await csv().fromFile(csvFilePath);
    return jsonObj;
  } catch (error) {
    console.error("Error converting CSV to JSON:");
    throw error;
  }
}
