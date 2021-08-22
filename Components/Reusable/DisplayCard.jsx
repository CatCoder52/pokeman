import {useState, useEffect} from "react";
import {Box, Image, Button, Flex, WrapItem, Center} from "@chakra-ui/react";
import Axios from "axios";

const DisplayCard = props => {
  const [pokemonDetails, setPokemonDetails] = useState();

  /**
   * ============ Function GET POKEMON DETAILS ============
   */

  useEffect(() => {
    Axios.get(props.data.url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(res => {
        setPokemonDetails(res.data);
      })
      .catch(err => {});
  }, []);

  return (
    <div>
      <WrapItem>
        <Center>
          <Box
            mt='10'
            borderWidth='1px'
            borderRadius='lg'
            width='300px'
            overflow='hidden'>
            <Center>
              <Image
                src={
                  props.pokemonDataFiter === true ? (
                    props.data.sprites && props.data.sprites.back_default
                  ) : pokemonDetails ? (
                    pokemonDetails.sprites &&
                    pokemonDetails.sprites.back_default
                  ) : null
                }
                alt='pokemons'
              />
            </Center>

            <Box p='6'>
              <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated>
                {props.data.name}
              </Box>
              <Flex justifyContent='flex-end'>
                <Box mt='5'>
                  <Button
                    ref={props.btnRef}
                    onClick={() =>
                      props.onOpen(
                        props.pokemonDataFiter === true
                          ? props.data
                          : pokemonDetails
                      )}
                    size='sm'
                    _hover={{bg: "brand.100"}}
                    bg='brand.100'
                    color='#ffffff'
                    fontSize='12'
                    variant='solid'>
                    View Details
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Center>
      </WrapItem>
    </div>
  );
};

export default DisplayCard;
