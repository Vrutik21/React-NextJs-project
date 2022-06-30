import { MongoClient } from "mongodb";

async function Handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://Vrutik:Vrutik2468@cluster0.vqetv.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default Handler;
