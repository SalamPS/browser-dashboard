import Head from "next/head";
import Welcome from "./Welcome";
import Widget from "./Widget";
import Todo from "./Todo";

import { Exo_2 } from 'next/font/google'
const font = Exo_2({ subsets: ['latin'] })

export default function Home() {
  const host = process.env.HOST || 'http://localhost:3000'


  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="LamP Browser Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      
      <main className={font.className}>
        <div className="container">
          <Todo/>
          <div className="blocks">
            <div className="box">
              <Welcome/>
              <Widget/>
            </div>
            <div className="watermark">
              <span>By LamP</span>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
