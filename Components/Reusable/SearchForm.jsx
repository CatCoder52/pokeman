import {useState} from "react";
import {Input} from "@chakra-ui/input";
import {IconButton, Grid, GridItem} from "@chakra-ui/react";
import {FaSearch} from "react-icons/fa";
import {RiTeamFill} from "react-icons/ri";

export default function SearchForm(props) {
  const [searchData, setSearchData] = useState({
    name: "",
  });

  //======ONCHANGE FOR Change passWord========
  const {name} = searchData;
  const onChangeHandler = e => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Grid templateColumns='repeat(4, 1fr)' gap={2}>
        <GridItem colSpan={2}>
          <Input
            variant='filled'
            name='name'
            value={name}
            placeholder='Search  by name'
            onChange={e => onChangeHandler(e)}
            size='sm'
          />
        </GridItem>
        <GridItem colSpan={1}>
          <IconButton
            size='sm'
            _hover={{bg: "brand.100"}}
            bg='brand.100'
            color='#ffffff'
            fontSize='12'
            variant='solid'
            aria-label='Search database'
            onClick={() => props.getPokemonDataByName(name)}
            icon={<FaSearch />}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <IconButton
            size='sm'
            _hover={{bg: "brand.100"}}
            bg='brand.100'
            color='#ffffff'
            fontSize='12'
            variant='solid'
            onClick={() => props.getTeams()}
            aria-label='Search database'
            icon={<RiTeamFill size='20px' />}
          />
        </GridItem>
      </Grid>
    </div>
  );
}
