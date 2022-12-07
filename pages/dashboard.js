import Head from "next/head";
import { Text, Link, Navbar, Spacer, Divider, Button,Input,Grid,Card, Container} from "@nextui-org/react";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function sendinput() {
    axios.get(`${router.query["sendvaddr"]}`+document.getElementById("inputfield").value)
    document.getElementById("inputfield").value=""
}

export default function Dashboard() {
    const router = useRouter()
    const [data, setData] = useState({"stdout":[],"stdin":[]});
    const [refreshToken, setRefreshToken] = useState(Math.random());
    const fetchurl=`${router.query["recvaddr"]}`
    useEffect(() => {
        axios.get(fetchurl)
        .then((x)=>{setData({"stdout":data["stdout"].concat(x.data["stdout"]).slice(-7),"stdin":data["stdin"].concat(x.data["stdin"]).slice(-7)})})
        .finally(() => {
            setTimeout(() => setRefreshToken(Math.random()), 1000);
        });
    }, [refreshToken]);
    return (
        <>
            <Head>
                <title></title>
            </Head>
            <Navbar isBordered isCompact variant="sticky" css={{bgBlur: "#000000"}}>
                <Navbar.Brand>
                    <Text h3 css={{textGradient: "45deg, $blue600 -20%, $pink600 50%"}}>Lumatozer</Text>
                </Navbar.Brand>
                <Navbar.Content activeColor="secondary">
                <Navbar.Link isActive href="https://lumatozer.net/">Home</Navbar.Link>
                <Navbar.Link href="https://ltzdocs.vercel.app" target='_blank'>Docs</Navbar.Link>
                <Navbar.Link href="https://lumatozer.net/explorer">Explorer</Navbar.Link>
                </Navbar.Content>
            </Navbar>
            <Grid.Container gap={2} justify="center">
                <Grid xS={4}>
                    {data.stdout.map(msg => {
                    return (
                        <Card
                            isPressable
                            isHoverable
                            variant="flat"
                            css={{ mw: "600px",margin:"10px" }}
                        >
                            <Card.Body>
                            <Text>{msg}</Text>
                            </Card.Body>
                        </Card>
                    )
                    })}
                </Grid>
                <Grid xS={4}>
                    {data.stdin.map(msg => {
                    return (
                        <Card
                            isPressable
                            isHoverable
                            variant="flat"
                            css={{ mw: "600px",margin:"10px" }}
                        >
                            <Card.Body>
                            <Text>{msg}</Text>
                            </Card.Body>
                        </Card>
                    )
                    })}
                </Grid>
            </Grid.Container>
            <br></br><br></br>
            <Input
                clearable
                underlined
                labelPlaceholder="Input"
                width="420px"
                css={{"margin-left":"40%"}}
                id="inputfield"
            />
            <br></br><br></br>
            <Button css={{"margin-left":"45%"}} onClick={()=>{
                axios.get("http://127.0.0.1:8080/input?token=d728393b7235a7f670b518664e33405e&data="+document.getElementById("inputfield").value)
                document.getElementById("inputfield").value=""
            }}>Input</Button>
        </> 
    )
}