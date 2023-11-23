import { convertCsvToJson } from "../../utils/csvToJson";

export default async function handler(req, res) {
  const csvFilePath = "info.csv";

  try {
    const jsonObj = await convertCsvToJson(csvFilePath);
    res.status(200).json(jsonObj);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
