import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge set of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  //fetch data from the API
  const client = await MongoClient.connect(
    "mongodb+srv://Vrutik:Vrutik2468@cluster0.vqetv.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
