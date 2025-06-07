import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
interface CompanionInterface {
id: string;
name: string;
topic: string;
subject: string;
duration: number;
color: string;

}

const CompanionCard = ({id,name,topic,subject,duration,color}:CompanionInterface) => {
  return (
    <article className='companion-card' style={{backgroundColor: color}}>
     <div className='flex justify-between items-center'>
        <div className='subject-badge'>{subject}</div>

        <button className='companion-bookmark'>
            <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15}/>
        </button>
     </div>
     <h1 className='text-2xl font-bold'>{name}</h1>
     <p className='text-sm'>Topic:{topic}</p>
     <div className='flex items-center gap-2.5'>
<Image src="/icons/clock.svg" alt="clock" width={15} height={13}/>
<p className='text-sm'>{duration} mins</p>
     </div>

     <Link href={`/companions/${id}`} className="w-full">
     
      <button className='w-full btn-primary justify-center'>Launch Lesson</button>
     
     </Link>
    </article>
  )
}

export default CompanionCard
