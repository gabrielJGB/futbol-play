import React from 'react'
import sections from '../../../../data/menu.json'
import { defaultCategory } from '../../../utils/signals'
import { useLocation } from 'preact-iso'
import { save } from '../../../utils/storage'
import { getFlag } from '../../../utils/helper'




const CategorySelector = () => {

    const flag_size = 35
    const { route } = useLocation()
    const leagues = sections
        .filter(s => s.section_name === "Sudamérica" || s.section_name === "Europa")
        .flatMap(r => r.leagues)
        .filter(s=>s.slug.match(/\w\w\w.\d/))
        

    return (
        <div>
            <h1 class={"font-semibold text-2xl mb-3 text-white"}>Seleccionar una liga por defecto</h1>

            <div class={"grid md:grid-cols-6 grid-cols-3 gap-2 p-1"}>
                {
                    leagues.map((league) => (
                        <div
                            onClick={() => {
                                defaultCategory.value = league.slug
                                save("category", league.slug)
                                route(`/${league.slug}`)

                            }}
                            class={"bg-zinc-900 hover:bg-red-900 p-1 transition-all cursor-pointer rounded flex flex-col items-center justify-center"}
                        >

                            <img src={getFlag(league.slug.split(".")[0], flag_size)} width={flag_size} height={flag_size} />
                            <div class={"text-sm text-center"}>{league.name}</div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default CategorySelector