import {useState, useEffect, useRef} from "react";
import Head from "next/head";
import {
  Container,
  Wrap,
  Skeleton,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import {DisplayCard, SearchForm} from "../Components/Reusable";
import Axios from "axios";
import {PokemonDetails} from "../Components/Modales";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [nextUrl, setNextUrl] = useState();
  const [previosUrl, setPreviousUral] = useState();
  const [pageCount, setPageCount] = useState();
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonDataFiter, setPokemonDataFilter] = useState(false);
  const [pokemonModaleData, setPokemonModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [teamIds, setTeamIds] = useState([]);

  const {onOpen, isOpen, onClose} = useDisclosure();
  const btnRef = useRef();

  /**
   * ======function to get team member id ==========
   */
  const getTeamMemberId = () => {
    setTeamIds(
      Array.from(
        JSON.parse(localStorage.getItem("teamData") || []).map(
          member => member.id
        )
      )
    );
    onClose();
  };

  /**
   * 
   * @param {function to check for team member id} id 
   * @returns 
   */
  const isUserTeamMember = id => {
    return teamIds.findIndex(teamId => teamId === id) !== -1;
  };

  /**
   * 
   * @param {*this a function to open pokemon details modal and it sends each pokemon dat to this function as params and set a state} data 
   */
  const pokemonModalButton = data => {
    onOpen();
    setPokemonModalData({...data, isTeamMember: isUserTeamMember(data.id)});
  };

  /**
   * ============ Function to get first Pokemon data ============
   */
  const getPokemonFirstdata = () => {
    setLoading(false);
    Axios.get("https://pokeapi.co/api/v2/pokemon/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(res => {
        setLoading(true);
        setNextUrl(res.data.next);
        setPreviousUral(res.data.previous);
        setPageCount(res.data.count);
        setPokemonData(res.data.results);
      })
      .catch(err => {
        setLoading(true);
      });
  };
  /**
   * ============ Function to get one pokemon data by name ============
   */
  const getPokemonDataByName = name => {
    setLoading(false);
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(res => {
        setLoading(true);
        setPokemonData([res.data]);
        setPokemonDataFilter(true);
      })
      .catch(err => {
        setLoading(true);
      });
  };
  // ======function to pokemons from team storage
  const getTeams = () => {
    setPokemonData(JSON.parse(localStorage.getItem("teamData")));
    setPokemonDataFilter(true);
  };

  /**
   * ============ Function to get  Pokemon paginated data ============
   */
  const getPokemonPaginatedData = () => {
    setLoading(false);
    setPokemonDataFilter(false);
    Axios.get(nextUrl, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(res => {
        setLoading(true);
        setNextUrl(res.data.next);
        setPreviousUral(res.data.previous);
        setPageCount(res.data.count);
        setPokemonData(res.data.results);
      })
      .catch(err => {
        setLoading(true);
      });
  };
  useEffect(() => {
    getTeamMemberId();
    getPokemonFirstdata();
  }, []);
  return (
    <div>
      <Head>
        <title>Pokemon</title>
        <meta
          name='description'
          content='get konw more about your favorite pokemon'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Container maxW='container.xl'>
          <Center mt='30px' mb='30px'>
            <SearchForm
              getTeams={getTeams}
              getPokemonDataByName={getPokemonDataByName}
            />
          </Center>
          <Wrap spacing='30px' justify='center'>
            {pokemonData.map((data, index) => (
              <Skeleton key={index} isLoaded={loading}>
                <DisplayCard
                  onOpen={pokemonModalButton}
                  btnRef={btnRef}
                  data={data}
                  pokemonDataFiter={pokemonDataFiter}
                />
              </Skeleton>
            ))}
          </Wrap>
          <Center mt='50px' mb='50px'>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={getPokemonPaginatedData}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Center>

          <PokemonDetails
            getTeams={getTeams}
            data={pokemonModaleData}
            getTeamMemberId={getTeamMemberId}
            btnRef={btnRef}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Container>
      </main>
    </div>
  );
}
