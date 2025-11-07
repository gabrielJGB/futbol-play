import React from 'react'
import sections from '../../../../data/menu.json'
import { defaultCategory } from '../../../utils/signals'
import { useLocation } from 'preact-iso'
import { save } from '../../../utils/storage'
import { getFlag } from '../../../utils/helper'




const CategorySelector = () => {

    const { route } = useLocation()
    const leagues = sections.filter(s => s.section_name === "Sudamérica" || s.section_name === "Europa").flatMap(r => r.leagues)


    return (
        <div>
            <h1 class={"font-semibold text-2xl mb-3 text-white"}>Seleccionar una liga por defecto</h1>

            <div class={"conatiner flex flex-row justify-center flex-wrap gap-2 w-full"}>
                {
                    leagues.map((league) => (
                        <div
                            onClick={() => {
                                 defaultCategory.value = league.slug 
                                 save("category",league.slug)
                                 route(`/${league.slug}`)

                            }}
                            class={"flex-1 hover:bg-background-3 cursor-pointer text-center text-sm flex flex-row items-center gap-1 justify-center py-1 px-4 w-max bg-background-3  hover:outline-red-500 outline-1 outline-transparent shadow text-gray-200"}
                        >
                            {getFlag(league.slug.split(".")[0], 20)}


                            <div class={"whitespace-nowrap"}>{league.name}</div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default CategorySelector