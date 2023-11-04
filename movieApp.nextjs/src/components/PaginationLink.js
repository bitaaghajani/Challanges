import { Flex, Pagination} from "@mantine/core"

export default function PaginationLink({ perPage, totalPage, paginate }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <Flex justify='center' mt={20}>
            <Pagination total={3} defaultValue={1} onChange={paginate} />
        </Flex>
    )
}



{/* <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginate(number)} href="#">{number}</a>
                    </li>
                ))}
            </ul> */}