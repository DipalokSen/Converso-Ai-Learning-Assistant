import CompanionCard from '@/Components/CompanionCard'
import CompanionList from '@/Components/CompanionList'
import Cta from '@/Components/Cta'
import React from 'react'
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSession } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'

const Page = async () => {
  
  const companions=await getAllCompanions({limit:3})

  const recentSessionCompanions=await getRecentSession()


  
  return (
    <>
      
      
   
    <main>
  
      <h1>Dashboard</h1>

      <section className='home-section'>
          
         {companions.map((companion)=>(

<CompanionCard
          
         key={companion.id}
         {...companion}
         color={getSubjectColor(companion.subject)}

          
          
          
          />


         ))}
          
          
          
          
         

      </section>

      <section className='home-section'>
         <CompanionList 
        title="Recently completed sessions"
        companions={recentSessionCompanions}
        classNames="w-2/3 max-lg:w-full"
         />
      </section>

      <section className='home-section'>
       <Cta/>
      </section>
    </main>
     </>
  )
}

export default Page