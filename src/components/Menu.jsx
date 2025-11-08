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
      class={`z-300 h-[93vh] overflow-y-auto shadow-lg shadow-black fixed bottom-0 transition-all ${showMenu.value ? "-left-0" : "-left-full"} bg-background  text-white w-[230px] px-4`}
    >
      <Link
        // @ts-ignore
        href={`/all`} className='hover:bg-zinc-700 mt-4 rounded-md py-2 px-1 flex flex-row items-center gap-2 '>
        <div className='text-lg font-semibold'>Mundo</div>
      </Link>

      <Link
        // @ts-ignore
        href={`/date/${dateString}`} className='hover:bg-zinc-700 rounded-md py-2 px-1 flex flex-row items-center gap-2 '>
        <div className='text-lg font-semibold'>Partidos hoy</div>
      </Link>

      {
        sections.map((section, i) => (
          <div key={i} className='flex flex-col '>
            <div className=' text-white font-bold border-b  border-zinc-700 py-2'>{section.section_name} </div>

            {
              section.leagues.map((league, i) => {

                const logo = getFlag(league.slug, 20)

                return (
                  <Link
                    // @ts-ignore
                    href={`/${league.slug}`} className='hover:bg-zinc-800 transition-all rounded-md cursor-pointer py-2 px-2 flex flex-row items-center gap-3 '>
                    {
                      logo != undefined ?
                        <img src={logo} width={22} height={22} /> :
                        <div>🏆</div>
                    }
                    <div className='text-[13px]'>{league.name}</div>
                  </Link>
                )
              })
            }

          </div>
        ))
      }



    </div>
  )
}

export default Menu




