import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import connectMongo from "../../utils/connectMongo";
import Certificate from "../../models/certificate";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function AddCertificate({ Certificates }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dataIssued, setDateIssued] = useState("");
  const [address, setAddress] = useState("");

  const createCertificate = async () => {
    const res = await fetch("/api/certificate/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: "12/12/2022",
        title: title,
        desc: desc,
        dateIssued: dataIssued,
        address: address,
        student: "6394d3ddcef135c5f57771d2",
      }),
    });
    const data = await res.json();
    console.log(data);

    // router.push("/");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta title="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={createCertificate}>
          <div>
            <label>Title :</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label>Desc :</label>
            <input
              type="text"
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
            />
          </div>
          <div>
            <label>Data Issued :</label>
            <input
              type="text"
              value={dataIssued}
              onChange={(event) => setDateIssued(event.target.value)}
            />
          </div>
          <div>
            <label>Address :</label>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        <button onClick={createCertificate}>Create Certificate</button>

        <div className={styles.grid}>
          <div className={styles.grid}>
            {Certificates.map((Certificate) => (
              <Link
                href={`/Certificates/${Certificate._id}`}
                key={Certificate._id}
                classtitle={styles.card}
              >
                <h2>{Certificate.title} &rarr;</h2>
                <p>{Certificate.desc}</p>
                <p>{Certificate.dataIssued}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("FETCHING DOCUMENTS");
    const Certificates = await Certificate.find();
    console.log("FETCHED DOCUMENTS");

    return {
      props: {
        Certificates: JSON.parse(JSON.stringify(Certificates)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
