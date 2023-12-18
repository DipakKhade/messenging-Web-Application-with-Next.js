import Image from 'next/image'
// import Button from './components/ui/Button'
import { FC } from 'react';
import { db } from '@/lib/db';


interface pageProps {
  
}
 
const page: FC<pageProps> = async() => {
  // await db.set('hello','hello')
  return ( 
   <></>
   );
}
 
export default page;



