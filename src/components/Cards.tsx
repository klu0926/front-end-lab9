'use client'
import Card,{ Pokemon }  from "./Card"
import { useEffect, useState } from "react"


export default function Cards(){

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const limit = 12

  // Get pokemon data
  useEffect(() => {
    
    async function fetchPokemonList() {
      // Get a list of pokemon
      // this return {name, url} , the url is that specific pokemon's api

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await res.json()


      // For each pokemon fetch its full data
      const pokemonsData = await Promise.all(
        data.results.map( async  (pokemon : {name: string, url: string}) => {

            // image, cry , others
            const res = await fetch(pokemon.url)
            const detail = await res.json()
            const name = detail.name
            const image = detail.sprites.front_default 
            const cry = detail.cries.lastest || detail.cries.legacy
            const elementalType = detail.types[0]?.type.name || 'unknown';
            const hp = detail.stats.find((obj: any) => obj.stat.name === 'hp')?.base_stat ?? 0;


            // description (from flavor_text_entries ) 
            const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
            const detail2 = await res2.json()
            const description = detail2.flavor_text_entries[0].flavor_text || "An unkown type of pokemon"

            return { name, image, description, cry, elementalType, hp }
        })
      )

      // set the pokemon data to state
      setPokemonList(pokemonsData)
    }
    // run the funciton
    fetchPokemonList()
    
    // loading completed
    setIsLoading(false)
  }, [])

  return (
    <div className="max-w-4xl py-20">
      {isLoading ? (
        <div className="font-bold">Loading...</div>
      ) : (
        <div className="flex justify-center gap-6 flex-wrap">
          {pokemonList.map((p) =>
             <Card
              key={p.name}
              name={p.name}
              image={p.image}
              description={p.description}
              cry={p.cry}
              elementalType={p.elementalType}
              hp={p.hp}
             />
             )}
        </div>
      )}
    </div>
  );

}