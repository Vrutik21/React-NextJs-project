import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content="props.meetupData.description"></meta>
      </Head>
      <section className={classes.detail}>
        <img src={props.meetupData.image} alt={props.meetupData.title} />
        <h1>{props.meetupData.title}</h1>
        <address>{props.meetupData.address}</address>
        <p>{props.meetupData.description}</p>
      </section>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Vrutik:Vrutik2468@cluster0.vqetv.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://Vrutik:Vrutik2468@cluster0.vqetv.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();

  return {
    props: {
      meetupData: {
        id: meetups._id.toString(),
        title: meetups.title,
        address: meetups.address,
        image: meetups.image,
        description: meetups.description,
      },
    },
  };
}

export default MeetupDetails;
