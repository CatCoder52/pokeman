import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Button,
  Center,
  Badge,
  useToast,
  Text,
  Box,
  Wrap,
  WrapItem,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import {useState, useEffect} from "react";

const PokemonDetails = props => {
  const [addedTeamData, setAddedTeamData] = useState([]);
  const toast = useToast();

  // =====get team members data from local storage
  const local = () => {
    let teamData = JSON.parse(localStorage.getItem("teamData"));
    if (teamData) {
      setAddedTeamData(teamData);
    }
  };

  /**
   * 
   * @param {function to remove from team} id 
   */
  const removePokemonFromTeam = id => {
    let teamData = JSON.parse(localStorage.getItem("teamData"));
    teamData.splice(teamData.findIndex(item => item.id === id), 1);
    localStorage.setItem("teamData", JSON.stringify(teamData));
    props.getTeamMemberId();
    local();
    props.getTeams();
    toast({
      position: "top-left",
      title: "Deleted.",
      description: "Pokemon removed from team.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  /**
   * 
   * @param {function to add to a team} data
   */
  const addPokemonFromTeam = data => {
    let teamData = JSON.parse(localStorage.getItem("teamData"));
    if (teamData ? teamData.length >= 6 : null) {
      toast({
        position: "top-left",
        title: "Team is Up to 6.",
        description: "You can not add more than 6 pokemon to your team.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    else if (addedTeamData.findIndex(team => team.id === data.id) !== -1) {
      toast({
        position: "top-left",
        title: "Duplicate Team.",
        description:
          (props.data.forms > [0] ? props.data.forms[0].name : "pokemon") +
          " is already on your team.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    else {
      setAddedTeamData([...addedTeamData, data]);
      toast({
        position: "top-left",
        title: "Saved.",
        description: "Pokemon added to team.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    local();
  }, []);
  useEffect(
    () => {
      localStorage.setItem("teamData", JSON.stringify(addedTeamData));
      props.getTeamMemberId();
    },
    [addedTeamData]
  );
  return (
    <div>
      <Modal
        onClose={props.onClose}
        finalFocusRef={props.btnRef}
        isOpen={props.isOpen}
        scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='brand.100'>
            {props.data.forms > [0] ? props.data.forms[0].name : null}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image
                height='10%'
                width='30%'
                src={props.data.sprites && props.data.sprites.back_default}
              />
            </Center>
            <Text fontSize='18px' fontWeight='700' mt='10px'>
              Abilities
            </Text>
            <Wrap spacing='30px' mt='10px'>
              {props.data.abilities &&
                props.data.abilities.map((data, index) => (
                  <Box key={index}>
                    <Badge colorScheme='purple'>{data.ability.name}</Badge>
                  </Box>
                ))}
            </Wrap>
            <Box mt='20px'>
              <Text fontSize='18px' fontWeight='700' mt='20px'>
                Experience
              </Text>
              <CircularProgress
                size='100px'
                mt='20px'
                value={props.data.base_experience}
                color='green.400'>
                <CircularProgressLabel>
                  {props.data.base_experience}
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Text fontSize='18px' fontWeight='700' mt='20px'>
              Game Indices
            </Text>
            <Wrap spacing='30px' mt='10px'>
              {props.data.game_indices &&
                props.data.game_indices.map((data, index) => (
                  <Box key={index}>
                    <WrapItem>
                      <Badge colorScheme='red'>
                        {data.version.name}: {data.game_index}
                      </Badge>
                    </WrapItem>
                  </Box>
                ))}
            </Wrap>
            <Text fontSize='18px' fontWeight='700' mt='20px'>
              Statices
            </Text>
            <Box mt='20px'>
              <Wrap spacing='30px' mt='10px'>
                {props.data.stats &&
                  props.data.stats.map((data, index) => (
                    <Box key={index}>
                      <WrapItem>
                        <Text
                          fontSize='13px'
                          displa='block'
                          fontWeight='700'
                          mt='20px'
                          mr='20px'>
                          {data.stat.name}
                        </Text>
                        <CircularProgress
                          size='50px'
                          mt='20px'
                          value={data.base_stat}
                          color='blue.500'>
                          <CircularProgressLabel>
                            {data.base_stat}
                          </CircularProgressLabel>
                        </CircularProgress>
                      </WrapItem>
                    </Box>
                  ))}
              </Wrap>
            </Box>
          </ModalBody>
          <ModalFooter>
            {!props.data.isTeamMember && (
              <Button
                fontSize='12px'
                colorScheme='green'
                variant='solid'
                onClick={() => addPokemonFromTeam(props.data)}>
                Add To Team
              </Button>
            )}
            {props.data.isTeamMember && (
              <Button
                fontSize='12px'
                colorScheme='red'
                variant='solid'
                onClick={() => removePokemonFromTeam(props.data.id)}>
                Remove From Team
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PokemonDetails;
