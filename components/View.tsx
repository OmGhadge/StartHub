import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after  } from "next/server";
import Ping from "./Ping";

const View =async({id}:{id:string})=>{

    const {views:totalViews}=await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY,{id});

    after(async ()=>await writeClient
    .patch(id)
    .set({views:totalViews+1})
    .commit()
);



    return(
        <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
            <p className="font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-lg capitalize">
                <Ping/>
                <span className="font-black">Views: {totalViews}</span>
            </p>
            
             </div>
    )
}

export default View;