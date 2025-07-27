"use server";
import { client } from "@/sanity/lib/client";
import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from 'slugify';
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch=async(
    state:any,
    form:FormData,
    pitch:string,
    status?:string,
    raisedAmount?:string,
    founders?:string,
    website?:string,
    upvotes?:number,
    fundedDate?:string
)=>{
    const session=await auth();
    if(!session) return parseServerActionResponse({
        error:"Not signed in",
        status:"ERROR",
    });

    const {title,description,category,link}=Object.fromEntries(
        Array.from(form).filter(([key])=>key!=="pitch"),
    );

    const slug=slugify(title as string,{lower:true,strict:true});

    try{
   const startup={
    title,
    description,
    category,
    image:link,
    slug:{
        _type:slug,
        current:slug,
    },
    author:{
        _type:"references",
        _ref:session?.id,
    },
    pitch,
    status,
    raisedAmount: raisedAmount ? Number(raisedAmount) : undefined,
    founders: founders ? founders.split(",").map(f => f.trim()).filter(Boolean) : [],
    website,
    upvotes: typeof upvotes === "number" ? upvotes : 0,
    fundedDate: fundedDate || undefined
   };
   
   const result=await writeClient.create({_type:'startup',...startup})
    return parseServerActionResponse({
        ...result,
        error:"",
        status:"SUCCESS"
    })

    }catch(error){
        console.log(error);

        return parseServerActionResponse({
            error:JSON.stringify(error),
            status:"ERROR"
        })
    }
}

export async function upvoteStartup(startupId: string) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("You must be logged in to upvote.");
  }
  
  const updated = await client.patch(startupId)
    .inc({ upvotes: 1 })
    .commit({ autoGenerateArrayKeys: true });
  return updated.upvotes;
}

export const updateAuthor = async (
  id: string,
  data: {
    name?: string;
    bio?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  }
) => {
  try {
    const result = await writeClient
      .patch(id)
      .set({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.twitter !== undefined && { twitter: data.twitter }),
        ...(data.linkedin !== undefined && { linkedin: data.linkedin }),
        ...(data.website !== undefined && { website: data.website }),
      })
      .commit();
    return { status: "SUCCESS", result };
  } catch (error) {
    return { status: "ERROR", error: error instanceof Error ? error.message : String(error) };
  }
};