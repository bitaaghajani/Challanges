import { Popover, Card, Image, Text, Group, Flex } from '@mantine/core';

export default function MovieCard(props) {
    const imgUrl = `https://image.tmdb.org/t/p/w300`;
    return (
        <Flex wrap='wrap' gap="md" justify='center'
        >
            {props.movie.map(movie => (
                <Popover width={300} position="up" shadow="md">
                    <Card position='relative' shadow="sm" padding="lg" radius="md"
                        h={600}
                        w={300}
                        key={movie.id}>
                        <Card.Section>
                            <Popover.Target>
                                <Image
                                    src={imgUrl + movie.poster_path}
                                    width={300}
                                    mb={15}
                                />
                            </Popover.Target>
                        </Card.Section>
                        <Group >
                            <Text weight={500} size={20}>{movie.title}</Text>
                            <Text weight={200}>{movie.release_date}</Text>
                            <i class="fa-solid fa-star">{movie.vote_average}</i>
                            <Popover.Dropdown>
                                <Text size="s
                            lg">{movie.overview}</Text>
                                {/* to see the overview plz tap on the image ellement */}
                            </Popover.Dropdown>
                        </Group>
                    </Card>
                </Popover>
            )
            )
            }
        </Flex>
    )
}









// with CSS PURE
// import { useState } from "react";
// export default function Card(props) {
//     console.log(props)
//     const imgUrl = `https://image.tmdb.org/t/p/w300`;
//     return (
//         <>
//             {props.movie.map(movie => (
//                 <div className="card" key={movie.id}>
//                     <img src={imgUrl + movie.poster_path} />
//                     <div class="card--body">
//                         <h3>{movie.title}</h3>
//                         <span>{movie.release_date}</span>
//                         <i class="fa-solid fa-star">{movie.vote_average}</i>
//                         <p class="description active">{movie.overview}</p>
//                     </div>;
//                 </div>
//             ))}
//         </>

//     )
// }