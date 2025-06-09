"use server";
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase"

export const createCompanion = async(formData:CreateCompanion)=>{


    const {userId:Author}=await auth()
    const supabase = createSupabaseClient();
    const {data,error}=await supabase.
    from('Companion')
    .insert({...formData, Author})
    .select()

    if(error ||  !data) throw new Error(error.message || "Failed to create companion");
    return data[0];
}

export const getAllCompanions=async({limit=10,page=1,subject,topic}:GetAllCompanions)=>{


      const supabase=createSupabaseClient();
      let query=supabase.from('Companion').select();

      if(subject && topic){
        query=query.ilike('subject',`%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
      }
      else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const {data :companions,error}=await query;
    if(error) throw new Error(error.message);
    
    return companions
}

export const getCompanion=async (id:string)=>{
    const supabase=createSupabaseClient();
    const {data,error}= await supabase.from('Companion')
    .select()
    .eq('id',id)

    if(error) return console.log(error);

    return data[0];
}

export const addToSessionHistory=async(companionId:string)=>{

   const {userId}=await auth();
   const supabase = createSupabaseClient();
    const {data, error}=await supabase
     .from('Session_history')
     .insert({
        companion_id:companionId,
        user_id: userId})
     
if (error) throw new Error(error.message);


   return data;
}

export const getRecentSession=async (limit = 10) => {

const supabase = createSupabaseClient();
const { data, error } = await supabase
.from('Session_history')
.select(`Companion:companion_id(*)`)
.order('created_at', { ascending: false })
.limit(limit);


if (error) throw new Error(error.message);
return data.map(({Companion}) => Companion);
} 


export const getUserSession=async (userid:string ,limit=10) => {

const supabase = createSupabaseClient();
const { data, error } = await supabase
.from('Session_history')
.select(`Companion:companion_id(*)`)
.eq('user_id', userid)
.order('created_at', { ascending: false })
.limit(limit);


if (error) throw new Error(error.message);
return data.map(({Companion}) => Companion);
} 


export const getUserCompanion=async (userid:string) => {

const supabase = createSupabaseClient();
const { data, error } = await supabase
.from('Companion')
.select()
.eq('Author', userid)



if (error) throw new Error(error.message);
return data
} 