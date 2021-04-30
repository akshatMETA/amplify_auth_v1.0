import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Auth, Hub } from "aws-amplify";
import { useEffect } from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import { withSSRContext } from "aws-amplify";
import { useRouter } from "next/router";

// export async function getServerSideProps({ req, res }) {
//   const { Auth } = withSSRContext({ req, res });
//   try {
//     let user = await Auth.currentAuthenticatedUser({ req, res });
//     console.log(user.username);
//     // res.writeHead(302, { Location: "/home" });
//     // res.end();
//     return {
//       props: {
//         user: user.username,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     res.writeHead(302, { Location: "/" });
//     res.end();
//     // return {
//     //   props: {
//     //     user: "No user is signed in",
//     //   },
//     // };
//   }
//   return {
//     props: {},
//   };
// }

const Home = () => {
  const router = useRouter();
  async function signOut() {
    try {
      await Auth.signOut();
      router.push("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  useEffect(async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    console.log(attributes);
  });

  return (
    <div className={styles.container}>
      <h2>Home Page</h2>
      <AmplifySignOut />
      <button onClick={() => signOut()}>Sign Out</button>
      <button>Upload a file here</button>
    </div>
  );
};

export default withAuthenticator(Home);
