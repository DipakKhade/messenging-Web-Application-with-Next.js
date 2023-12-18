import AddFriendButton from "@/components/ui/AddFriendButton";
import { FC } from "react";

interface pageProps {}


const page: FC<pageProps> = () => {
  
  return (
    <>
      <main className="pt-8">
        <h1 className="text-4xl">Add a Friend</h1>
        <AddFriendButton />
      </main>
    </>
  );
};

export default page;
