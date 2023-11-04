import { useState, useEffect } from "react";
import MovieCard from './MovieCard'
import { useInputState } from '@mantine/hooks';
import { Container, Flex, Header, Text, TextInput, Skeleton } from "@mantine/core";
import PaginationLink from "./PaginationLink";
const movieUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5c82100499f1342644a408064bf5cecf';
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=5c82100499f1342644a408064bf5cecf&query'
export default function Movies() {
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setError] = useState(null)
    // const [query, setQuery] = useState('');
    // useState with mantine 
    const [stringValue, setStringValue] = useInputState('');
    const [curentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(8)

    useEffect(() => {
        movies()
    }, [])

    async function movies() {
        try {
            const res = await fetch(movieUrl)
            const data = await res.json();
            setMovie(data.results);
            setLoading(true)
        } catch (err) { setError('got the error!!!') }
        finally {
            setLoading(false)
        }
    }

    const searchMovies = async (e) => {
        e.preventDefault();
        const url = `${searchUrl}=${stringValue}`;
        movies(url);
        const res = await fetch(url)
        const data = await res.json();
        console.log(data)
        setMovie(data.results)
        setStringValue('')

    };


    function handleChange(e) {
        setStringValue(e.target.value)
    }
    const lastPage = curentPage * perPage;
    const firstPage = lastPage - perPage;
    const page = movie.slice(firstPage, lastPage);

    const paginate = (pageNumbers) => setCurrentPage(pageNumbers)

    return (
        <>
            <Header h={60} justify="center" bg='#282828'>
                <Flex justify='space-between' px={30} >
                    <Text size={30}>Movie App</Text>
                    <form onSubmit={searchMovies} className='inputContainer'>
                        <input
                            type="text"
                            name="query"
                            value={stringValue}
                            onChange={handleChange}
                            className='search'
                            placeholder="Search movies"
                        />
                        {/* input with mantine ui */}
                        {/* <TextInput value={stringValue} onChange={handleChange} /> */}
                        <button type='submit' className='btn--search'><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </Flex>
            </Header>
            <Container fluid py={30} bg='#282828'>
                {loading ? (
                    <>
                        <Skeleton height={50} mb="xl" />
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                        <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    </>
                ) : err ? (
                    <div>{err}</div>
                ) : (
                    <>
                        <MovieCard movie={page} />
                        <PaginationLink
                            perPage={perPage}
                            totalPage={movie.length}
                            paginate={paginate} />
                    </>
                )}
            </Container>
        </>
    )
}





