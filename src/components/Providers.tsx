"use client";
import { Children, FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  childern: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ childern }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {Childern}
    </>
  );
};

export default Providers;


// import React from 'react'

// const Providers = ({childern}) => {
//   { children,
//   }: {
//     children: React.ReactNode
//   }
//   return (
//     <div>
//       <Toaster position="top-center" reverseOrder={false} />
// //       {childern}
//     </div>
//   )
// }

// export default Providers
