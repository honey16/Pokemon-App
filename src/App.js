import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App(){
  const [pokemon, setPokemon] = useState([])
  
  const [currentPageUrl,setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl,setNextPageUrl] = useState()
  const [prevPageUrl,setPrevPageUrl] = useState()
  const [loading,setLoading] = useState(true) //by default loading


  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false) //when we have data it is not loading
      setNextPageUrl(res.data.next)  //see api
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }
  
  if (loading) return "Loading.."

  return(
    <>
    <PokemonList pokemon = {pokemon} />
    <Pagination
      gotoNextPage={nextPageUrl ? gotoNextPage : null}
      gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
     />
    </>
  );
}

export default App;