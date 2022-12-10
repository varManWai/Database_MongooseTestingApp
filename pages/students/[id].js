import { useRouter } from "next/router";
import connectMongo from "../../utils/connectMongo";
import Student from '../../models/student';

export default function student ({Student}) {
    return (
        <div>
          <p>this is the specific student page!!!</p>
            <p>{Student.name}</p>
            <p>{Student.email}</p>
        </div>
    )

}

export const getServerSideProps = async (context) => {
    const { id } = context.query;

    try {
      console.log("CONNECTING TO MONGO");
      await connectMongo();
      console.log("CONNECTED TO MONGO");
  
      console.log("FETCHING DOCUMENTS");
      const Students = await Student.findById(id);
      console.log("FETCHED DOCUMENTS");
  
      return {
        props: {
          Student: JSON.parse(JSON.stringify(Students)),
        },
      };
    } catch (error) {
      console.log(error);
      return {
        notFound: true,
      };
    }
  };