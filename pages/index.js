import Head from 'next/head'
import Link from 'next/link'
import { getAllSegments } from '../lib/apiRequests'

export default function Home({ segments }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='max-w-lg m-auto'>
        <h1 className='text-4xl text-blue-400 my-8'>All Segments:</h1>
        <ul>
          { segments.map(segment => (
            <li key={segment.key}>
              <Link href={`/segments/${segment.key}`} className='underline my-4'>
                {segment.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const segments = await getAllSegments();
  return {
    props: { segments }
  };
}

