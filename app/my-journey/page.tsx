import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserCompanion, getUserSession } from '@/lib/actions/companion.action'
import Image from 'next/image'
import CompanionsList from '@/Components/CompanionList'
const page = async () => {
  
  
  const user=await currentUser()
  if(!user) redirect('/sign-in')


    const companion=await getUserCompanion(user.id);
    const sessionHistory=await getUserSession(user.id);
 
  
  
  
  return (
    <main className='min-lg:w-3/4'>

     <section className='flex justify-between gap-4 max-sm:flex-col items-center'>

      <div className='flex gap-4 items-center'>


        <Image src={user.imageUrl} alt={user.fullName || user.firstName || 'User Avatar'} width={100} height={100} className='rounded-full' /> 

  <div className='flex flex-col gap-2'>
    <h1 className='text-2xl font-bold'>
      {user.firstName} {user.lastName}
    </h1>
    <p className='text-sm text-muted-foreground'>
      {user.emailAddresses[0]?.emailAddress || 'No email provided'}
    </p>
  </div>


      </div>
      <div className='flex gap-4'>
        <div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'>
          <div className='flex gap-2 items-center'>
            <Image src="/icons/check.svg" alt="Companion Icon" width={22} height={22} />
            <p className='text-2xl font-bold'>{sessionHistory.length}</p>
          </div>
          <div>Lessons Completed</div>
        </div>
        <div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'>
          <div className='flex gap-2 items-center'>
            <Image src="/icons/cap.svg" alt="Companion Icon" width={22} height={22} />
            <p className='text-2xl font-bold'>{companion.length}</p>
          </div>
          <div>Companions Created</div>
        </div>
      </div>
     </section>

<Accordion type="multiple" >
  <AccordionItem value="recent">
    <AccordionTrigger className='font-bold text-2xl'>My Sessions</AccordionTrigger>
    <AccordionContent>
      <CompanionsList 
      
      title='recent sessions'
      companions={sessionHistory}
      
      />
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions {`(${companion.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companion} />
          </AccordionContent>
        </AccordionItem>
</Accordion>


    </main>
  )
}

export default page
