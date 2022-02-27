import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import ImageComponent from '../components/image';

const Home: NextPage = () => {
  return (
    <div>
      <ImageComponent />
      <ImageComponent />
      <ImageComponent />
      <ImageComponent />
    </div>
  )
}

export default Home
