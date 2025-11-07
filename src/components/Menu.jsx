import { Link } from 'preact-router/match'
import sections from '../../data/menu.json'
import React from 'react'
import { getFlag } from '../utils/helper'
import { showMenu } from '../utils/signals'

const Menu = () => {

  const date = new Date()
  const dateString = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`

  return (
    <div
      class={`z-300 h-[93vh] overflow-y-auto fixed bottom-0 transition-all ${showMenu.value ? "-left-0" : "-left-full"}  bg-background text-white w-[200px]`}
    >

      <Link
        // @ts-ignore
        href={`/date/${dateString}`} className='hover:bg-zinc-700 py-2 px-1 flex flex-row items-center gap-2 '>
        <div className='text-sm font-semibold'>Partidos hoy</div>
      </Link>

      {
        sections.map((section, i) => (
          <div key={i} className='flex flex-col divide-y divide-zinc-800 '>
            <div className='bg-black text-white font-bold p-2'>{section.section_name} </div>

            {
              section.leagues.map((league, i) => (
                <Link
                  // @ts-ignore
                  href={`/${league.slug}`} className='hover:bg-zinc-700 py-2 px-1 flex flex-row items-center gap-2 '>
                  {getFlag(league.slug, 20)}
                  <div className='text-[13px]'>{league.name}</div>
                </Link>
              ))
            }

          </div>
        ))
      }



    </div>
  )
}

export default Menu




