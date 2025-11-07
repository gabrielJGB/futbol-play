export const getFlag = (slug, SIZE) => {

    const flagCode = slug.slice(0, 3)
    const p = 7
    const arr = ['fif', 'afc', 'clu', 'con', 'uef']

    if (arr.includes(flagCode)) {
        return null
    }

    const url = `https://a1.espncdn.com/combiner/i?img=/i/teamlogos/countries/500/${flagCode}.png?w=${SIZE + p}&h=${SIZE + p}`

    return url

}

export const getLogo = (team_p, SIZE) => {
    let logo = ""
    const p = 7

    if (team_p) {


        let team = "team" in team_p && typeof (team_p.team) != "string" ? team_p.team : team_p

        if (typeof (team) === "object" && "logo" in team && Array.isArray(team.logo)) {

            logo = team.logo[0].href
            logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
            logo += `&h=${SIZE + p}&w=${SIZE + p}`
            return logo
        }


        if (typeof (team) === "object" && "logo" in team && team.logo != "") {
            logo = team.logo
            logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
            logo += `&h=${SIZE + p}&w=${SIZE + p}`
            return logo
        }

        if (typeof (team) === "object" && "logos" in team && team.logos.length > 0) {

            logo = team.logos.length > 1 ? team.logos[1].href : team.logos[0].href
            logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
            logo += `&h=${SIZE + p}&w=${SIZE + p}`
            return logo

        }

        return undefined
    }
    return undefined
}