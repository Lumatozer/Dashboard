import { useRouter } from 'next/router'
import { Text,Container,Loading,Card} from "@nextui-org/react";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Iframe(props) {
    const router = useRouter()
    const {data, error} = useSWR(`${router.query["url"]}`, fetcher)
    if (error) return <div>Failed to load</div>
    if (!data) return <div><Container css={{padding: "25%", display: "flex", justifyContent: "center" }}><Loading size='xl' type='points'/></Container></div>
    return (
        <>
        {data[router.query["key"]].map(msg => {
                return (
                    <Card
                        isPressable
                        isHoverable
                        variant="bordered"
                        css={{ mw: "400px",margin:"10px" }}
                    >
                        <Card.Body>
                        <Text>{msg}</Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </> 
    )
}