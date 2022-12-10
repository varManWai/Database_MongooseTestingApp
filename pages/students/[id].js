import { useRouter } from "next/router";
import connectMongo from "../../utils/connectMongo";
import Student from '../../models/student';

export default function student({ StudentData }) {
  const router = useRouter();

  const deleteStudent = async () =>{
    const res = await fetch("/api/student/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: StudentData._id,
      }),
    });
    const data = await res.json();
    console.log(data);
    
    router.push('/');
  }
  
  return (
    <div>
      <p>this is the specific student page!!!</p>
      <p>{StudentData.name}</p>
      <p>{StudentData.email}</p>
      <button onClick={deleteStudent}>Delete</button>
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
        StudentData: JSON.parse(JSON.stringify(Students)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};